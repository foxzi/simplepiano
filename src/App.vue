<template>
  <div class="app-shell">
    <header class="topbar">
      <a class="topbar__brand" href="#/">
        <span class="topbar__mark" aria-hidden="true">&#9834;</span>
        <span class="topbar__title">Piano Studio</span>
      </a>
      <nav class="topbar__nav" aria-label="Основная навигация">
        <a href="#/" :class="{ 'is-active': route.name === 'home' }">Оглавление</a>
        <a href="#/scale" :class="{ 'is-active': route.name === 'scale' }">Гамма</a>
      </nav>
      <ThemeSwitcher :theme="theme" @update:theme="setTheme" />
    </header>

    <main class="layout">
      <HomePage v-if="route.name === 'home'" />
      <LessonPage v-else-if="route.name === 'lesson'" :id="route.id" :key="route.id" />
      <ScalePage v-else />
    </main>

    <!-- Инструменты и клавиатура общие для всех страниц -->
    <section class="workbench" :class="{ 'is-collapsed': collapsed }" aria-label="Клавиатура и настройки звука">
      <div class="workbench__bar">
        <button
          type="button"
          class="workbench__toggle"
          :aria-expanded="!collapsed"
          aria-controls="workbench-body"
          @click="toggle"
        >
          <span class="workbench__chevron" aria-hidden="true">{{ collapsed ? "▲" : "▼" }}</span>
          {{ collapsed ? "Показать клавиатуру и настройки" : "Свернуть клавиатуру и настройки" }}
        </button>
        <span class="workbench__bar-info" v-if="collapsed">
          {{ metronome.state.bpm }} уд/мин<template v-if="metronome.state.running"> · метроном идёт</template>
        </span>
      </div>

      <div class="workbench__inner" id="workbench-body" v-show="!collapsed">
        <div class="row row--wrap workbench__controls">
          <label class="field">
            <span class="field__label">Темп, уд/мин</span>
            <input
              type="range"
              min="40"
              max="200"
              step="1"
              v-model.number="metronome.state.bpm"
              @input="metronome.restartIfRunning"
            />
          </label>
          <output class="workbench__bpm">{{ metronome.state.bpm }}</output>
          <button
            type="button"
            class="btn"
            :class="metronome.state.running ? '' : 'btn--primary'"
            @click="metronome.state.running ? metronome.stop() : metronome.start()"
          >
            {{ metronome.state.running ? "Стоп метронома" : "Метроном" }}
          </button>

          <span class="audio-badge" :class="'audio-badge--' + audioStatusKind" role="status" aria-live="polite">
            Звук: {{ audioStatusText }}
          </span>
          <button type="button" class="btn" @click="testSound">Проверить звук</button>
        </div>

        <details class="workbench__settings">
          <summary>Настройки: MIDI, тембр, звук</summary>

          <div class="row row--wrap">
            <button
              type="button"
              class="btn btn--primary"
              :disabled="!midi.state.supported || midi.state.busy"
              @click="connectMidi"
            >
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
            <label class="field">
              <span class="field__label">Инструмент</span>
              <select
                aria-label="Выбор тембра инструмента"
                :value="synth.state.instrumentId"
                @change="onInstrumentChange($event.target.value)"
              >
                <option v-for="item in synth.instruments" :key="item.id" :value="item.id">{{ item.label }}</option>
              </select>
            </label>
          </div>

          <p class="status" role="status" aria-live="polite">{{ midi.state.status }}</p>
          <p class="card__hint">{{ instrumentHint }}</p>
          <p class="card__hint" v-if="synth.state.error">Сообщение браузера: {{ synth.state.error }}</p>

          <label class="switch">
            <input type="checkbox" v-model="soundEnabled" @change="onSoundChange" />
            <span class="switch__track" aria-hidden="true"></span>
            <span class="switch__label">
              Звук синтезатора для MIDI (выключен по умолчанию, чтобы не дублировать звук вашей клавиатуры)
            </span>
          </label>
        </details>

        <div class="piano-scroll">
          <PianoKeyboard
            :active-notes="activeNotes"
            :expected-notes="expectedNotes"
            :done-notes="doneNotes"
            :labels="keyLabels"
            @note-on="onUiNoteOn"
            @note-off="onUiNoteOff"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";

import PianoKeyboard from "./components/PianoKeyboard.vue";
import ThemeSwitcher from "./components/ThemeSwitcher.vue";
import HomePage from "./pages/HomePage.vue";
import LessonPage from "./pages/LessonPage.vue";
import ScalePage from "./pages/ScalePage.vue";

import { useMidi } from "./composables/useMidi";
import { useTheme } from "./composables/useTheme";
import { useWorkbench } from "./composables/useWorkbench";
import { synth, metronome } from "./stores/audio";
import { activeNotes, expectedNotes, doneNotes, keyLabels, setActive, emitNote } from "./stores/keyboard";
import { route } from "./router";

const { theme, setTheme } = useTheme();
const { collapsed, toggle, expand } = useWorkbench();
const soundEnabled = ref(false);

const midi = useMidi({
  onNoteOn(note) {
    expand(); // игра на MIDI-клавиатуре возвращает панель на экран
    setActive(note, true);
    if (soundEnabled.value) synth.startHeld(note);
    emitNote(note);
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
  emitNote(midiNote);
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

// Смена тембра: пробуем сразу дать услышать новый инструмент.
function onInstrumentChange(id) {
  synth.setInstrument(id);
  synth.playTransient(60, 900);
}

const instrumentHint = computed(() => {
  const current = synth.instruments.find((item) => item.id === synth.state.instrumentId);
  return current ? current.hint : "";
});

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

function handleAppBlur() {
  metronome.stop();
  synth.stopAllHeld();
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

  document.addEventListener("pointerdown", unlockAudio, true);
  document.addEventListener("keydown", unlockAudio, true);

  window.addEventListener("blur", handleAppBlur);
  window.addEventListener("focus", () => synth.ensureContext());
  document.addEventListener("visibilitychange", handleVisibility);
});

onUnmounted(() => {
  document.removeEventListener("pointerdown", unlockAudio, true);
  document.removeEventListener("keydown", unlockAudio, true);

  window.removeEventListener("blur", handleAppBlur);
  document.removeEventListener("visibilitychange", handleVisibility);

  metronome.stop();
  synth.dispose();
});
</script>
