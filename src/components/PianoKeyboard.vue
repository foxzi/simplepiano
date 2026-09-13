<template>
  <div class="piano" role="group" aria-label="Клавиатура фортепиано, две октавы от до четвёртой октавы">
    <button
      v-for="key in keys"
      :key="key.midi"
      type="button"
      :class="keyClasses(key)"
      :style="key.isBlack ? { left: key.leftStyle } : null"
      :aria-label="key.label"
      :data-label="key.isC ? key.label : null"
      @pointerdown.prevent="handleDown(key.midi)"
      @pointerup="handleUp(key.midi)"
      @pointerleave="handleUp(key.midi)"
      @pointercancel="handleUp(key.midi)"
      @keydown="handleKeydown($event, key.midi)"
      @keyup="handleKeyup($event, key.midi)"
    ></button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { PIANO_MIN_MIDI, PIANO_MAX_MIDI, BLACK_OFFSETS, noteName } from "../constants/piano";

const props = defineProps({
  activeNotes: { type: Object, default: () => ({}) },
  expectedMidi: { type: Number, default: null },
});
const emit = defineEmits(["note-on", "note-off"]);

const blackOffsetSet = new Set(BLACK_OFFSETS);

// Список клавиш вычисляется один раз — диапазон клавиатуры фиксирован.
const keys = computed(() => {
  const list = [];
  let whiteCount = 0;
  for (let midi = PIANO_MIN_MIDI; midi <= PIANO_MAX_MIDI; midi++) {
    const offset = ((midi % 12) + 12) % 12;
    const isBlack = blackOffsetSet.has(offset);
    const label = noteName(midi);
    if (isBlack) {
      list.push({
        midi,
        isBlack: true,
        label,
        isC: false,
        leftStyle: `calc(${whiteCount} * var(--white-w) - var(--black-w) / 2)`,
      });
    } else {
      list.push({ midi, isBlack: false, label, isC: offset === 0 });
      whiteCount++;
    }
  }
  return list;
});

function keyClasses(key) {
  return [
    key.isBlack ? "piano__black" : "piano__white",
    { "is-c": key.isC, "is-active": !!props.activeNotes[key.midi], "is-expected": props.expectedMidi === key.midi },
  ];
}

function handleDown(midi) {
  emit("note-on", midi);
}
function handleUp(midi) {
  emit("note-off", midi);
}
function handleKeydown(e, midi) {
  if ((e.key === "Enter" || e.key === " ") && !e.repeat) {
    e.preventDefault();
    emit("note-on", midi);
  }
}
function handleKeyup(e, midi) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    emit("note-off", midi);
  }
}
</script>
