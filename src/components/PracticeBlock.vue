<template>
  <section class="practice" :class="{ 'is-running': state.running, 'is-done': state.done }">
    <h3 class="practice__title">{{ practice.title }}</h3>
    <p class="practice__instruction">{{ practice.instruction }}</p>

    <div class="row row--wrap">
      <button type="button" class="btn btn--primary" @click="start">
        {{ state.running ? "Начать заново" : state.done ? "Пройти ещё раз" : "Начать" }}
      </button>
      <button type="button" class="btn" :disabled="!state.running && !state.done" @click="stop">Сбросить</button>
    </div>

    <p class="practice__expected">{{ expectedText }}</p>

    <div class="progress" role="progressbar" aria-valuemin="0" :aria-valuemax="total" :aria-valuenow="state.index">
      <div class="progress__bar" :style="{ width: percent + '%' }"></div>
    </div>

    <p class="practice__meta">
      <span>Шаг: <strong>{{ state.index }}</strong> / {{ total }}</span>
      <span>Ошибки: <strong>{{ state.errors }}</strong></span>
      <span v-if="practice.type === 'rhythm'">В долю: <strong>{{ state.inTime }}</strong></span>
    </p>

    <p class="status" :class="statusClass" role="status" aria-live="polite">{{ state.feedback }}</p>
  </section>
</template>

<script setup>
import { computed, onUnmounted, watch } from "vue";

import { useLessonTask } from "../composables/useLessonTask";
import { onNote, setHighlight, clearHighlight, activeOwner } from "../stores/keyboard";

const props = defineProps({
  practice: { type: Object, required: true },
  ownerId: { type: String, required: true },
});
const emit = defineEmits(["completed"]);

const { state, total, expected, expectedText, start: startTask, reset: resetTask, handleNote } = useLessonTask(
  props.practice,
  { onComplete: () => emit("completed", props.practice.id) }
);

const percent = computed(() => (total ? Math.round((state.index / total) * 100) : 0));

const statusClass = computed(() => {
  if (state.done) return "status--ok";
  return state.feedback.startsWith("Верно") || state.feedback === "В долю!" ? "status--ok" : "";
});

function pushHighlight() {
  setHighlight(props.ownerId, {
    expected: expected.value,
    labels: props.practice.labels || {},
    done: state.hits,
  });
}

function start() {
  startTask();
  pushHighlight();
}

function stop() {
  resetTask();
  clearHighlight(props.ownerId);
}

// Пока задание активно, клавиатура показывает его подсказки.
watch(
  () => [expected.value, state.hits.length, state.running],
  () => {
    if (state.running) pushHighlight();
  }
);

// Запуск другого задания на странице останавливает текущее.
watch(activeOwner, (owner) => {
  if (state.running && owner !== props.ownerId) resetTask();
});

const unsubscribe = onNote(handleNote);
onUnmounted(() => {
  unsubscribe();
  clearHighlight(props.ownerId);
});
</script>
