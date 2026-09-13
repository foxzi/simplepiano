// Проигрывание демонстрации гаммы: подсветка клавиш + звук по таймеру,
// с гарантированной остановкой всех таймеров при размонтировании компонента.

import { reactive, onUnmounted } from "vue";
import { EXERCISE_SEQUENCE, DEMO_STEP_MS, DEMO_NOTE_MS } from "../constants/piano";

export function useDemo({ playTransient, ensureAudio, setActive } = {}) {
  const state = reactive({ playing: false });
  let timeouts = [];
  let activeMidi = null;

  function clearTimeouts() {
    timeouts.forEach((id) => window.clearTimeout(id));
    timeouts = [];
  }

  function stop() {
    clearTimeouts();
    if (activeMidi != null) {
      setActive && setActive(activeMidi, false);
      activeMidi = null;
    }
    state.playing = false;
  }

  function play() {
    stop();
    ensureAudio && ensureAudio();
    state.playing = true;
    let i = 0;

    function step() {
      if (activeMidi != null) {
        setActive && setActive(activeMidi, false);
        activeMidi = null;
      }
      if (i >= EXERCISE_SEQUENCE.length) {
        stop();
        return;
      }
      const midi = EXERCISE_SEQUENCE[i];
      setActive && setActive(midi, true);
      activeMidi = midi;
      playTransient && playTransient(midi, DEMO_NOTE_MS);
      i++;
      timeouts.push(window.setTimeout(step, DEMO_STEP_MS));
    }

    step();
  }

  onUnmounted(stop);

  return { state, play, stop };
}
