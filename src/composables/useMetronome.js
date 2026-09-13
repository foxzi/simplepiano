// Метроном: равномерные щелчки через setInterval, с очисткой при размонтировании.

import { reactive, onUnmounted } from "vue";

export function useMetronome({ playClick, ensureAudio } = {}) {
  const state = reactive({ bpm: 90, running: false });
  let intervalId = null;

  function start() {
    stop();
    ensureAudio && ensureAudio();
    playClick && playClick();
    intervalId = window.setInterval(() => playClick && playClick(), 60000 / state.bpm);
    state.running = true;
  }

  function stop() {
    if (intervalId != null) {
      window.clearInterval(intervalId);
      intervalId = null;
    }
    state.running = false;
  }

  function restartIfRunning() {
    if (intervalId != null) {
      window.clearInterval(intervalId);
      intervalId = window.setInterval(() => playClick && playClick(), 60000 / state.bpm);
    }
  }

  onUnmounted(stop);

  return { state, start, stop, restartIfRunning };
}
