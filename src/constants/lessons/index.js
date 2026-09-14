// Сборка учебной программы: 48 тем дорожной карты разложены по шести модулям.
//
// Урок: { id, module, topics, title, summary, blocks, practices }
//
// Блоки теории: text | list | ordered | note | staff | listen
//   staff  — { clef, items, meter, showNames, caption }, ноты рисуются на стане
//   listen — { text, variants: [{ label, notes, step, hold, gain }] }, звуковой пример
//
// Практика: см. src/composables/useLessonTask.js
//   explore  — нажать count разных клавиш
//   set      — сыграть все ноты списка в любом порядке
//   sequence — сыграть ноты по порядку
//   rhythm   — сыграть ноты по щелчкам метронома (beats задаёт длительности)
//   chord    — взять ноты вместе
//   ear      — угадать интервал на слух

import { BASICS } from "./basics";
import { READING } from "./reading";
import { SCALES } from "./scales";
import { HARMONY } from "./harmony";
import { HANDS } from "./hands";
import { MASTERY } from "./mastery";

export const MODULES = [
  { id: "basics", title: "Первые шаги", summary: "Клавиатура, названия нот, пальцы и первый ритм." },
  { id: "reading", title: "Ритм и ноты", summary: "Длительности, паузы, нотный стан и чтение обоих ключей." },
  { id: "scales", title: "Гаммы и тональности", summary: "До мажор двумя руками, знаки альтерации и другие гаммы." },
  { id: "harmony", title: "Интервалы и аккорды", summary: "Тон и полутон, интервалы на слух, трезвучия и обороты." },
  { id: "hands", title: "Две руки и репертуар", summary: "Мелодия с аккомпанементом, чтение с листа, работа над темпом." },
  { id: "mastery", title: "Дальше вглубь", summary: "Минор, арпеджио, сложный ритм, динамика, педаль и пьесы." },
];

export const LESSONS = [...BASICS, ...READING, ...SCALES, ...HARMONY, ...HANDS, ...MASTERY];

// Тем в программе меньше, чем строк в дорожной карте, не бывает: считаем по урокам,
// чтобы заголовок на главной не расходился с содержимым.
export const TOPIC_COUNT = new Set(LESSONS.flatMap((lesson) => lesson.topics)).size;

export function findLesson(id) {
  return LESSONS.find((lesson) => lesson.id === id) || null;
}

export function lessonIndex(id) {
  return LESSONS.findIndex((lesson) => lesson.id === id);
}

// Уроки модуля вместе с их сквозными номерами в программе.
export function lessonsByModule(moduleId) {
  return LESSONS.map((lesson, index) => ({ lesson, number: index + 1 })).filter(
    (item) => item.lesson.module === moduleId
  );
}
