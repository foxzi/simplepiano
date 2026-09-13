// Прогресс по урокам: множество пройденных id в localStorage.

import { reactive } from "vue";

const STORAGE_KEY = "pianoL.lessons.v1";

function load() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && Array.isArray(parsed.completed) ? parsed.completed : [];
  } catch (err) {
    return [];
  }
}

function save(completed) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ completed }));
  } catch (err) {
    /* private-режим — прогресс просто не сохранится */
  }
}

const state = reactive({ completed: load() });

export function useProgress() {
  function isDone(id) {
    return state.completed.includes(id);
  }

  function markDone(id) {
    if (isDone(id)) return;
    state.completed.push(id);
    save(state.completed);
  }

  function clearLesson(id) {
    const idx = state.completed.indexOf(id);
    if (idx === -1) return;
    state.completed.splice(idx, 1);
    save(state.completed);
  }

  function clearAll() {
    state.completed.splice(0, state.completed.length);
    save(state.completed);
  }

  return { state, isDone, markDone, clearLesson, clearAll };
}
