// Единые на всё приложение синтезатор и метроном: клавиатура и метроном
// живут в оболочке, а страницы уроков обращаются к ним напрямую.

import { useSynth } from "../composables/useSynth";
import { useMetronome } from "../composables/useMetronome";

export const synth = useSynth();

export const metronome = useMetronome({
  playClick: synth.playClick,
  ensureAudio: synth.ensureContext,
});
