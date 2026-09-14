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

// Допустимое отклонение от щелчка метронома — доля длительности доли.
const RHYTHM_TOLERANCE = 0.35;

// Ноты аккорда, взятые в пределах этого окна, считаются сыгранными вместе.
const CHORD_WINDOW_MS = 1200;

const INTERVAL_NAMES = {
  0: "прима",
  1: "малая секунда",
  2: "большая секунда",
  3: "малая терция",
  4: "большая терция",
  5: "кварта",
  6: "тритон",
  7: "квинта",
  8: "малая секста",
  9: "большая секста",
  10: "малая септима",
  11: "большая септима",
  12: "октава",
};

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
  const passes = () => {
    const value = repeats ? repeats.value : 1;
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
    if (!state.running) return practice.startHint || "Нажмите «Начать», чтобы приступить к заданию.";
    if (state.done) return practice.doneText || "Задание выполнено!";
    if (practice.type === "explore") return `Нажато разных клавиш: ${state.index} из ${total}.`;
    if (practice.type === "set") {
      const left = notes.filter((midi) => !state.hits.includes(midi));
      return "Осталось найти: " + left.map(noteName).join(", ");
    }
    if (practice.type === "chord") {
      const chord = chords[state.index] || [];
      const title = (practice.chordNames || [])[state.index];
      const list = chord.map(noteName).join(" + ");
      return title ? `Аккорд ${title}: ${list}` : "Возьмите вместе: " + list;
    }
    if (practice.type === "ear") {
      return `Вопрос ${state.index + 1} из ${total}: сыграйте вторую услышанную ноту.`;
    }
    const midi = notes[state.index];
    if (midi == null) return "";
    if (practice.noHints) return `Нота ${state.index + 1} из ${total}: играйте по записи, без подсказок.`;
    return "Сыграйте: " + noteName(midi);
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
      state.feedback = "Включите метроном и играйте ровно по щелчкам.";
    } else if (practice.type === "chord") {
      state.feedback = "Мышью ноты можно брать быстро подряд — это тоже засчитывается.";
    } else if (practice.type === "ear") {
      nextEarRound();
    } else {
      state.feedback = "";
    }
  }

  function reset() {
    state.running = false;
    resetState();
    state.feedback = "";
  }

  // Круг пройден: либо начинаем следующий, либо задание выполнено.
  function finish() {
    state.round += 1;
    if (state.round >= passes()) {
      state.done = true;
      state.running = false;
      state.feedback = practice.doneText || "Отлично, задание выполнено!";
      onComplete && onComplete();
      return;
    }

    // Следующий круг: прогресс внутри круга обнуляем, ошибки копятся дальше.
    state.index = 0;
    state.hits = [];
    baseBeat = null;
    countedBeat = -1;
    chordBuffer = [];
    state.feedback = `Круг ${state.round} из ${passes()} пройден — играйте ещё раз.`;
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
    state.feedback = "Слушайте: сначала опорная нота, затем вторая.";
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
      state.feedback = "Эту клавишу вы уже нажимали — попробуйте соседнюю.";
      return;
    }
    state.hits.push(midi);
    state.index = state.hits.length;
    state.feedback = "Звучит " + noteName(midi) + ".";
    if (state.index >= total) finish();
  }

  function handleSet(midi) {
    if (!notes.includes(midi)) {
      state.errors += 1;
      state.feedback = "Это " + noteName(midi) + ". Ищите нужные клавиши.";
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
  }

  function handleChord(midi) {
    const chord = chords[state.index] || [];
    const now = performance.now();
    chordBuffer = chordBuffer.filter((item) => now - item.t <= CHORD_WINDOW_MS);

    if (!chord.includes(midi)) {
      state.errors += 1;
      chordBuffer = [];
      state.hits = [];
      state.feedback = "Лишняя нота " + noteName(midi) + " — аккорд начинаем заново.";
      return;
    }

    if (!chordBuffer.some((item) => item.midi === midi)) chordBuffer.push({ midi, t: now });
    state.hits = chordBuffer.map((item) => item.midi);

    if (chord.every((note) => state.hits.includes(note))) {
      state.index += 1;
      chordBuffer = [];
      state.hits = [];
      state.feedback = "Аккорд взят.";
      if (state.index >= total) finish();
    } else {
      state.feedback = "Держим дальше: осталось " + (chord.length - state.hits.length) + " нот(ы).";
    }
  }

  function handleEar(midi) {
    if (midi !== state.answer) {
      state.errors += 1;
      state.feedback = "Это " + noteName(midi) + ". Послушайте ещё раз и сравните с опорной нотой.";
      return;
    }
    const semitones = state.answer - practice.root;
    state.index += 1;
    state.feedback = "Верно: " + (INTERVAL_NAMES[semitones] || "интервал") + ".";
    if (state.index >= total) {
      finish();
      return;
    }
    window.setTimeout(nextEarRound, 700);
  }

  function handleRhythm(midi) {
    const hit = beatAccuracy();
    if (hit === null) {
      state.feedback = "Сначала запустите метроном — играть нужно под щелчки.";
      return false;
    }
    if (!bpmOk()) {
      state.feedback = `Поставьте темп ${practice.requireBpm.min}–${practice.requireBpm.max} уд/мин.`;
      return false;
    }
    if (metronome.state.beat === countedBeat) {
      state.feedback = "На один щелчок — одна нота. Дождитесь следующего щелчка.";
      return false;
    }

    // Ритмический рисунок: нота вступает через заданное число долей от предыдущей.
    if (beats && baseBeat != null) {
      const wanted = baseBeat + (beats[state.index] - beats[0]);
      if (metronome.state.beat < wanted) {
        state.feedback = "Рано: держите предыдущую ноту, осталось долей — " + (wanted - metronome.state.beat) + ".";
        return false;
      }
      if (metronome.state.beat > wanted) {
        state.errors += 1;
        state.feedback = "Поздно: нота должна была вступить раньше. Идём дальше.";
        countedBeat = metronome.state.beat;
        return true;
      }
    }

    if (baseBeat == null) baseBeat = metronome.state.beat;
    countedBeat = metronome.state.beat;
    if (hit) {
      state.inTime += 1;
      state.feedback = "В долю!";
    } else {
      state.feedback = "Нота верная, но мимо доли — слушайте щелчок.";
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
        ? "Не та нота — прозвучала " + noteName(midi) + "."
        : "Прозвучала " + noteName(midi) + ", а нужна " + noteName(target) + ".";
      return;
    }

    if (practice.type === "rhythm") {
      if (!handleRhythm(midi)) return;
    } else {
      state.feedback = "Верно: " + noteName(midi) + ".";
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
