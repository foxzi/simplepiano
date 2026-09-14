// Сколько раз подряд нужно пройти каждое задание.
//
// Задания в уроках короткие, поэтому пользователь может выбрать число
// повторов: задание засчитывается только после всех пройденных кругов.
// Выбор хранится в localStorage по ключу «урок:практика».

import { reactive } from "vue";

const STORAGE_KEY = "pianoL.repeats.v1";

export const REPEAT_OPTIONS = [1, 2, 3, 5, 8];

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
  return Number.isInteger(saved) && saved > 0 ? saved : 1;
}

export function setRepeats(key, value) {
  const count = Math.max(1, Math.round(Number(value) || 1));
  state.byPractice[key] = count;
  save(state.byPractice);
}
