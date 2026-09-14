<template>
  <article class="page" v-if="lesson">
    <nav class="crumbs">
      <a href="#/">Оглавление</a>
      <span aria-hidden="true">/</span>
      <span>Урок {{ number }}</span>
    </nav>

    <header class="page__head">
      <p class="page__kicker">
        <template v-if="module">{{ module.title }} · </template>Урок {{ number }} · темы {{ lesson.topics.join(", ") }}
      </p>
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

import MusicStaff from "../components/MusicStaff.vue";
import PracticeBlock from "../components/PracticeBlock.vue";
import { synth } from "../stores/audio";
import { LESSONS, MODULES, findLesson, lessonIndex } from "../constants/lessons";
import { useProgress } from "../composables/useProgress";
import { lessonHref } from "../router";

const props = defineProps({ id: { type: String, required: true } });

const progress = useProgress();

// Звуковые примеры в теории: ноты идут одна за другой с заданным шагом.
function playVariant(variant) {
  const step = variant.step || 600;
  const hold = variant.hold || 700;
  variant.notes.forEach((item, i) => {
    const group = Array.isArray(item) ? item : [item];
    window.setTimeout(() => group.forEach((midi) => synth.playTransient(midi, hold, variant.gain || 1)), i * step);
  });
}
const lesson = computed(() => findLesson(props.id));
const number = computed(() => lessonIndex(props.id) + 1);
const module = computed(() => MODULES.find((item) => item.id === lesson.value?.module) || null);
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
