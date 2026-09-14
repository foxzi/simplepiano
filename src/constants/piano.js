// Константы клавиатуры и упражнения — гамма До мажор, одна октава.

import { locale } from "../i18n";

// Названия нот по локалям, индекс = midi % 12, До = 0.
// Русский и испанский используют сольфеджио, английский — буквенные названия.
export const NOTE_NAMES = {
  ru: ["До", "До\u266F", "Ре", "Ре\u266F", "Ми", "Фа", "Фа\u266F", "Соль", "Соль\u266F", "Ля", "Ля\u266F", "Си"],
  en: ["C", "C\u266F", "D", "D\u266F", "E", "F", "F\u266F", "G", "G\u266F", "A", "A\u266F", "B"],
  es: ["Do", "Do\u266F", "Re", "Re\u266F", "Mi", "Fa", "Fa\u266F", "Sol", "Sol\u266F", "La", "La\u266F", "Si"],
};

// Старое имя сохранено: на него опираются прежние импорты.
export const NOTE_NAMES_RU = NOTE_NAMES.ru;


// Диапазон видимой клавиатуры: до 3-й октавы (MIDI 48) .. до 6-й октавы (MIDI 84).
// Нижняя октава нужна левой руке и урокам басового ключа.
export const PIANO_MIN_MIDI = 48;
export const PIANO_MAX_MIDI = 84;

// Смещения внутри октавы для белых и чёрных клавиш
export const WHITE_OFFSETS = [0, 2, 4, 5, 7, 9, 11];
export const BLACK_OFFSETS = [1, 3, 6, 8, 10];

// Упражнение: гамма до мажор вверх, C4..C5 (MIDI 60..72)
export const EXERCISE_SEQUENCE = [60, 62, 64, 65, 67, 69, 71, 72];
export const FINGERING = {
  right: [1, 2, 3, 1, 2, 3, 4, 5],
  left: [5, 4, 3, 2, 1, 3, 2, 1],
};

export const DEMO_STEP_MS = 480;
export const DEMO_NOTE_MS = 420;

// Название ноты без октавы — для подписей на клавишах.
export function noteLabel(midi) {
  const names = NOTE_NAMES[locale.value] || NOTE_NAMES.ru;
  return names[((midi % 12) + 12) % 12];
}

export function noteName(midi) {
  const octave = Math.floor(midi / 12) - 1;
  return noteLabel(midi) + octave;
}

export function midiToFrequency(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

// --- Помощники для нотного стана ---

// Ступень внутри октавы для каждой из двенадцати клавиш: чёрная клавиша
// записывается на той же линейке, что и белая слева от неё, плюс диез.
const DEGREE_IN_OCTAVE = [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6];
const BLACK_SET = new Set(BLACK_OFFSETS);

export function isBlackKey(midi) {
  return BLACK_SET.has(((midi % 12) + 12) % 12);
}

// Номер ступени, считая от до нулевой октавы: соседние линейки и промежутки
// отличаются ровно на единицу, поэтому по нему удобно считать высоту на стане.
export function diatonicStep(midi) {
  const offset = ((midi % 12) + 12) % 12;
  const octave = Math.floor(midi / 12) - 1;
  return octave * 7 + DEGREE_IN_OCTAVE[offset];
}
