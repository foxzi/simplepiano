<template>
  <section class="practice" :class="{ 'is-running': state.running, 'is-done': state.done }">
    <h3 class="practice__title">{{ practice.title }}</h3>
    <p class="practice__instruction">{{ practice.instruction }}</p>
    <p class="practice__instruction" v-if="practice.type === 'sequence'">
      {{ t("practice.limitsSequence") }}
    </p>
    <p class="practice__instruction" v-else-if="practice.type === 'rhythm'">
      {{ t("practice.limitsRhythm") }}
    </p>
    <p class="practice__instruction" v-else-if="practice.type === 'chord'">
      {{ t("practice.limitsChord") }}
    </p>

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
        {{ state.running ? t("practice.restart") : state.done ? t("practice.again") : t("practice.start") }}
      </button>
      <button type="button" class="btn" :disabled="!state.running && !state.done" @click="stop">{{ t("practice.reset") }}</button>
      <button type="button" class="btn" v-if="canListen" @click="demo">{{ t("practice.listen") }}</button>
      <button type="button" class="btn" v-if="practice.type === 'ear'" :disabled="!state.running" @click="playEar">
        {{ t("practice.replaySound") }}
      </button>

      <label class="repeats">
        <span class="repeats__label">{{ t("practice.rounds") }}</span>
        <select class="repeats__select" v-model.number="repeats" :disabled="state.running">
          <option v-for="option in REPEAT_OPTIONS" :key="option" :value="option">
            {{ option === INFINITE_REPEATS ? t("practice.infinite") : option }}
          </option>
        </select>
      </label>
    </div>

    <p class="practice__expected">{{ expectedText }}</p>

    <div class="progress" role="progressbar" aria-valuemin="0" :aria-valuemax="total" :aria-valuenow="state.index">
      <div class="progress__bar" :style="{ width: percent + '%' }"></div>
    </div>

    <p class="practice__meta">
      <span v-html="t('practice.step', { index: state.index, total })"></span>
      <span v-if="passes > 1" v-html="roundText"></span>
      <span v-html="t('practice.errors', { errors: state.errors })"></span>
      <span v-if="practice.type === 'rhythm'" v-html="t('practice.inTime', { count: state.inTime })"></span>
    </p>

    <p class="status" :class="statusClass" role="status" aria-live="polite">{{ state.feedback }}</p>
  </section>
</template>

<script setup>
import { computed, onUnmounted, watch } from "vue";

import MusicStaff from "./MusicStaff.vue";
import { useLessonTask } from "../composables/useLessonTask";
import { getRepeats, setRepeats, REPEAT_OPTIONS, INFINITE_REPEATS } from "../composables/useRepeats";
import { onNote, setHighlight, clearHighlight, activeOwner } from "../stores/keyboard";
import { t } from "../i18n";

const props = defineProps({
  practice: { type: Object, required: true },
  ownerId: { type: String, required: true },
});
const emit = defineEmits(["completed"]);

// Сколько раз подряд играть задание: выбор пользователя переживает перезагрузку.
const repeats = computed({
  get: () => getRepeats(props.ownerId),
  set: (value) => setRepeats(props.ownerId, value),
});

const {
  state,
  total,
  passes,
  expected,
  expectedText,
  start: startTask,
  reset: resetTask,
  handleNote,
  demo,
  playEar,
} = useLessonTask(props.practice, {
  onComplete: () => emit("completed", props.practice.id),
  repeats,
});

const infinite = computed(() => !Number.isFinite(passes.value));

// Прогресс считаем по всем кругам сразу, чтобы полоса не откатывалась назад.
// В бесконечном режиме кругов нет предела, поэтому показываем текущий круг.
const percent = computed(() => {
  if (!total) return 0;
  if (state.done) return 100;
  if (infinite.value) return Math.round((state.index / total) * 100);
  const steps = total * passes.value;
  if (!steps) return 0;
  return Math.round(((state.round * total + state.index) / steps) * 100);
});

const currentRound = computed(() => Math.min(state.round + (state.done ? 0 : 1), passes.value));

const roundText = computed(() =>
  infinite.value
    ? t("practice.roundInfinite", { round: currentRound.value })
    : t("practice.round", { round: currentRound.value, passes: passes.value })
);

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

const statusClass = computed(() => (state.feedbackKind ? "status--" + state.feedbackKind : ""));

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
