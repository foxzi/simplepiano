// Метроном: равномерные щелчки через setInterval, с очисткой при размонтировании.
// state.beat и state.lastBeatAt нужны урокам ритма, чтобы проверять попадание в долю.

import { reactive, onUnmounted, getCurrentInstance } from "vue";

export function useMetronome({ playClick, ensureAudio } = {}) {
  const state = reactive({ bpm: 90, running: false, beat: 0, lastBeatAt: 0 });
  let intervalId = null;

  function tick() {
    state.beat += 1;
    state.lastBeatAt = performance.now();
    playClick && playClick();
  }

  function start() {
    stop();
    ensureAudio && ensureAudio();
    state.beat = 0;
    tick();
    intervalId = window.setInterval(tick, 60000 / state.bpm);
    state.running = true;
  }

  function stop() {
    if (intervalId != null) {
      window.clearInterval(intervalId);
      intervalId = null;
    }
    state.running = false;
    state.lastBeatAt = 0;
  }

  function restartIfRunning() {
    if (intervalId != null) {
      window.clearInterval(intervalId);
      intervalId = window.setInterval(tick, 60000 / state.bpm);
    }
  }

  // Композабл используется и как синглтон вне компонента — тогда хука нет.
  if (getCurrentInstance()) onUnmounted(stop);

  return { state, start, stop, restartIfRunning };
}
