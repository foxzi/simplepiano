<template>
  <div class="page">
    <nav class="crumbs">
      <a href="#/">Оглавление</a>
      <span aria-hidden="true">/</span>
      <span>Тренажёр гаммы</span>
    </nav>

    <header class="page__head">
      <p class="page__kicker">дополнительно · темы 19–20</p>
      <h1 class="page__title">Гамма до мажор, одна октава</h1>
      <p class="page__summary">
        До – Ре – Ми – Фа – Соль – Ля – Си – До. Сыграйте ноты по порядку выбранной рукой, на MIDI-клавиатуре или
        мышью по клавишам внизу страницы.
      </p>
    </header>

    <section class="card card--wide">
      <h2 class="card__title">Упражнение</h2>

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

      <hr class="divider" />

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
        Демонстрация проигрывает гамму целиком и подсвечивает клавиши.
      </p>
    </section>

    <section class="card card--wide">
      <h2 class="card__title">Краткая теория</h2>
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
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

import { useExercise } from "../composables/useExercise";
import { useDemo } from "../composables/useDemo";
import { noteName } from "../constants/piano";
import { THEORY_LESSONS } from "../constants/theory";
import { synth } from "../stores/audio";
import { onNote, setActive, setHighlight, clearHighlight } from "../stores/keyboard";

const OWNER = "scale";

const demo = useDemo({
  playTransient: synth.playTransient,
  ensureAudio: synth.ensureContext,
  setActive,
});

const exercise = useExercise({ noteName, onStart: () => demo.stop() });

const progressPct = computed(() => Math.round((exercise.state.index / exercise.state.total) * 100));
const feedbackClass = computed(() => (exercise.state.feedbackKind ? "status--" + exercise.state.feedbackKind : ""));

const activeLessonId = ref(THEORY_LESSONS[0].id);
const activeLesson = computed(() => THEORY_LESSONS.find((l) => l.id === activeLessonId.value) || THEORY_LESSONS[0]);

// Подсветка следующей ноты гаммы на общей клавиатуре.
watch(
  () => exercise.state.expectedMidi,
  (midi) => {
    if (midi == null) clearHighlight(OWNER);
    else setHighlight(OWNER, { expected: [midi] });
  }
);

const unsubscribe = onNote(exercise.handleNotePlayed);

onMounted(() => exercise.renderStoredResult());

onUnmounted(() => {
  unsubscribe();
  demo.stop();
  clearHighlight(OWNER);
});
</script>
