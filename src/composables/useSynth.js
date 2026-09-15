// Web Audio — многотембровый синтезатор.
//
// Голос собирается из гармоник выбранного пресета (см. constants/instruments.js):
// осцилляторы -> фильтр нижних частот -> огибающая громкости -> выход.
//
// Браузеры создают AudioContext в состоянии suspended и возобновляют его только
// после жеста пользователя, причём resume() асинхронный. Поэтому ноты, запрошенные
// до возобновления, откладываются и запускаются, когда контекст реально заработал.

import { reactive } from "vue";
import { midiToFrequency } from "../constants/piano";
import { INSTRUMENTS, DEFAULT_INSTRUMENT_ID, findInstrument } from "../constants/instruments";
import { t } from "../i18n";

const STORAGE_KEY = "pianoL.instrument.v1";
const VOLUME_STORAGE_KEY = "pianoL.volume.v1";
const DEFAULT_VOLUME = 100;
const VOLUME_RAMP_SECONDS = 0.05; // короткая плавная рампа при изменении громкости слайдером

function safeGet() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch (err) {
    return null;
  }
}

function safeSet(value) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch (err) {
    /* private-режим или storage отключён — выбор просто не сохранится */
  }
}

function safeGetVolume() {
  try {
    return window.localStorage.getItem(VOLUME_STORAGE_KEY);
  } catch (err) {
    return null;
  }
}

function safeSetVolume(value) {
  try {
    window.localStorage.setItem(VOLUME_STORAGE_KEY, value);
  } catch (err) {
    /* private-режим или storage отключён — громкость просто не сохранится */
  }
}

// Строго проверяет число 0..100: NaN/Infinity/строки без числа отбрасываются целиком (null),
// а выходящие за диапазон значения зажимаются.
function toValidVolume(value) {
  if (typeof value !== "number" && typeof value !== "string") return null;
  if (typeof value === "string" && !value.trim()) return null;
  const num = Number(value);
  if (!Number.isFinite(num)) return null;
  return Math.min(100, Math.max(0, num));
}

export function useSynth() {
  const storedId = safeGet();
  const storedVolume = toValidVolume(safeGetVolume());
  // status: unsupported | idle | suspended | running | closed | error
  const state = reactive({
    status: "idle",
    error: "",
    instrumentId: INSTRUMENTS.some((i) => i.id === storedId) ? storedId : DEFAULT_INSTRUMENT_ID,
    volume: storedVolume == null ? DEFAULT_VOLUME : storedVolume,
  });

  let audioCtx = null;
  let masterGain = null; // единая точка выхода: все голоса и метроном сходятся сюда перед destination
  const heldNotes = new Map(); // midi -> voice
  const pendingHeld = new Set(); // ноты, ждущие возобновления контекста

  function volumeToGain(percent) {
    return percent / 100;
  }

  function syncStatus() {
    if (!audioCtx) return;
    state.status = audioCtx.state; // running | suspended | closed
  }

  function ensureContext() {
    if (!audioCtx) {
      const Ctor = window.AudioContext || window.webkitAudioContext;
      if (!Ctor) {
        state.status = "unsupported";
        state.error = t("synth.unsupported");
        return null;
      }
      try {
        audioCtx = new Ctor();
      } catch (err) {
        state.status = "error";
        state.error = String((err && err.message) || err);
        return null;
      }
      audioCtx.addEventListener("statechange", syncStatus);
      masterGain = audioCtx.createGain();
      masterGain.gain.value = volumeToGain(state.volume);
      masterGain.connect(audioCtx.destination);
    }
    syncStatus();
    if (audioCtx.state === "suspended") {
      audioCtx.resume().then(syncStatus, (err) => {
        state.status = "suspended";
        state.error = String((err && err.message) || err);
      });
    }
    return audioCtx;
  }

  // Выполняет действие сразу, если контекст запущен, иначе — после resume().
  function whenRunning(fn) {
    const ctx = ensureContext();
    if (!ctx) return;
    if (ctx.state === "running") {
      fn(ctx);
      return;
    }
    ctx.resume().then(
      () => {
        syncStatus();
        if (ctx.state === "running") fn(ctx);
      },
      (err) => {
        state.error = String((err && err.message) || err);
      }
    );
  }

  function currentPreset() {
    return findInstrument(state.instrumentId);
  }

  // Время спада конкретной ноты: у фортепиано верхние ноты гаснут быстрее.
  function decayTime(preset, midi) {
    if (!preset.decayPitchSemitones) return preset.decay;
    return preset.decay * Math.pow(2, -(midi - 60) / preset.decayPitchSemitones);
  }

  // Собирает и запускает голос; возвращает объект с методом release().
  // gainScale — громкость относительно пресета (уроки динамики играют тише и громче).
  function spawnVoice(ctx, midi, preset, gainScale = 1) {
    const now = ctx.currentTime;
    const freq = midiToFrequency(midi);
    const decay = decayTime(preset, midi);
    const sustain = preset.sustain;
    const peak = preset.gain * gainScale;

    const env = ctx.createGain();
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(peak, now + preset.attack);
    const sustainLevel = Math.max(peak * sustain, 0.0001);
    env.gain.exponentialRampToValueAtTime(sustainLevel, now + preset.attack + decay);
    env.connect(masterGain);

    let input = env;
    if (preset.filter) {
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.Q.value = preset.filter.q;
      filter.frequency.setValueAtTime(preset.filter.from, now);
      filter.frequency.exponentialRampToValueAtTime(preset.filter.to, now + preset.attack + decay);
      filter.connect(env);
      input = filter;
    }

    const oscillators = preset.partials.map((partial) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = partial.type;
      osc.frequency.value = freq * partial.ratio;
      if (partial.detune) osc.detune.value = partial.detune;
      gain.gain.value = partial.gain;
      osc.connect(gain);
      gain.connect(input);
      osc.start(now);
      return osc;
    });

    let released = false;

    // at === undefined — отпускание прямо сейчас (клавиша поднята),
    // иначе — заранее запланированное отпускание (демонстрация, метроном).
    function release(at) {
      if (released) return;
      released = true;
      const time = at == null ? ctx.currentTime : at;
      try {
        if (at == null) {
          env.gain.cancelScheduledValues(time);
          env.gain.setValueAtTime(Math.max(env.gain.value, 0.0001), time);
          env.gain.exponentialRampToValueAtTime(0.0001, time + preset.release);
        } else {
          env.gain.setTargetAtTime(0.0001, time, preset.release / 3);
        }
        const stopAt = time + preset.release + 0.05;
        oscillators.forEach((osc) => osc.stop(stopAt));
      } catch (err) {
        /* игнорируем, если контекст уже закрыт */
      }
    }

    return { release };
  }

  function startHeld(midi) {
    const ctx = ensureContext();
    if (!ctx) return;
    stopHeld(midi);

    if (ctx.state === "running") {
      heldNotes.set(midi, spawnVoice(ctx, midi, currentPreset()));
      return;
    }
    // Контекст ещё просыпается: запомним ноту и запустим её после resume().
    pendingHeld.add(midi);
    whenRunning(() => {
      if (pendingHeld.delete(midi)) heldNotes.set(midi, spawnVoice(audioCtx, midi, currentPreset()));
    });
  }

  function stopHeld(midi) {
    pendingHeld.delete(midi);
    const voice = heldNotes.get(midi);
    if (!voice) return;
    voice.release();
    heldNotes.delete(midi);
  }

  function stopAllHeld() {
    pendingHeld.clear();
    Array.from(heldNotes.keys()).forEach(stopHeld);
  }

  // Нота фиксированной длительности — для демонстрации гаммы и проверки звука.
  function playTransient(midi, durationMs, gainScale = 1) {
    whenRunning((ctx) => {
      const preset = currentPreset();
      const voice = spawnVoice(ctx, midi, preset, gainScale);
      voice.release(ctx.currentTime + durationMs / 1000);
    });
  }

  // Щелчок метронома намеренно не зависит от выбранного инструмента.
  function playClick() {
    whenRunning((ctx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.value = 1500;

      const now = ctx.currentTime;
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.linearRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now);
      osc.stop(now + 0.06);
    });
  }

  function setInstrument(id) {
    const preset = findInstrument(id);
    if (preset.id === state.instrumentId) return;
    stopAllHeld();
    state.instrumentId = preset.id;
    safeSet(preset.id);
  }

  // Громкость 0..100. Не создаёт AudioContext сама по себе — просто запоминает
  // выбор, а звук уже играющих голосов плавно доводится до нового уровня,
  // если контекст уже существует.
  function setVolume(value) {
    const next = toValidVolume(value);
    if (next == null) return;
    state.volume = next;
    safeSetVolume(String(next));

    if (audioCtx && masterGain) {
      const now = audioCtx.currentTime;
      const target = volumeToGain(next);
      try {
        masterGain.gain.cancelScheduledValues(now);
        masterGain.gain.setValueAtTime(masterGain.gain.value, now);
        masterGain.gain.linearRampToValueAtTime(target, now + VOLUME_RAMP_SECONDS);
      } catch (err) {
        masterGain.gain.value = target;
      }
    }
  }

  // Полная остановка и освобождение контекста — вызывается при размонтировании.
  function dispose() {
    stopAllHeld();
    if (audioCtx) {
      audioCtx.removeEventListener("statechange", syncStatus);
      audioCtx.close().catch(() => {});
      audioCtx = null;
      state.status = "idle";
    }
    if (masterGain) {
      try {
        masterGain.disconnect();
      } catch (err) {
        /* контекст уже закрыт — узел и так недействителен */
      }
      masterGain = null;
    }
  }

  return {
    state,
    instruments: INSTRUMENTS,
    ensureContext,
    setInstrument,
    setVolume,
    startHeld,
    stopHeld,
    stopAllHeld,
    playTransient,
    playClick,
    dispose,
  };
}
