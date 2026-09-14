<template>
  <div class="page">
    <nav class="crumbs">
      <a href="#/">{{ t("lesson.crumbHome") }}</a>
      <span aria-hidden="true">/</span>
      <span>{{ t("scale.crumbTitle") }}</span>
    </nav>

    <header class="page__head">
      <p class="page__kicker">{{ t("scale.kicker") }}</p>
      <h1 class="page__title">{{ t("scale.title") }}</h1>
      <p class="page__summary">{{ t("scale.summary") }}</p>
    </header>

    <section class="card card--wide">
      <h2 class="card__title">{{ t("scale.exerciseTitle") }}</h2>

      <div class="row row--wrap">
        <fieldset class="hand-choice">
          <legend>{{ t("scale.handLegend") }}</legend>
          <label>
            <input type="radio" name="hand" value="right" :checked="exercise.state.hand === 'right'" @change="exercise.setHand('right')" />
            {{ t("scale.handRight") }}
          </label>
          <label>
            <input type="radio" name="hand" value="left" :checked="exercise.state.hand === 'left'" @change="exercise.setHand('left')" />
            {{ t("scale.handLeft") }}
          </label>
        </fieldset>

        <div class="row__buttons">
          <button type="button" class="btn btn--primary" @click="exercise.start">{{ t("scale.start") }}</button>
          <button type="button" class="btn" @click="exercise.reset">{{ t("scale.reset") }}</button>
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
          <span v-html="t('practice.step', { index: exercise.state.index, total: exercise.state.total })"></span>
          <span v-html="t('practice.errors', { errors: exercise.state.errors })"></span>
        </p>
      </div>

      <p class="status" :class="feedbackClass" role="status" aria-live="polite">{{ exercise.state.feedback }}</p>
      <p class="status status--result" role="status" aria-live="polite">{{ exercise.state.result }}</p>

      <hr class="divider" />

      <div class="row row--wrap">
        <div class="row__buttons">
          <button type="button" class="btn btn--primary" :disabled="demo.state.playing" @click="demo.play">
            {{ t("scale.playDemo") }}
          </button>
          <button type="button" class="btn" :disabled="!demo.state.playing" @click="demo.stop">
            {{ t("scale.stopDemo") }}
          </button>
        </div>
      </div>
      <p class="card__hint card__hint--tight">
        {{ t("scale.demoHint") }}
      </p>
    </section>

    <section class="card card--wide">
      <h2 class="card__title">{{ t("scale.theoryTitle") }}</h2>
      <div class="theory-nav" role="tablist" :aria-label="t('scale.theoryNavAria')">
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
          {{ t("theory." + lesson.id + ".title") }}
        </button>
      </div>
      <div
        class="theory-content"
        role="tabpanel"
        aria-live="polite"
        :aria-labelledby="'theory-tab-' + activeLessonId"
        v-html="t('theory.' + activeLessonId + '.html')"
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
import { t } from "../i18n";

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
