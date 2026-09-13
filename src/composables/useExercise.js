// Упражнение: гамма до мажор. Прогресс и результат совместимы по ключу
// localStorage со старой версией приложения (pianoL.progress.v1).

import { reactive } from "vue";
import { EXERCISE_SEQUENCE, FINGERING } from "../constants/piano";

const STORAGE_KEY = "pianoL.progress.v1";

function safeStorageGet() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    return null;
  }
}

function safeStorageSet(value) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    return true;
  } catch (err) {
    return false;
  }
}

export function useExercise({ noteName, onStart } = {}) {
  const state = reactive({
    active: false,
    index: 0,
    errors: 0,
    hand: "right",
    expectedMidi: null,
    expectedText: "Нажмите «Начать», чтобы приступить к упражнению.",
    feedback: "\u00a0",
    feedbackKind: "",
    result: "",
    resultKind: "",
    total: EXERCISE_SEQUENCE.length,
  });

  function setHand(hand) {
    state.hand = hand;
    if (state.active) updateExpected();
  }

  function updateExpected() {
    if (!state.active || state.index >= EXERCISE_SEQUENCE.length) {
      state.expectedMidi = null;
      return;
    }
    const midi = EXERCISE_SEQUENCE[state.index];
    const finger = FINGERING[state.hand][state.index];
    const handLabel = state.hand === "right" ? "правой" : "левой";
    state.expectedText = `Играйте: ${noteName(midi)} (палец ${finger} ${handLabel} руки)`;
    state.expectedMidi = midi;
  }

  function start() {
    onStart && onStart();
    state.active = true;
    state.index = 0;
    state.errors = 0;
    state.result = "";
    state.resultKind = "";
    state.feedback = "Упражнение начато. Играйте первую ноту.";
    state.feedbackKind = "";
    updateExpected();
  }

  function reset() {
    onStart && onStart();
    state.active = false;
    state.index = 0;
    state.errors = 0;
    state.feedback = "\u00a0";
    state.feedbackKind = "";
    state.result = "";
    state.expectedText = "Нажмите «Начать», чтобы приступить к упражнению.";
    state.expectedMidi = null;
    renderStoredResult();
  }

  function handleNotePlayed(midi) {
    if (!state.active) return;
    if (state.index >= EXERCISE_SEQUENCE.length) return;

    const expected = EXERCISE_SEQUENCE[state.index];
    if (midi === expected) {
      state.index++;
      if (state.index >= EXERCISE_SEQUENCE.length) {
        finish();
      } else {
        state.feedback = "Верно! Играйте следующую ноту.";
        state.feedbackKind = "ok";
        updateExpected();
      }
    } else {
      state.errors++;
      state.feedback = `Не та нота (сыграно ${noteName(midi)}, нужно ${noteName(expected)}). Попробуйте ещё раз.`;
      state.feedbackKind = "error";
    }
  }

  function finish() {
    state.active = false;
    state.expectedMidi = null;
    state.expectedText = "Гамма сыграна полностью!";
    state.feedback = "Упражнение завершено.";
    state.feedbackKind = "ok";

    const record = {
      completed: true,
      errors: state.errors,
      hand: state.hand,
      completedAt: new Date().toISOString(),
    };
    const stored = safeStorageGet() || {};
    stored.cMajor = record;
    const saved = safeStorageSet(stored);
    renderResult(record, saved);
  }

  function renderResult(record, saved) {
    const handLabel = record.hand === "right" ? "правой" : "левой";
    let text = `Результат: гамма до мажор пройдена ${handLabel} рукой, ошибок: ${record.errors}.`;
    if (!saved) {
      text += " (Не удалось сохранить результат в этом браузере.)";
    }
    state.result = text;
    state.resultKind = "ok";
  }

  function renderStoredResult() {
    const stored = safeStorageGet();
    if (stored && stored.cMajor && stored.cMajor.completed) {
      const record = stored.cMajor;
      const handLabel = record.hand === "right" ? "правой" : "левой";
      let date = "";
      try {
        date = new Date(record.completedAt).toLocaleString("ru-RU");
      } catch (err) {
        date = record.completedAt;
      }
      state.result = `Ранее пройдено (${date}): ${handLabel} рукой, ошибок: ${record.errors}.`;
      state.resultKind = "";
    }
  }

  return { state, setHand, start, reset, handleNotePlayed, renderStoredResult };
}
