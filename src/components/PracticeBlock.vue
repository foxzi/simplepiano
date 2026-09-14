<template>
  <section class="practice" :class="{ 'is-running': state.running, 'is-done': state.done }">
    <h3 class="practice__title">{{ practice.title }}</h3>
    <p class="practice__instruction">{{ practice.instruction }}</p>

    <div class="staff-scroll" v-if="practice.staff">
      <MusicStaff
        :clef="practice.staff.clef"
        :items="practice.staff.items"
        :meter="practice.staff.meter"
        :show-names="practice.staff.showNames"
        :current="state.running && !state.done ? staffCurrent : -1"
        :done-count="state.running || state.done ? staffDone : 0"
      />
    </div>

    <div class="row row--wrap">
      <button type="button" class="btn btn--primary" @click="start">
        {{ state.running ? "Начать заново" : state.done ? "Пройти ещё раз" : "Начать" }}
      </button>
      <button type="button" class="btn" :disabled="!state.running && !state.done" @click="stop">Сбросить</button>
      <button type="button" class="btn" v-if="canListen" @click="demo">Послушать</button>
      <button type="button" class="btn" v-if="practice.type === 'ear'" :disabled="!state.running" @click="playEar">
        Повторить звук
      </button>
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

import MusicStaff from "./MusicStaff.vue";
import { useLessonTask } from "../composables/useLessonTask";
import { onNote, setHighlight, clearHighlight, activeOwner } from "../stores/keyboard";

const props = defineProps({
  practice: { type: Object, required: true },
  ownerId: { type: String, required: true },
});
const emit = defineEmits(["completed"]);

const {
  state,
  total,
  expected,
  expectedText,
  start: startTask,
  reset: resetTask,
  handleNote,
  demo,
  playEar,
} = useLessonTask(props.practice, { onComplete: () => emit("completed", props.practice.id) });

const percent = computed(() => (total ? Math.round((state.index / total) * 100) : 0));

// «Послушать» бессмысленно там, где играть нужно наугад или что угодно.
const canListen = computed(
  () => props.practice.listen !== false && ["sequence", "rhythm", "chord"].includes(props.practice.type)
);

// Нотный стан показывает и паузы, поэтому номер ноты в нём свой.
const staffIndexes = computed(() => {
  const items = (props.practice.staff && props.practice.staff.items) || [];
  return items.map((item, i) => (item.rest ? -1 : i)).filter((i) => i >= 0);
});
const staffCurrent = computed(() => {
  const idx = staffIndexes.value[state.index];
  return idx == null ? -1 : idx;
});
const staffDone = computed(() => {
  if (state.done) return ((props.practice.staff && props.practice.staff.items) || []).length;
  return staffCurrent.value < 0 ? 0 : staffCurrent.value;
});

const statusClass = computed(() => {
  if (state.done) return "status--ok";
  return /^(Верно|В долю!|Аккорд взят)/.test(state.feedback) ? "status--ok" : "";
});

function pushHighlight() {
  setHighlight(props.ownerId, {
    expected: props.practice.noHints ? [] : expected.value,
    labels: props.practice.noHints ? {} : props.practice.labels || {},
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
