// Языки интерфейса. Словарь выбирается по текущей локали, недостающие ключи
// берутся из русского словаря, чтобы интерфейс никогда не показывал пустоту.
//
//   t("home.title")                 → строка
//   t("lesson.topics", { list: "1" }) → подстановка {list}
//   tList("practice.limits")        → массив строк
//
// Локаль хранится в localStorage (pianoL.locale.v1) и меняется без перезагрузки.

import { ref } from "vue";

import { RU } from "./ru";
import { EN } from "./en";
import { ES } from "./es";

export const LOCALES = [
  { id: "ru", label: "Русский", short: "RU" },
  { id: "en", label: "English", short: "EN" },
  { id: "es", label: "Español", short: "ES" },
];

const DICTS = { ru: RU, en: EN, es: ES };
const FALLBACK = "ru";
const STORAGE_KEY = "pianoL.locale.v1";

function storedLocale() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return DICTS[value] ? value : null;
  } catch (err) {
    return null;
  }
}

function browserLocale() {
  try {
    const list = window.navigator.languages || [window.navigator.language || ""];
    for (const tag of list) {
      const id = String(tag).slice(0, 2).toLowerCase();
      if (DICTS[id]) return id;
    }
  } catch (err) {
    /* нет navigator — остаётся язык по умолчанию */
  }
  return null;
}

export const locale = ref(storedLocale() || browserLocale() || FALLBACK);

function lookup(dict, key) {
  return key.split(".").reduce((node, part) => (node == null ? undefined : node[part]), dict);
}

function resolve(key) {
  const value = lookup(DICTS[locale.value], key);
  return value === undefined ? lookup(DICTS[FALLBACK], key) : value;
}

function fill(text, vars) {
  if (!vars) return text;
  return text.replace(/\{(\w+)\}/g, (match, name) => (vars[name] == null ? match : String(vars[name])));
}

export function t(key, vars) {
  const value = resolve(key);
  return typeof value === "string" ? fill(value, vars) : key;
}

export function tList(key) {
  const value = resolve(key);
  return Array.isArray(value) ? value : [];
}

export function setLocale(id) {
  if (!DICTS[id] || id === locale.value) return;
  locale.value = id;
  try {
    window.localStorage.setItem(STORAGE_KEY, id);
  } catch (err) {
    /* private-режим: выбор просто не сохранится */
  }
  applyDocumentLocale();
}

// Язык страницы и заголовок вкладки следуют за выбранной локалью.
export function applyDocumentLocale() {
  document.documentElement.lang = locale.value;
  document.title = t("app.title");
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", t("app.description"));
}

export function useI18n() {
  return { locale, locales: LOCALES, setLocale, t, tList };
}
