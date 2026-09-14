<template>
  <div class="piano" role="group" :aria-label="t('piano.aria')">
    <button
      v-for="key in keys"
      :key="key.midi"
      type="button"
      :class="keyClasses(key)"
      :style="key.isBlack ? { left: key.leftStyle } : null"
      :aria-label="key.label"
      :data-label="keyLabel(key)"
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
import { t } from "../i18n";

// Состояние (нажатия, подсветка, подписи) берём из общего хранилища:
// клавиатура одна на всё приложение, а управляют ей страницы уроков.
const props = defineProps({
  activeNotes: { type: Object, default: () => ({}) },
  expectedNotes: { type: Array, default: () => [] },
  doneNotes: { type: Array, default: () => [] },
  labels: { type: Object, default: () => ({}) },
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
    {
      "is-c": key.isC,
      "is-active": !!props.activeNotes[key.midi],
      "is-expected": props.expectedNotes.includes(key.midi),
      "is-done": props.doneNotes.includes(key.midi),
    },
  ];
}

// Подпись на клавише: заданная уроком либо стандартная пометка на До.
function keyLabel(key) {
  const custom = props.labels[key.midi];
  if (custom) return custom;
  return key.isC ? key.label : null;
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
