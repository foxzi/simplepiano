<template>
  <div class="app-shell">
    <header class="topbar">
      <a class="topbar__brand" href="#/">
        <span class="topbar__mark" aria-hidden="true">&#9834;</span>
        <span class="topbar__title">{{ t("app.brand") }}</span>
      </a>
      <nav class="topbar__nav" :aria-label="t('nav.label')">
        <a href="#/" :class="{ 'is-active': route.name === 'home' }">{{ t("nav.home") }}</a>
        <a href="#/scale" :class="{ 'is-active': route.name === 'scale' }">{{ t("nav.scale") }}</a>
        <a href="#/about" :class="{ 'is-active': route.name === 'about' }">{{ t("nav.about") }}</a>
      </nav>
      <div class="topbar__switchers">
        <ThemeSwitcher :theme="theme" @update:theme="setTheme" />
        <LocaleSwitcher />
      </div>
    </header>

    <!-- Ключ с локалью: тексты заданий хранятся в состоянии, поэтому при смене языка страницу пересоздаём -->
    <main class="layout">
      <HomePage v-if="route.name === 'home'" :key="locale" />
      <LessonPage v-else-if="route.name === 'lesson'" :id="route.id" :key="locale + ':' + route.id" />
      <AboutPage v-else-if="route.name === 'about'" :key="locale" />
      <ScalePage v-else :key="locale" />
    </main>

    <!-- Инструменты и клавиатура общие для всех страниц -->
    <section class="workbench" :class="{ 'is-collapsed': collapsed }" :aria-label="t('workbench.region')">
      <div class="workbench__bar">
        <button
          type="button"
          class="workbench__toggle"
          :aria-expanded="!collapsed"
          aria-controls="workbench-body"
          @click="toggle"
        >
          <span class="workbench__chevron" aria-hidden="true">{{ collapsed ? "▲" : "▼" }}</span>
          {{ collapsed ? t("workbench.show") : t("workbench.hide") }}
        </button>
        <span class="workbench__bar-info" v-if="collapsed">
          {{ barInfo }}
        </span>
      </div>

      <div class="workbench__inner" id="workbench-body" v-show="!collapsed">
        <div class="row row--wrap workbench__controls">
          <label class="field">
            <span class="field__label">{{ t("workbench.tempo") }}</span>
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
            {{ metronome.state.running ? t("workbench.metronomeStop") : t("workbench.metronome") }}
          </button>

          <span class="audio-badge" :class="'audio-badge--' + audioStatusKind" role="status" aria-live="polite">
            {{ t("workbench.audioLabel", { status: audioStatusText }) }}
          </span>
          <button type="button" class="btn" @click="testSound">{{ t("workbench.audioTest") }}</button>
        </div>

        <details class="workbench__settings">
          <summary>{{ t("workbench.settings") }}</summary>

          <div class="row row--wrap">
            <button
              type="button"
              class="btn btn--primary"
              :disabled="!midi.state.supported || midi.state.busy"
              @click="connectMidi"
            >
              {{ midi.state.connected || midi.state.inputs.length ? t("workbench.refreshMidi") : t("workbench.connectMidi") }}
            </button>
            <label class="field" v-if="midi.state.inputs.length">
              <span class="field__label">{{ t("workbench.device") }}</span>
              <select
                :aria-label="t('workbench.deviceAria')"
                :value="midi.state.selectedInputId"
                @change="midi.selectInput($event.target.value)"
              >
                <option v-for="input in midi.state.inputs" :key="input.id" :value="input.id">{{ input.label }}</option>
              </select>
            </label>
            <label class="field">
              <span class="field__label">{{ t("workbench.instrument") }}</span>
              <select
                :aria-label="t('workbench.instrumentAria')"
                :value="synth.state.instrumentId"
                @change="onInstrumentChange($event.target.value)"
              >
                <option v-for="item in synth.instruments" :key="item.id" :value="item.id">
                  {{ t("instruments." + item.id + ".label") }}
                </option>
              </select>
            </label>
            <label class="field">
              <span class="field__label">{{ t("workbench.volume") }}</span>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                :aria-label="t('workbench.volumeAria')"
                :value="synth.state.volume"
                @input="onVolumeInput"
              />
            </label>
            <output>{{ synth.state.volume }}%</output>
          </div>

          <p class="status" role="status" aria-live="polite">{{ midi.state.status }}</p>
          <p class="card__hint">{{ instrumentHint }}</p>
          <p class="card__hint" v-if="synth.state.error">{{ t("workbench.browserMessage", { error: synth.state.error }) }}</p>

          <label class="switch">
            <input type="checkbox" v-model="soundEnabled" @change="onSoundChange" />
            <span class="switch__track" aria-hidden="true"></span>
            <span class="switch__label">
              {{ t("workbench.midiSound") }}
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
import LocaleSwitcher from "./components/LocaleSwitcher.vue";
import HomePage from "./pages/HomePage.vue";
import LessonPage from "./pages/LessonPage.vue";
import ScalePage from "./pages/ScalePage.vue";
import AboutPage from "./pages/AboutPage.vue";

import { useMidi } from "./composables/useMidi";
import { useTheme } from "./composables/useTheme";
import { useWorkbench } from "./composables/useWorkbench";
import { synth, metronome } from "./stores/audio";
import { activeNotes, expectedNotes, doneNotes, keyLabels, setActive, emitNote } from "./stores/keyboard";
import { route } from "./router";
import { t, locale } from "./i18n";

const { theme, setTheme } = useTheme();
const { collapsed, toggle } = useWorkbench();
const soundEnabled = ref(false);

const midi = useMidi({
  onNoteOn(note) {
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

// Слайдер громкости не должен сам создавать AudioContext — только запоминает
// значение, а звук уже играющих голосов подхватит useSynth сам.
function onVolumeInput(event) {
  synth.setVolume(event.target.value);
}

const instrumentHint = computed(() => {
  const current = synth.instruments.find((item) => item.id === synth.state.instrumentId);
  return current ? t("instruments." + current.id + ".hint") : "";
});

const audioStatusKind = computed(() => {
  const s = synth.state.status;
  if (s === "running") return "ok";
  if (s === "unsupported" || s === "error") return "bad";
  return "wait";
});

const audioStatusText = computed(() => t("workbench.audioStatus." + synth.state.status));

const barInfo = computed(() => {
  const key = metronome.state.running ? "workbench.barInfoRunning" : "workbench.barInfo";
  return t(key, { bpm: metronome.state.bpm, unit: t("workbench.bpmUnit") });
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
