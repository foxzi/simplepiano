<template>
  <article class="page" v-if="lesson">
    <nav class="crumbs">
      <a href="#/">Оглавление</a>
      <span aria-hidden="true">/</span>
      <span>Урок {{ number }}</span>
    </nav>

    <header class="page__head">
      <p class="page__kicker">Урок {{ number }} · темы {{ lesson.topics.join(", ") }}</p>
      <h1 class="page__title">{{ lesson.title }}</h1>
      <p class="page__summary">{{ lesson.summary }}</p>
      <p class="lesson-badge" v-if="progress.isDone(lesson.id)">Урок пройден</p>
    </header>

    <section class="card card--wide">
      <h2 class="card__title">Теория</h2>
      <template v-for="(block, i) in lesson.blocks" :key="i">
        <p v-if="block.type === 'text'" class="theory__text">{{ block.text }}</p>
        <ul v-else-if="block.type === 'list'" class="theory__list">
          <li v-for="(item, j) in block.items" :key="j">{{ item }}</li>
        </ul>
        <ol v-else-if="block.type === 'ordered'" class="theory__list">
          <li v-for="(item, j) in block.items" :key="j">{{ item }}</li>
        </ol>
        <p v-else-if="block.type === 'note'" class="theory__note">{{ block.text }}</p>
      </template>
    </section>

    <section class="card card--wide">
      <h2 class="card__title">Практика</h2>
      <p class="card__hint">
        Играйте на MIDI-клавиатуре или мышью по клавишам внизу страницы. Нужные клавиши подсвечиваются.
      </p>
      <PracticeBlock
        v-for="practice in lesson.practices"
        :key="practice.id"
        :practice="practice"
        :owner-id="lesson.id + ':' + practice.id"
        @completed="onPracticeCompleted"
      />
    </section>

    <nav class="pager">
      <a class="btn" v-if="prev" :href="lessonHref(prev.id)">← {{ prev.title }}</a>
      <span v-else></span>
      <a class="btn btn--primary" v-if="next" :href="lessonHref(next.id)">{{ next.title }} →</a>
      <a class="btn" v-else href="#/">К оглавлению</a>
    </nav>
  </article>

  <article class="page" v-else>
    <h1 class="page__title">Урок не найден</h1>
    <p class="page__summary">Возможно, ссылка устарела. <a href="#/">Вернитесь к оглавлению</a>.</p>
  </article>
</template>

<script setup>
import { computed, reactive, watch } from "vue";

import PracticeBlock from "../components/PracticeBlock.vue";
import { LESSONS, findLesson, lessonIndex } from "../constants/lessons";
import { useProgress } from "../composables/useProgress";
import { lessonHref } from "../router";

const props = defineProps({ id: { type: String, required: true } });

const progress = useProgress();
const lesson = computed(() => findLesson(props.id));
const number = computed(() => lessonIndex(props.id) + 1);
const prev = computed(() => LESSONS[lessonIndex(props.id) - 1] || null);
const next = computed(() => LESSONS[lessonIndex(props.id) + 1] || null);

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
