<template>
  <article class="page" v-if="lesson">
    <nav class="crumbs">
      <a href="#/">{{ t("lesson.crumbHome") }}</a>
      <span aria-hidden="true">/</span>
      <span>{{ t("lesson.crumbLesson", { number }) }}</span>
    </nav>

    <header class="page__head">
      <p class="page__kicker">
        <template v-if="moduleTitle">
          {{ t("lesson.kicker", { module: moduleTitle, number, topics: lesson.topics.join(", ") }) }}
        </template>
        <template v-else>{{ t("lesson.kickerNoModule", { number, topics: lesson.topics.join(", ") }) }}</template>
      </p>
      <h1 class="page__title">{{ lesson.title }}</h1>
      <p class="page__summary">{{ lesson.summary }}</p>
      <p class="lesson-badge" v-if="progress.isDone(lesson.id)">{{ t("lesson.done") }}</p>
    </header>

    <section class="card card--wide">
      <h2 class="card__title">{{ t("lesson.theoryTitle") }}</h2>
      <template v-for="(block, i) in lesson.blocks" :key="i">
        <p v-if="block.type === 'text'" class="theory__text">{{ block.text }}</p>
        <ul v-else-if="block.type === 'list'" class="theory__list">
          <li v-for="(item, j) in block.items" :key="j">{{ item }}</li>
        </ul>
        <ol v-else-if="block.type === 'ordered'" class="theory__list">
          <li v-for="(item, j) in block.items" :key="j">{{ item }}</li>
        </ol>
        <p v-else-if="block.type === 'note'" class="theory__note">{{ block.text }}</p>
        <figure v-else-if="block.type === 'staff'" class="theory__figure">
          <div class="staff-scroll">
            <MusicStaff
              :clef="block.clef"
              :items="block.items"
              :meter="block.meter"
              :show-names="block.showNames"
            />
          </div>
          <figcaption v-if="block.caption">{{ block.caption }}</figcaption>
        </figure>
        <div v-else-if="block.type === 'listen'" class="theory__listen">
          <p class="theory__text">{{ block.text }}</p>
          <div class="row row--wrap">
            <button
              type="button"
              class="btn"
              v-for="(variant, k) in block.variants"
              :key="k"
              @click="playVariant(variant)"
            >
              {{ variant.label }}
            </button>
          </div>
        </div>
      </template>
    </section>

    <section class="card card--wide">
      <h2 class="card__title">{{ t("lesson.practiceTitle") }}</h2>
      <p class="card__hint">{{ t("lesson.practiceHint") }}</p>
      <PracticeBlock
        v-for="practice in lesson.practices"
        :key="practice.id"
        :practice="practice"
        :owner-id="lesson.id + ':' + practice.id"
        @completed="onPracticeCompleted"
      />
    </section>

    <nav class="pager">
      <a class="btn" v-if="prev" :href="lessonHref(prev.id)">&larr; {{ prev.title }}</a>
      <span v-else></span>
      <a class="btn btn--primary" v-if="next" :href="lessonHref(next.id)">{{ next.title }} &rarr;</a>
      <a class="btn" v-else href="#/">{{ t("lesson.toContents") }}</a>
    </nav>
  </article>

  <article class="page" v-else>
    <h1 class="page__title">{{ t("lesson.notFoundTitle") }}</h1>
    <p class="page__summary">
      {{ t("lesson.notFoundText") }} <a href="#/">{{ t("lesson.notFoundLink") }}</a>.
    </p>
  </article>
</template>

<script setup>
import { computed, reactive, watch } from "vue";

import MusicStaff from "../components/MusicStaff.vue";
import PracticeBlock from "../components/PracticeBlock.vue";
import { synth } from "../stores/audio";
import { LESSONS, findLesson, lessonIndex } from "../constants/lessons";
import { localizeLesson, localizeLessonMeta } from "../constants/lessons/localize";
import { useProgress } from "../composables/useProgress";
import { lessonHref } from "../router";
import { t, locale } from "../i18n";

const props = defineProps({ id: { type: String, required: true } });

const progress = useProgress();

// Звуковые примеры в теории: ноты идут одна за другой с заданным шагом.
function playVariant(variant) {
  const step = variant.step || 600;
  const hold = variant.hold || 700;
  variant.notes.forEach((item, i) => {
    const group = Array.isArray(item) ? item : [item];
    const gain = variant.gains?.[i] ?? variant.gain ?? 1;
    window.setTimeout(() => group.forEach((midi) => synth.playTransient(midi, hold, gain)), i * step);
  });
}
const lesson = computed(() => {
  locale.value;
  return localizeLesson(findLesson(props.id));
});
const number = computed(() => lessonIndex(props.id) + 1);
const moduleTitle = computed(() => (lesson.value?.module ? t(`modules.${lesson.value.module}.title`) : ""));
const prev = computed(() => {
  locale.value;
  const raw = LESSONS[lessonIndex(props.id) - 1] || null;
  return raw ? localizeLessonMeta(raw) : null;
});
const next = computed(() => {
  locale.value;
  const raw = LESSONS[lessonIndex(props.id) + 1] || null;
  return raw ? localizeLessonMeta(raw) : null;
});

// Урок считается пройденным, когда выполнены все его практики.
const finished = reactive(new Set());

watch(lesson, () => finished.clear());

function onPracticeCompleted(practiceId) {
  finished.add(practiceId);
  if (lesson.value && lesson.value.practices.every((p) => finished.has(p.id))) {
    progress.markDone(lesson.value.id);
  }
}
</script>
