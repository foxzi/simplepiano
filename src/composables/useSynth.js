// Web Audio — простой синтезатор (осциллятор triangle), перенесённый 1:1 из
// прежней версии приложения на чистом JS.

import { midiToFrequency } from "../constants/piano";

export function useSynth() {
  let audioCtx = null;
  const heldNotes = new Map(); // midi -> { osc, gain }

  function ensureContext() {
    if (!audioCtx) {
      const Ctor = window.AudioContext || window.webkitAudioContext;
      if (!Ctor) return null;
      audioCtx = new Ctor();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  }

  function startHeld(midi) {
    const ctx = ensureContext();
    if (!ctx) return;
    stopHeld(midi);

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

  function stopHeld(midi) {
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
    Array.from(heldNotes.keys()).forEach(stopHeld);
  }

  function playTransient(midi, durationMs) {
    const ctx = ensureContext();
    if (!ctx) return;
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
  }

  function playClick() {
    const ctx = ensureContext();
    if (!ctx) return;
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
  }

  // Полная остановка и освобождение контекста — вызывается при размонтировании.
  function dispose() {
    stopAllHeld();
    if (audioCtx) {
      audioCtx.close().catch(() => {});
      audioCtx = null;
    }
  }

  return { ensureContext, startHeld, stopHeld, stopAllHeld, playTransient, playClick, dispose };
}
