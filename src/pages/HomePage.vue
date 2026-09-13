<template>
  <div class="page">
    <section class="hero">
      <p class="hero__kicker">учебная тетрадь · фортепиано</p>
      <h1 class="hero__title">Первые десять тем</h1>
      <p class="hero__subtitle">
        Каждая тема — отдельная страница с теорией и практикой на клавиатуре. Проходите по порядку: следующий урок
        опирается на предыдущий.
      </p>
    </section>

    <section class="card card--wide">
      <h2 class="card__title">Ваш прогресс</h2>
      <div class="progress" role="progressbar" aria-valuemin="0" :aria-valuemax="LESSONS.length" :aria-valuenow="doneCount">
        <div class="progress__bar" :style="{ width: percent + '%' }"></div>
      </div>
      <p class="card__hint">
        Пройдено уроков: <strong>{{ doneCount }}</strong> из {{ LESSONS.length }}. Прогресс хранится только в этом
        браузере.
      </p>
      <div class="row row--wrap">
        <a class="btn btn--primary" :href="lessonHref(nextLesson.id)">
          {{ doneCount ? "Продолжить" : "Начать обучение" }}: {{ nextLesson.title }}
        </a>
        <button type="button" class="btn" v-if="doneCount" @click="progress.clearAll">Сбросить прогресс</button>
      </div>
    </section>

    <ol class="lesson-list">
      <li v-for="(lesson, index) in LESSONS" :key="lesson.id">
        <a class="lesson-card" :class="{ 'is-done': progress.isDone(lesson.id) }" :href="lessonHref(lesson.id)">
          <span class="lesson-card__index">{{ index + 1 }}</span>
          <span class="lesson-card__body">
            <span class="lesson-card__title">{{ lesson.title }}</span>
            <span class="lesson-card__summary">{{ lesson.summary }}</span>
            <span class="lesson-card__meta">
              Темы программы: {{ lesson.topics.join(", ") }} · практик: {{ lesson.practices.length }}
            </span>
          </span>
          <span class="lesson-card__state" aria-hidden="true">{{ progress.isDone(lesson.id) ? "✓" : "→" }}</span>
        </a>
      </li>
    </ol>

    <section class="card card--wide">
      <h2 class="card__title">Дополнительно</h2>
      <p class="card__hint">
        Отдельный тренажёр гаммы до мажор с демонстрацией и краткой теорией — он появился раньше уроков и остаётся
        доступным.
      </p>
      <div class="row row--wrap">
        <a class="btn" href="#/scale">Тренажёр гаммы до мажор</a>
      </div>
    </section>

    <footer class="notebook-footer">
      <p>Прогресс сохраняется локально в вашем браузере. Ничего не отправляется на сервер.</p>
      <p class="notebook-footer__roadmap">
        Полная программа обучения (48 тем) —
        <a href="./docs/ru/ROADMAP.md">дорожная карта</a>
        /
        <a href="./docs/en/ROADMAP.md">roadmap (EN)</a>
      </p>
    </footer>
  </div>
</template>

<script setup>
import { computed } from "vue";

import { LESSONS } from "../constants/lessons";
import { useProgress } from "../composables/useProgress";
import { lessonHref } from "../router";

const progress = useProgress();

const doneCount = computed(() => LESSONS.filter((lesson) => progress.isDone(lesson.id)).length);
const percent = computed(() => Math.round((doneCount.value / LESSONS.length) * 100));
const nextLesson = computed(() => LESSONS.find((lesson) => !progress.isDone(lesson.id)) || LESSONS[0]);
</script>
