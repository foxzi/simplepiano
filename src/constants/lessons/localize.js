// Наложение перевода на урок: структура (ноты, типы практик, стан) живёт в
// русских файлах модулей, а тексты для en/es берутся из пакетов ./i18n/<locale>.
// Недостающий перевод не ломает урок — остаётся русский текст.

import { locale } from "../../i18n";
import { noteLabel } from "../piano";
import { EN_LESSONS } from "./i18n/en/index.js";
import { ES_LESSONS } from "./i18n/es/index.js";

const PACKS = { en: EN_LESSONS, es: ES_LESSONS };

// Подписи на клавишах бывают двух видов: названия нот и номера пальцев.
// Названия пересчитываются из midi, аппликатура остаётся как есть.
const RU_NOTE_LABELS = new Set(["До", "Ре", "Ми", "Фа", "Соль", "Ля", "Си"]);

function localizeLabels(labels) {
  if (!labels) return labels;
  const out = {};
  for (const [midi, value] of Object.entries(labels)) {
    out[midi] = RU_NOTE_LABELS.has(value) ? noteLabel(Number(midi)) : value;
  }
  return out;
}

function localizeBlock(block, tr) {
  if (tr == null) return block;
  switch (block.type) {
    case "text":
    case "note":
      return { ...block, text: String(tr) };
    case "list":
    case "ordered":
      return Array.isArray(tr) ? { ...block, items: tr } : block;
    case "staff":
      return { ...block, caption: tr.caption == null ? block.caption : tr.caption };
    case "listen":
      return {
        ...block,
        text: tr.text == null ? block.text : tr.text,
        variants: (block.variants || []).map((variant, i) => ({
          ...variant,
          label: tr.labels && tr.labels[i] != null ? tr.labels[i] : variant.label,
        })),
      };
    default:
      return block;
  }
}

function localizePractice(practice, tr) {
  const next = { ...practice, labels: localizeLabels(practice.labels) };
  if (!tr) return next;
  for (const field of ["title", "instruction", "doneText", "startHint"]) {
    if (tr[field] != null) next[field] = tr[field];
  }
  if (Array.isArray(tr.chordNames)) next.chordNames = tr.chordNames;
  return next;
}

export function localizeLesson(lesson, current = locale.value) {
  if (!lesson) return null;
  const pack = PACKS[current];
  const tr = pack ? pack[lesson.id] : null;

  return {
    ...lesson,
    title: tr && tr.title ? tr.title : lesson.title,
    summary: tr && tr.summary ? tr.summary : lesson.summary,
    blocks: lesson.blocks.map((block, i) => localizeBlock(block, tr && tr.blocks ? tr.blocks[i] : null)),
    practices: lesson.practices.map((practice) =>
      localizePractice(practice, tr && tr.practices ? tr.practices[practice.id] : null)
    ),
  };
}

// Короткая карточка урока для оглавления — без разбора блоков.
export function localizeLessonMeta(lesson, current = locale.value) {
  const pack = PACKS[current];
  const tr = pack ? pack[lesson.id] : null;
  if (!tr) return lesson;
  return { ...lesson, title: tr.title || lesson.title, summary: tr.summary || lesson.summary };
}
