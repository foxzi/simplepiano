// Движок практических заданий урока.
//
// Типы заданий:
//   explore  — нажать несколько разных клавиш (знакомство с клавиатурой)
//   set      — сыграть все ноты из списка в любом порядке (поиск нот)
//   sequence — сыграть ноты строго по порядку (мелодии, пятипальцевые позиции)
//   rhythm   — сыграть ноту на каждый щелчок метронома (чувство ритма)

import { computed, reactive } from "vue";
import { noteName } from "../constants/piano";
import { metronome } from "../stores/audio";

// Допустимое отклонение от щелчка метронома — доля длительности доли.
const RHYTHM_TOLERANCE = 0.35;

export function useLessonTask(practice, { onComplete } = {}) {
  const notes = practice.notes || [];
  const total = practice.type === "explore" ? practice.count : notes.length;

  // Каждая нота ритмического задания должна попасть на свой щелчок,
  // поэтому запоминаем номер уже засчитанной доли.
  let countedBeat = -1;

  const state = reactive({
    running: false,
    done: false,
    index: 0, // сколько шагов засчитано
    errors: 0,
    feedback: "",
    hits: [], // засчитанные ноты (для set и explore)
    inTime: 0, // попаданий в долю (для rhythm)
  });

  // Ноты, которые сейчас нужно сыграть — для подсветки на клавиатуре.
  const expected = computed(() => {
    if (state.done || !state.running) return [];
    if (practice.type === "sequence" || practice.type === "rhythm") {
      return notes[state.index] == null ? [] : [notes[state.index]];
    }
    if (practice.type === "set") return notes.filter((midi) => !state.hits.includes(midi));
    return [];
  });

  const expectedText = computed(() => {
    if (!state.running) return practice.startHint || "Нажмите «Начать», чтобы приступить к заданию.";
    if (state.done) return practice.doneText || "Задание выполнено!";
    if (practice.type === "explore") return `Нажато разных клавиш: ${state.index} из ${total}.`;
    if (practice.type === "set") {
      const left = notes.filter((midi) => !state.hits.includes(midi));
      return "Осталось найти: " + left.map(noteName).join(", ");
    }
    const midi = notes[state.index];
    return midi == null ? "" : "Сыграйте: " + noteName(midi);
  });

  function start() {
    state.running = true;
    state.done = false;
    state.index = 0;
    state.errors = 0;
    state.hits = [];
    state.inTime = 0;
    countedBeat = -1;
    state.feedback = practice.type === "rhythm" ? "Включите метроном и играйте ровно по щелчкам." : "";
  }

  function reset() {
    state.running = false;
    state.done = false;
    state.index = 0;
    state.errors = 0;
    state.hits = [];
    state.inTime = 0;
    countedBeat = -1;
    state.feedback = "";
  }

  function finish() {
    state.done = true;
    state.running = false;
    state.feedback = practice.doneText || "Отлично, задание выполнено!";
    onComplete && onComplete();
  }

  // Попадание в долю метронома: считаем расстояние до ближайшего щелчка.
  function beatAccuracy() {
    if (!metronome.state.running || !metronome.state.lastBeatAt) return null;
    const interval = 60000 / metronome.state.bpm;
    const delta = Math.abs(performance.now() - metronome.state.lastBeatAt);
    return Math.min(delta, Math.abs(interval - delta)) <= interval * RHYTHM_TOLERANCE;
  }

  function handleNote(midi) {
    if (!state.running || state.done) return;

    if (practice.type === "explore") {
      if (state.hits.includes(midi)) {
        state.feedback = "Эту клавишу вы уже нажимали — попробуйте соседнюю.";
        return;
      }
      state.hits.push(midi);
      state.index = state.hits.length;
      state.feedback = "Звучит " + noteName(midi) + ".";
      if (state.index >= total) finish();
      return;
    }

    if (practice.type === "set") {
      if (!notes.includes(midi)) {
        state.errors += 1;
        state.feedback = "Это " + noteName(midi) + ". Ищите подсвеченные клавиши.";
        return;
      }
      if (state.hits.includes(midi)) {
        state.feedback = noteName(midi) + " уже найдена.";
        return;
      }
      state.hits.push(midi);
      state.index = state.hits.length;
      state.feedback = "Верно: " + noteName(midi) + ".";
      if (state.index >= total) finish();
      return;
    }

    // sequence и rhythm — строгий порядок нот
    const target = notes[state.index];
    if (midi !== target) {
      state.errors += 1;
      state.feedback = "Прозвучала " + noteName(midi) + ", а нужна " + noteName(target) + ".";
      return;
    }

    if (practice.type === "rhythm") {
      const hit = beatAccuracy();
      if (hit === null) {
        state.feedback = "Сначала запустите метроном — играть нужно под щелчки.";
        return;
      }
      if (metronome.state.beat === countedBeat) {
        state.feedback = "На один щелчок — одна нота. Дождитесь следующего.";
        return;
      }
      countedBeat = metronome.state.beat;
      if (hit) {
        state.inTime += 1;
        state.feedback = "В долю!";
      } else {
        state.feedback = "Нота верная, но мимо доли — слушайте щелчок.";
      }
    } else {
      state.feedback = "Верно: " + noteName(midi) + ".";
    }

    state.index += 1;
    if (state.index >= total) finish();
  }

  return { state, total, expected, expectedText, start, reset, handleNote };
}
