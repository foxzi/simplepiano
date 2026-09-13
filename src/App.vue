<template>
  <div class="app-shell">
    <header class="topbar">
      <div class="topbar__brand">
        <span class="topbar__mark" aria-hidden="true">&#9834;</span>
        <span class="topbar__title">Piano Studio</span>
      </div>
      <ThemeSwitcher :theme="theme" @update:theme="setTheme" />
    </header>

    <main class="layout">
      <section class="hero">
        <p class="hero__kicker">учебная тетрадь · фортепиано</p>
        <h1 class="hero__title">До мажор и первые шаги</h1>
        <p class="hero__subtitle">
          Теория, гамма до мажор и практика на MIDI-клавиатуре или мышью — прямо в браузере, без установки.
        </p>
      </section>

      <div class="grid">
        <!-- MIDI -->
        <section class="card" aria-labelledby="midi-title">
          <h2 id="midi-title" class="card__title"><span class="card__index">1</span> MIDI-клавиатура</h2>
          <p class="card__hint">
            Подключите класс-совместимую MIDI-клавиатуру или синтезатор через USB, затем нажмите кнопку ниже.
          </p>

          <div class="row">
            <button type="button" class="btn btn--primary" :disabled="!midi.state.supported || midi.state.busy" @click="connectMidi">
              {{ midi.state.connected || midi.state.inputs.length ? "Обновить список устройств" : "Подключить MIDI" }}
            </button>
            <label class="field" v-if="midi.state.inputs.length">
              <span class="field__label">Устройство</span>
              <select
                aria-label="Выбор MIDI-устройства"
                :value="midi.state.selectedInputId"
                @change="midi.selectInput($event.target.value)"
              >
                <option v-for="input in midi.state.inputs" :key="input.id" :value="input.id">{{ input.label }}</option>
              </select>
            </label>
          </div>

          <p class="status" role="status" aria-live="polite">{{ midi.state.status }}</p>
        </section>

        <!-- Piano + sound -->
        <section class="card card--wide" aria-labelledby="piano-title">
          <h2 id="piano-title" class="card__title"><span class="card__index">2</span> Клавиатура на экране</h2>
          <p class="card__hint">
            Нажимайте клавиши мышью, пальцем или клавишей Enter/Пробел, выбрав клавишу через Tab. Диапазон — две
            октавы, до&#8324;–до&#8326;.
          </p>

          <div class="row row--wrap">
            <button type="button" class="btn" @click="testSound">Проверить звук</button>
            <span class="audio-badge" :class="'audio-badge--' + audioStatusKind" role="status" aria-live="polite">
              Звук: {{ audioStatusText }}
            </span>
          </div>

          <p class="card__hint" v-if="synth.state.error">Сообщение браузера: {{ synth.state.error }}</p>

          <div class="row row--wrap">
            <label class="switch">
              <input type="checkbox" v-model="soundEnabled" @change="onSoundChange" />
              <span class="switch__track" aria-hidden="true"></span>
              <span class="switch__label">
                Звук синтезатора для MIDI (выключен по умолчанию, чтобы не дублировать звук вашей клавиатуры)
              </span>
            </label>
          </div>

          <p class="card__hint" v-if="midi.state.connected && !soundEnabled">
            Клавиатура подключена, но звук синтезатора выключен: если ваш инструмент не звучит сам, включите
            переключатель выше.
          </p>

          <div class="piano-scroll">
            <PianoKeyboard
              :active-notes="activeNotes"
              :expected-midi="exercise.state.expectedMidi"
              @note-on="onUiNoteOn"
              @note-off="onUiNoteOff"
            />
          </div>
        </section>

        <!-- Exercise -->
        <section class="card card--wide" aria-labelledby="exercise-title">
          <h2 id="exercise-title" class="card__title"><span class="card__index">3</span> Упражнение: гамма до мажор вверх</h2>
          <p class="card__hint">
            До – Ре – Ми – Фа – Соль – Ля – Си – До. Сыграйте ноты по порядку — на MIDI-клавиатуре или щёлкая по
            клавишам выше.
          </p>

          <div class="row row--wrap">
            <fieldset class="hand-choice">
              <legend>Рука</legend>
              <label>
                <input type="radio" name="hand" value="right" :checked="exercise.state.hand === 'right'" @change="exercise.setHand('right')" />
                Правая
              </label>
              <label>
                <input type="radio" name="hand" value="left" :checked="exercise.state.hand === 'left'" @change="exercise.setHand('left')" />
                Левая
              </label>
            </fieldset>

            <div class="row__buttons">
              <button type="button" class="btn btn--primary" @click="exercise.start">Начать</button>
              <button type="button" class="btn" @click="exercise.reset">Сбросить</button>
            </div>
          </div>

          <div class="exercise-status">
            <p class="exercise-status__expected">{{ exercise.state.expectedText }}</p>
            <div
              class="progress"
              role="progressbar"
              aria-labelledby="exercise-title"
              aria-valuemin="0"
              :aria-valuemax="exercise.state.total"
              :aria-valuenow="exercise.state.index"
            >
              <div class="progress__bar" :style="{ width: progressPct + '%' }"></div>
            </div>
            <p class="exercise-status__meta">
              <span>Шаг: <strong>{{ exercise.state.index }}</strong> / {{ exercise.state.total }}</span>
              <span>Ошибки: <strong>{{ exercise.state.errors }}</strong></span>
            </p>
          </div>

          <p class="status" :class="feedbackClass" role="status" aria-live="polite">{{ exercise.state.feedback }}</p>
          <p class="status status--result" role="status" aria-live="polite">{{ exercise.state.result }}</p>
        </section>

        <!-- Demo + metronome -->
        <section class="card" aria-labelledby="tools-title">
          <h2 id="tools-title" class="card__title"><span class="card__index">4</span> Демонстрация и метроном</h2>

          <div class="row row--wrap">
            <div class="row__buttons">
              <button type="button" class="btn btn--primary" :disabled="demo.state.playing" @click="demo.play">
                Играть демонстрацию
              </button>
              <button type="button" class="btn" :disabled="!demo.state.playing" @click="demo.stop">
                Остановить демонстрацию
              </button>
            </div>
          </div>
          <p class="card__hint card__hint--tight">
            Демонстрация звучит всегда (после клика — так работают браузеры), независимо от переключателя звука выше.
          </p>

          <hr class="divider" />

          <div class="row row--wrap">
            <label class="field">
              <span class="field__label">Темп метронома, уд/мин</span>
              <input type="range" min="40" max="200" step="1" v-model.number="metronome.state.bpm" @input="metronome.restartIfRunning" />
            </label>
            <output>{{ metronome.state.bpm }}</output>

            <div class="row__buttons">
              <button type="button" class="btn btn--primary" :disabled="metronome.state.running" @click="metronome.start">
                Старт метронома
              </button>
              <button type="button" class="btn" :disabled="!metronome.state.running" @click="metronome.stop">
                Стоп метронома
              </button>
            </div>
          </div>
        </section>

        <!-- Theory -->
        <section class="card card--wide" aria-labelledby="theory-title">
          <h2 id="theory-title" class="card__title"><span class="card__index">5</span> Краткая теория</h2>
          <div class="theory-nav" role="tablist" aria-label="Темы теории">
            <button
              v-for="lesson in THEORY_LESSONS"
              :key="lesson.id"
              type="button"
              class="theory-nav__btn"
              :class="{ 'is-active': activeLessonId === lesson.id }"
              role="tab"
              :aria-selected="activeLessonId === lesson.id"
              :id="'theory-tab-' + lesson.id"
              @click="activeLessonId = lesson.id"
            >
              {{ lesson.title }}
            </button>
          </div>
          <div
            class="theory-content"
            role="tabpanel"
            aria-live="polite"
            :aria-labelledby="'theory-tab-' + activeLessonId"
            v-html="activeLesson.html"
          ></div>
        </section>
      </div>

      <footer class="notebook-footer">
        <p>Прогресс сохраняется локально в вашем браузере. Ничего не отправляется на сервер.</p>
        <p class="notebook-footer__roadmap">
          Полная программа обучения (48 тем) —
          <a href="./docs/ru/ROADMAP.md">дорожная карта</a>
          /
          <a href="./docs/en/ROADMAP.md">roadmap (EN)</a>
        </p>
      </footer>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, reactive, ref } from "vue";

import PianoKeyboard from "./components/PianoKeyboard.vue";
import ThemeSwitcher from "./components/ThemeSwitcher.vue";

import { useSynth } from "./composables/useSynth";
import { useMidi } from "./composables/useMidi";
import { useExercise } from "./composables/useExercise";
import { useDemo } from "./composables/useDemo";
import { useMetronome } from "./composables/useMetronome";
import { useTheme } from "./composables/useTheme";

import { noteName } from "./constants/piano";
import { THEORY_LESSONS } from "./constants/theory";

const { theme, setTheme } = useTheme();

const synth = useSynth();
const soundEnabled = ref(false);

// midi -> true, пока клавиша визуально нажата (клик мышью/пальцем или MIDI note on)
const activeNotes = reactive({});
function setActive(midi, active) {
  if (active) activeNotes[midi] = true;
  else delete activeNotes[midi];
}

const demo = useDemo({
  playTransient: synth.playTransient,
  ensureAudio: synth.ensureContext,
  setActive,
});

const exercise = useExercise({ noteName, onStart: () => demo.stop() });

const metronome = useMetronome({ playClick: synth.playClick, ensureAudio: synth.ensureContext });

const midi = useMidi({
  onNoteOn(note) {
    setActive(note, true);
    if (soundEnabled.value) synth.startHeld(note);
    exercise.handleNotePlayed(note);
  },
  onNoteOff(note) {
    setActive(note, false);
    if (soundEnabled.value) synth.stopHeld(note);
  },
});

function connectMidi() {
  if (soundEnabled.value) synth.ensureContext();
  midi.connect();
}

function onSoundChange() {
  if (soundEnabled.value) synth.ensureContext();
  else synth.stopAllHeld();
}

function onUiNoteOn(midiNote) {
  setActive(midiNote, true);
  synth.startHeld(midiNote); // клики по экрану всегда озвучиваются
  exercise.handleNotePlayed(midiNote);
}

function onUiNoteOff(midiNote) {
  setActive(midiNote, false);
  synth.stopHeld(midiNote);
}

// Диагностика звука: контрольная нота ля₄ и понятный статус аудиоконтекста.
function testSound() {
  synth.ensureContext();
  synth.playTransient(69, 700);
}

const audioStatusKind = computed(() => {
  const s = synth.state.status;
  if (s === "running") return "ok";
  if (s === "unsupported" || s === "error") return "bad";
  return "wait";
});

const audioStatusText = computed(() => {
  switch (synth.state.status) {
    case "running":
      return "работает";
    case "suspended":
      return "заблокирован браузером — нажмите «Проверить звук»";
    case "closed":
      return "контекст закрыт";
    case "unsupported":
      return "браузер не поддерживает Web Audio";
    case "error":
      return "ошибка при создании аудиоконтекста";
    default:
      return "ещё не запускался";
  }
});

const progressPct = computed(() => Math.round((exercise.state.index / exercise.state.total) * 100));
const feedbackClass = computed(() => (exercise.state.feedbackKind ? "status--" + exercise.state.feedbackKind : ""));

const activeLessonId = ref(THEORY_LESSONS[0].id);
const activeLesson = computed(() => THEORY_LESSONS.find((l) => l.id === activeLessonId.value) || THEORY_LESSONS[0]);

function handleAppBlur() {
  demo.stop();
  metronome.stop();
}

function handleAppFocus() {
  synth.ensureContext();
}

function handleVisibility() {
  if (document.hidden) handleAppBlur();
}

// Первый настоящий жест пользователя на странице разблокирует аудиоконтекст,
// чтобы самая первая нажатая клавиша уже звучала.
function unlockAudio() {
  synth.ensureContext();
  if (synth.state.status === "running") {
    document.removeEventListener("pointerdown", unlockAudio, true);
    document.removeEventListener("keydown", unlockAudio, true);
  }
}

onMounted(() => {
  midi.featureCheck();
  exercise.renderStoredResult();

  document.addEventListener("pointerdown", unlockAudio, true);
  document.addEventListener("keydown", unlockAudio, true);

  window.addEventListener("blur", handleAppBlur);
  window.addEventListener("focus", handleAppFocus);
  document.addEventListener("visibilitychange", handleVisibility);
});

onUnmounted(() => {
  document.removeEventListener("pointerdown", unlockAudio, true);
  document.removeEventListener("keydown", unlockAudio, true);

  window.removeEventListener("blur", handleAppBlur);
  window.removeEventListener("focus", handleAppFocus);
  document.removeEventListener("visibilitychange", handleVisibility);

  demo.stop();
  metronome.stop();
  synth.dispose();
});
</script>
