// Общее состояние клавиатуры: клавиатура живёт в оболочке приложения,
// а страницы уроков подписываются на сыгранные ноты и управляют подсветкой.
//
// Подсветка привязана к владельцу (id практики), чтобы блоки упражнений
// не затирали подсказки друг друга: активным может быть только одно задание.

import { reactive, ref } from "vue";

// midi -> true, пока клавиша нажата
export const activeNotes = reactive({});

// Ноты, которые урок просит сыграть (подсвечиваются на клавиатуре)
export const expectedNotes = ref([]);

// Подписи на клавишах: midi -> строка (названия нот, номера пальцев)
export const keyLabels = ref({});

// Ноты, уже засчитанные в текущем задании
export const doneNotes = ref([]);

// id задания, которое сейчас управляет клавиатурой
export const activeOwner = ref(null);

const listeners = new Set();

// Подписка на note on; возвращает функцию отписки.
export function onNote(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function emitNote(midi) {
  listeners.forEach((fn) => fn(midi));
}

export function setActive(midi, isOn) {
  if (isOn) activeNotes[midi] = true;
  else delete activeNotes[midi];
}

export function setHighlight(owner, { expected = [], labels = {}, done = [] } = {}) {
  activeOwner.value = owner;
  expectedNotes.value = expected;
  keyLabels.value = labels;
  doneNotes.value = done;
}

// Снимает подсветку, только если её ставил тот же владелец.
export function clearHighlight(owner) {
  if (owner != null && activeOwner.value !== owner) return;
  activeOwner.value = null;
  expectedNotes.value = [];
  keyLabels.value = {};
  doneNotes.value = [];
}
