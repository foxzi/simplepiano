// Движок практических заданий урока.
//
// Типы заданий:
//   explore  — нажать несколько разных клавиш (знакомство с клавиатурой)
//   set      — сыграть все ноты из списка в любом порядке (поиск нот)
//   sequence — сыграть ноты строго по порядку (мелодии, пятипальцевые позиции)
//   rhythm   — сыграть ноты по долям метронома; practice.beats задаёт
//              положение каждой ноты в щелчках; проверяются вступления,
//              но не удержание клавиш и тишина во время пауз
//   chord    — взять несколько нот вместе (или очень быстро подряд)
//   ear      — угадать интервал на слух и сыграть услышанную вторую ноту

import { computed, reactive } from "vue";
import { noteName } from "../constants/piano";
import { metronome, synth } from "../stores/audio";
import { INFINITE_REPEATS } from "./useRepeats";
import { t } from "../i18n";

// Допустимое отклонение от щелчка метронома — доля длительности доли.
const RHYTHM_TOLERANCE = 0.35;

// Ноты аккорда, взятые в пределах этого окна, считаются сыгранными вместе.
const CHORD_WINDOW_MS = 1200;

function intervalName(semitones) {
  return t(`intervals.${semitones}`);
}

export function useLessonTask(practice, { onComplete, repeats } = {}) {
  const notes = practice.notes || [];
  const chords = practice.chords || [];
  const beats = practice.beats || null;

  const total =
    practice.type === "explore"
      ? practice.count
      : practice.type === "chord"
        ? chords.length
        : practice.type === "ear"
          ? practice.rounds
          : notes.length;

  // Сколько кругов нужно пройти: значение выбирает пользователь (см. useRepeats).
  // Бесконечный режим (INFINITE_REPEATS) даёт Infinity — круги не заканчиваются.
  const passes = () => {
    const value = repeats ? repeats.value : 1;
    if (value === INFINITE_REPEATS) return Infinity;
    return Number.isInteger(value) && value > 0 ? value : 1;
  };

  // Ритм: доля, на которой была засчитана первая нота, — от неё считаем рисунок.
  let baseBeat = null;
  let countedBeat = -1;

  // Аккорд: ноты, взятые за последнее время.
  let chordBuffer = [];

  const state = reactive({
    running: false,
    done: false,
    index: 0, // сколько шагов засчитано
    round: 0, // сколько кругов пройдено целиком
    errors: 0,
    feedback: "",
    feedbackKind: "", // "ok" — успешный шаг, для подсветки статуса в интерфейсе
    hits: [], // засчитанные ноты (для set, explore и текущего аккорда)
    inTime: 0, // попаданий в долю (для rhythm)
    answer: null, // загаданная нота (для ear)
  });

  // Ноты, которые сейчас нужно сыграть — для подсветки на клавиатуре.
  const expected = computed(() => {
    if (state.done || !state.running) return [];
    if (practice.type === "sequence" || practice.type === "rhythm") {
      return notes[state.index] == null ? [] : [notes[state.index]];
    }
    if (practice.type === "set") return notes.filter((midi) => !state.hits.includes(midi));
    if (practice.type === "chord") {
      const chord = chords[state.index] || [];
      return chord.filter((midi) => !state.hits.includes(midi));
    }
    return [];
  });

  const expectedText = computed(() => {
    if (!state.running) return practice.startHint || t("task.defaultStartHint");
    if (state.done) return practice.doneText || t("task.defaultDoneText");
    if (practice.type === "explore") return t("task.exploreProgress", { index: state.index, total });
    if (practice.type === "set") {
      const left = notes.filter((midi) => !state.hits.includes(midi));
      return t("task.setRemaining", { list: left.map(noteName).join(", ") });
    }
    if (practice.type === "chord") {
      const chord = chords[state.index] || [];
      const title = (practice.chordNames || [])[state.index];
      const list = chord.map(noteName).join(" + ");
      return title ? t("task.chordNamed", { title, list }) : t("task.chordPlain", { list });
    }
    if (practice.type === "ear") {
      return t("task.earQuestion", { n: state.index + 1, total });
    }
    const midi = notes[state.index];
    if (midi == null) return "";
    if (practice.noHints) return t("task.noteNoHints", { n: state.index + 1, total });
    return t("task.playNote", { note: noteName(midi) });
  });

  // Темп, нужный заданию: уроки про скорость требуют конкретного диапазона BPM.
  function bpmOk() {
    const range = practice.requireBpm;
    if (!range) return true;
    const bpm = metronome.state.bpm;
    return bpm >= range.min && bpm <= range.max;
  }

  function resetState() {
    state.done = false;
    state.index = 0;
    state.round = 0;
    state.errors = 0;
    state.feedback = "";
    state.feedbackKind = "";
    state.hits = [];
    state.inTime = 0;
    state.answer = null;
    baseBeat = null;
    countedBeat = -1;
    chordBuffer = [];
  }

  function start() {
    resetState();
    state.running = true;
    if (practice.type === "rhythm") {
      state.feedback = t("task.startRhythm");
      state.feedbackKind = "";
    } else if (practice.type === "chord") {
      state.feedback = t("task.startChord");
      state.feedbackKind = "";
    } else if (practice.type === "ear") {
      nextEarRound();
    } else {
      state.feedback = "";
      state.feedbackKind = "";
    }
  }

  function reset() {
    state.running = false;
    resetState();
    state.feedback = "";
    state.feedbackKind = "";
  }

  // Круг пройден: либо начинаем следующий, либо задание выполнено.
  function finish() {
    const limit = passes();
    const infinite = !Number.isFinite(limit);
    state.round += 1;
    if (state.round >= limit) {
      state.done = true;
      state.running = false;
      state.feedback = practice.doneText || t("task.completeDefault");
      state.feedbackKind = "ok";
      onComplete && onComplete();
      return;
    }

    // Следующий круг: прогресс внутри круга обнуляем, ошибки копятся дальше.
    state.index = 0;
    state.hits = [];
    baseBeat = null;
    countedBeat = -1;
    chordBuffer = [];
    if (infinite) {
      // В бесконечном режиме зачёт ставим после первого круга, дальше это тренировка.
      if (state.round === 1) {
        state.feedback = t("task.roundDoneCredited");
        onComplete && onComplete();
      } else {
        state.feedback = t("task.roundDoneInfinite", { round: state.round });
      }
    } else {
      state.feedback = t("task.roundDone", { round: state.round, passes: limit });
    }
    state.feedbackKind = "ok";
    if (practice.type === "ear") window.setTimeout(nextEarRound, 700);
  }

  // Попадание в долю метронома: считаем расстояние до ближайшего щелчка.
  function beatAccuracy() {
    if (!metronome.state.running || !metronome.state.lastBeatAt) return null;
    const interval = 60000 / metronome.state.bpm;
    const delta = Math.abs(performance.now() - metronome.state.lastBeatAt);
    return Math.min(delta, Math.abs(interval - delta)) <= interval * RHYTHM_TOLERANCE;
  }

  // --- Слуховые задания ---

  function nextEarRound() {
    const list = practice.intervals || [];
    const semitones = list[Math.floor(Math.random() * list.length)];
    state.answer = practice.root + semitones;
    state.feedback = t("task.earListen");
    state.feedbackKind = "";
    playEar();
  }

  function playEar() {
    if (state.answer == null) return;
    synth.playTransient(practice.root, 900);
    window.setTimeout(() => synth.playTransient(state.answer, 900), 800);
  }

  // Проигрывание задания целиком: ноты идут в темпе метронома, паузы учтены.
  function demo() {
    const step = 60000 / metronome.state.bpm;
    const list = practice.type === "chord" ? chords : notes.map((midi) => [midi]);
    list.forEach((group, i) => {
      const at = (beats ? beats[i] - (beats[0] || 0) : i) * step;
      const hold = practice.type === "chord" ? 900 : Math.min(step * 0.9, 900);
      window.setTimeout(() => group.forEach((midi) => synth.playTransient(midi, hold)), at);
    });
  }

  // --- Обработка сыгранной ноты ---

  function handleExplore(midi) {
    if (state.hits.includes(midi)) {
      state.feedback = t("task.exploreRepeat");
      state.feedbackKind = "error";
      return;
    }
    state.hits.push(midi);
    state.index = state.hits.length;
    state.feedback = t("task.explorePlayed", { note: noteName(midi) });
    state.feedbackKind = "";
    if (state.index >= total) finish();
  }

  function handleSet(midi) {
    if (!notes.includes(midi)) {
      state.errors += 1;
      state.feedback = t("task.setWrong", { note: noteName(midi) });
      state.feedbackKind = "error";
      return;
    }
    if (state.hits.includes(midi)) {
      state.feedback = t("task.setAlready", { note: noteName(midi) });
      state.feedbackKind = "";
      return;
    }
    state.hits.push(midi);
    state.index = state.hits.length;
    state.feedback = t("task.correctNote", { note: noteName(midi) });
    state.feedbackKind = "ok";
    if (state.index >= total) finish();
  }

  function handleChord(midi) {
    const chord = chords[state.index] || [];
    const now = performance.now();
    chordBuffer = chordBuffer.filter((item) => now - item.t <= CHORD_WINDOW_MS);

    if (!chord.includes(midi)) {
      state.errors += 1;
      chordBuffer = [];
      state.hits = [];
      state.feedback = t("task.chordWrong", { note: noteName(midi) });
      state.feedbackKind = "error";
      return;
    }

    if (!chordBuffer.some((item) => item.midi === midi)) chordBuffer.push({ midi, t: now });
    state.hits = chordBuffer.map((item) => item.midi);

    if (chord.every((note) => state.hits.includes(note))) {
      state.index += 1;
      chordBuffer = [];
      state.hits = [];
      state.feedback = t("task.chordDone");
      state.feedbackKind = "ok";
      if (state.index >= total) finish();
    } else {
      state.feedback = t("task.chordHold", { count: chord.length - state.hits.length });
      state.feedbackKind = "";
    }
  }

  function handleEar(midi) {
    if (midi !== state.answer) {
      state.errors += 1;
      state.feedback = t("task.earWrong", { note: noteName(midi) });
      state.feedbackKind = "error";
      return;
    }
    const semitones = state.answer - practice.root;
    state.index += 1;
    state.feedback = t("task.earCorrect", { interval: intervalName(semitones) });
    state.feedbackKind = "ok";
    if (state.index >= total) {
      finish();
      return;
    }
    window.setTimeout(nextEarRound, 700);
  }

  function handleRhythm(midi) {
    const hit = beatAccuracy();
    if (hit === null) {
      state.feedback = t("task.rhythmNoMetronome");
      state.feedbackKind = "error";
      return false;
    }
    if (!bpmOk()) {
      state.feedback = t("task.rhythmBpmRange", {
        min: practice.requireBpm.min,
        max: practice.requireBpm.max,
        unit: t("workbench.bpmUnit"),
      });
      state.feedbackKind = "error";
      return false;
    }
    if (metronome.state.beat === countedBeat) {
      state.feedback = t("task.rhythmOneNote");
      state.feedbackKind = "";
      return false;
    }

    // Ритмический рисунок: нота вступает через заданное число долей от предыдущей.
    if (beats && baseBeat != null) {
      const wanted = baseBeat + (beats[state.index] - beats[0]);
      if (metronome.state.beat < wanted) {
        state.feedback = t("task.rhythmEarly", { count: wanted - metronome.state.beat });
        state.feedbackKind = "error";
        return false;
      }
      if (metronome.state.beat > wanted) {
        state.errors += 1;
        state.feedback = t("task.rhythmLate");
        state.feedbackKind = "error";
        countedBeat = metronome.state.beat;
        return true;
      }
    }

    if (baseBeat == null) baseBeat = metronome.state.beat;
    countedBeat = metronome.state.beat;
    if (hit) {
      state.inTime += 1;
      state.feedback = t("task.rhythmInTime");
      state.feedbackKind = "ok";
    } else {
      state.feedback = t("task.rhythmOffBeat");
      state.feedbackKind = "";
    }
    return true;
  }

  function handleNote(midi) {
    if (!state.running || state.done) return;

    if (practice.type === "explore") return handleExplore(midi);
    if (practice.type === "set") return handleSet(midi);
    if (practice.type === "chord") return handleChord(midi);
    if (practice.type === "ear") return handleEar(midi);

    // sequence и rhythm — строгий порядок нот
    const target = notes[state.index];
    if (midi !== target) {
      state.errors += 1;
      state.feedback = practice.noHints
        ? t("task.wrongNoteNoHints", { note: noteName(midi) })
        : t("task.wrongNote", { note: noteName(midi), expected: noteName(target) });
      state.feedbackKind = "error";
      return;
    }

    if (practice.type === "rhythm") {
      if (!handleRhythm(midi)) return;
    } else {
      state.feedback = t("task.correctNote", { note: noteName(midi) });
      state.feedbackKind = "ok";
    }

    state.index += 1;
    if (state.index >= total) finish();
  }

  return {
    state,
    total,
    passes: computed(() => passes()),
    expected,
    expectedText,
    start,
    reset,
    handleNote,
    demo,
    playEar,
  };
}
