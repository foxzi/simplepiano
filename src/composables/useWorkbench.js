// Свёрнутое или развёрнутое состояние нижней панели с клавиатурой.
//
// Панель общая для всех страниц и занимает заметную часть экрана,
// поэтому выбор пользователя сохраняется в localStorage.

import { computed, reactive } from "vue";

const STORAGE_KEY = "pianoL.workbench.v1";

function load() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "collapsed";
  } catch (err) {
    return false;
  }
}

const state = reactive({ collapsed: load() });

function save() {
  try {
    window.localStorage.setItem(STORAGE_KEY, state.collapsed ? "collapsed" : "expanded");
  } catch (err) {
    /* private-режим — выбор просто не сохранится */
  }
}

export function useWorkbench() {
  const collapsed = computed(() => state.collapsed);

  function toggle() {
    state.collapsed = !state.collapsed;
    save();
  }

  // Клик по клавише с физической MIDI-клавиатуры должен показать панель обратно.
  function expand() {
    if (!state.collapsed) return;
    state.collapsed = false;
    save();
  }

  return { collapsed, toggle, expand };
}
