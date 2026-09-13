// Web Audio — простой синтезатор (осциллятор triangle).
//
// Браузеры создают AudioContext в состоянии suspended и возобновляют его только
// после жеста пользователя, причём resume() асинхронный. Поэтому ноты, запрошенные
// до возобновления, откладываются и запускаются, когда контекст реально заработал.

import { reactive } from "vue";
import { midiToFrequency } from "../constants/piano";

export function useSynth() {
  // status: unsupported | idle | suspended | running | closed | error
  const state = reactive({ status: "idle", error: "" });

  let audioCtx = null;
  const heldNotes = new Map(); // midi -> { osc, gain }
  const pendingHeld = new Set(); // ноты, ждущие возобновления контекста

  function syncStatus() {
    if (!audioCtx) return;
    state.status = audioCtx.state; // running | suspended | closed
  }

  function ensureContext() {
    if (!audioCtx) {
      const Ctor = window.AudioContext || window.webkitAudioContext;
      if (!Ctor) {
        state.status = "unsupported";
        state.error = "Браузер не поддерживает Web Audio API.";
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

  function spawnHeld(ctx, midi) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = midiToFrequency(midi);

    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.22, now + 0.02);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);

    heldNotes.set(midi, { osc, gain });
  }

  function startHeld(midi) {
    const ctx = ensureContext();
    if (!ctx) return;
    stopHeld(midi);

    if (ctx.state === "running") {
      spawnHeld(ctx, midi);
      return;
    }
    // Контекст ещё просыпается: запомним ноту и запустим её после resume().
    pendingHeld.add(midi);
    whenRunning(() => {
      if (pendingHeld.delete(midi)) spawnHeld(audioCtx, midi);
    });
  }

  function stopHeld(midi) {
    pendingHeld.delete(midi);
    const voice = heldNotes.get(midi);
    if (!voice) return;
    const now = audioCtx ? audioCtx.currentTime : 0;
    try {
      voice.gain.gain.cancelScheduledValues(now);
      voice.gain.gain.setValueAtTime(voice.gain.gain.value, now);
      voice.gain.gain.linearRampToValueAtTime(0.0001, now + 0.08);
      voice.osc.stop(now + 0.1);
    } catch (err) {
      /* игнорируем, если контекст уже закрыт */
    }
    heldNotes.delete(midi);
  }

  function stopAllHeld() {
    pendingHeld.clear();
    Array.from(heldNotes.keys()).forEach(stopHeld);
  }

  function playTransient(midi, durationMs) {
    whenRunning((ctx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = midiToFrequency(midi);

      const now = ctx.currentTime;
      const dur = durationMs / 1000;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.22, now + 0.02);
      gain.gain.linearRampToValueAtTime(0.0001, now + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + dur + 0.05);
    });
  }

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
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    });
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
  }

  return { state, ensureContext, startHeld, stopHeld, stopAllHeld, playTransient, playClick, dispose };
}
