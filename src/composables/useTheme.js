// Тема оформления: light / dark / notebook. Персистентность через
// localStorage (защищённая от private-режима и отключённого storage),
// по умолчанию — системная тема (dark) либо notebook.

import { ref, watch } from "vue";

const STORAGE_KEY = "pianoL.theme.v1";
export const THEMES = ["light", "dark", "notebook"];

function safeGet() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch (err) {
    return null;
  }
}

function safeSet(value) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
    return true;
  } catch (err) {
    return false;
  }
}

function detectDefault() {
  try {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
  } catch (err) {
    /* matchMedia недоступен — используем тетрадь по умолчанию */
  }
  return "notebook";
}

export function useTheme() {
  const stored = safeGet();
  const theme = ref(THEMES.includes(stored) ? stored : detectDefault());

  function apply(value) {
    document.documentElement.setAttribute("data-theme", value);
  }

  function setTheme(value) {
    if (!THEMES.includes(value)) return;
    theme.value = value;
  }

  watch(
    theme,
    (value) => {
      apply(value);
      safeSet(value);
    },
    { immediate: true }
  );

  return { theme, setTheme, themes: THEMES };
}
