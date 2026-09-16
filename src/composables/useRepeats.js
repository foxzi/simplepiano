// Сколько раз подряд нужно пройти каждое задание.
//
// Задания в уроках короткие, поэтому пользователь может выбрать число
// повторов: задание засчитывается только после всех пройденных кругов.
// Отдельный вариант — бесконечный режим: круги идут, пока их не остановят,
// а задание засчитывается после первого пройденного круга.
// Выбор хранится в localStorage по ключу «урок:практика».

import { reactive } from "vue";

const STORAGE_KEY = "pianoL.repeats.v1";

// 0 — бесконечный режим: в select это «∞», в движке задания — Infinity.
export const INFINITE_REPEATS = 0;

export const REPEAT_OPTIONS = [1, 2, 3, 5, 8, INFINITE_REPEATS];

function load() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (err) {
    return {};
  }
}

function save(map) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch (err) {
    /* private-режим — выбор просто не сохранится */
  }
}

const state = reactive({ byPractice: load() });

// key — «id урока:id практики».
export function getRepeats(key) {
  const saved = state.byPractice[key];
  return Number.isInteger(saved) && saved >= INFINITE_REPEATS ? saved : 1;
}

export function setRepeats(key, value) {
  const number = typeof value === "number" ? value : Number.parseInt(value, 10);
  const count = Number.isFinite(number) && number >= INFINITE_REPEATS ? Math.round(number) : 1;
  state.byPractice[key] = count;
  save(state.byPractice);
}
