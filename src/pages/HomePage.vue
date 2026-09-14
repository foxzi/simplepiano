<template>
  <div class="page">
    <section class="hero">
      <p class="hero__kicker">{{ t("home.kicker") }}</p>
      <h1 class="hero__title">{{ t("home.title") }}</h1>
      <p class="hero__subtitle">{{ t("home.subtitle", { count: LESSONS.length }) }}</p>
    </section>

    <section class="card card--wide">
      <h2 class="card__title">{{ t("home.progressTitle") }}</h2>
      <div class="progress" role="progressbar" aria-valuemin="0" :aria-valuemax="LESSONS.length" :aria-valuenow="doneCount">
        <div class="progress__bar" :style="{ width: percent + '%' }"></div>
      </div>
      <p class="card__hint" v-html="t('home.progressHint', { done: doneCount, total: LESSONS.length })"></p>
      <div class="row row--wrap">
        <a class="btn btn--primary" :href="lessonHref(nextLesson.id)">
          {{ doneCount ? t("home.continueBtn", { title: nextLesson.title }) : t("home.startBtn", { title: nextLesson.title }) }}
        </a>
        <button type="button" class="btn" v-if="doneCount" @click="progress.clearAll">{{ t("home.resetProgress") }}</button>
      </div>
    </section>

    <section class="module" v-for="module in modules" :key="module.id">
      <header class="module__head">
        <h2 class="module__title">{{ module.title }}</h2>
        <p class="module__summary">{{ module.summary }}</p>
        <p class="module__meta">{{ t("home.moduleProgress", { done: module.doneCount, total: module.items.length }) }}</p>
      </header>
      <ol class="lesson-list">
        <li v-for="item in module.items" :key="item.lesson.id">
          <a
            class="lesson-card"
            :class="{ 'is-done': progress.isDone(item.lesson.id) }"
            :href="lessonHref(item.lesson.id)"
          >
            <span class="lesson-card__index">{{ item.number }}</span>
            <span class="lesson-card__body">
              <span class="lesson-card__title">{{ item.lesson.title }}</span>
              <span class="lesson-card__summary">{{ item.lesson.summary }}</span>
              <span class="lesson-card__meta">
                {{ t("home.lessonMeta", { topics: item.lesson.topics.join(", "), count: item.lesson.practices.length }) }}
              </span>
            </span>
            <span class="lesson-card__state" aria-hidden="true">{{ progress.isDone(item.lesson.id) ? "\u2713" : "\u2192" }}</span>
          </a>
        </li>
      </ol>
    </section>

    <section class="card card--wide">
      <h2 class="card__title">{{ t("home.extraTitle") }}</h2>
      <p class="card__hint">{{ t("home.extraHint") }}</p>
      <div class="row row--wrap">
        <a class="btn" href="#/scale">{{ t("home.scaleTrainer") }}</a>
      </div>
    </section>

    <footer class="notebook-footer">
      <p>{{ t("home.footerPrivacy") }}</p>
      <p class="notebook-footer__roadmap">
        {{ t("home.footerRoadmap") }}
        <a href="./docs/ru/ROADMAP.md">{{ t("home.roadmapRu") }}</a>
        /
        <a href="./docs/en/ROADMAP.md">{{ t("home.roadmapEn") }}</a>
      </p>
    </footer>
  </div>
</template>

<script setup>
import { computed } from "vue";

import { LESSONS, MODULES, lessonsByModule } from "../constants/lessons";
import { localizeLessonMeta } from "../constants/lessons/localize";
import { useProgress } from "../composables/useProgress";
import { lessonHref } from "../router";
import { t, locale } from "../i18n";

const progress = useProgress();

const doneCount = computed(() => LESSONS.filter((lesson) => progress.isDone(lesson.id)).length);
const percent = computed(() => Math.round((doneCount.value / LESSONS.length) * 100));
const nextLesson = computed(() => {
  locale.value;
  const raw = LESSONS.find((lesson) => !progress.isDone(lesson.id)) || LESSONS[0];
  return localizeLessonMeta(raw);
});

const modules = computed(() => {
  locale.value;
  return MODULES.map((module) => {
    const items = lessonsByModule(module.id).map((item) => ({ ...item, lesson: localizeLessonMeta(item.lesson) }));
    return {
      ...module,
      title: t(`modules.${module.id}.title`),
      summary: t(`modules.${module.id}.summary`),
      items,
      doneCount: items.filter((item) => progress.isDone(item.lesson.id)).length,
    };
  });
});
</script>
