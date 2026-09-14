<template>
  <div class="staff" :class="{ 'staff--compact': compact }">
    <svg :viewBox="`0 0 ${width} ${HEIGHT}`" :style="{ width: width + 'px' }" role="img" :aria-label="ariaLabel">
      <!-- пять линеек -->
      <line
        v-for="line in 5"
        :key="'l' + line"
        class="staff__line"
        x1="6"
        :x2="width - 6"
        :y1="lineY(line - 1)"
        :y2="lineY(line - 1)"
      />
      <line class="staff__line" :x1="width - 7" :x2="width - 7" :y1="lineY(4)" :y2="lineY(0)" />

      <text class="staff__clef" x="14" :y="clefY" :style="{ fontSize: clefSize + 'px' }">{{ clefGlyph }}</text>
      <text v-if="meter" class="staff__meter" :x="clefX + 34" :y="lineY(1)">{{ meter[0] }}</text>
      <text v-if="meter" class="staff__meter" :x="clefX + 34" :y="lineY(3)">{{ meter[1] }}</text>

      <g v-for="(item, i) in placed" :key="i" :class="itemClass(i)">
        <!-- добавочные линейки -->
        <line
          v-for="(y, k) in item.ledgers"
          :key="'g' + k"
          class="staff__ledger"
          :x1="item.x - 13"
          :x2="item.x + 13"
          :y1="y"
          :y2="y"
        />

        <template v-if="item.rest">
          <rect
            v-if="item.restBar"
            class="staff__rest"
            :x="item.x - 9"
            :y="item.restBar.y"
            width="18"
            height="5"
          />
          <path v-else class="staff__rest-mark" :d="item.restPath" />
        </template>
        <template v-else>
          <text v-if="item.accidental" class="staff__accidental" :x="item.x - 24" :y="item.y + 5">
            {{ item.accidental }}
          </text>
          <ellipse
            class="staff__head"
            :class="{ 'staff__head--open': item.open }"
            :cx="item.x"
            :cy="item.y"
            rx="8.5"
            ry="6.4"
          />
          <line
            v-if="item.stem"
            class="staff__stem"
            :x1="item.stemUp ? item.x + 8 : item.x - 8"
            :x2="item.stemUp ? item.x + 8 : item.x - 8"
            :y1="item.y"
            :y2="item.y + (item.stemUp ? -32 : 32)"
          />
          <path v-if="item.flag" class="staff__flag" :d="item.flagPath" />
          <text v-if="showNames" class="staff__name" :x="item.x" :y="HEIGHT - 8">{{ item.name }}</text>
        </template>
      </g>
    </svg>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { diatonicStep, isBlackKey, noteName } from "../constants/piano";
import { t } from "../i18n";

// Нотный стан рисуется вручную на SVG: нот немного, а зависимость от
// музыкального шрифта сделала бы вид непредсказуемым в разных браузерах.
const props = defineProps({
  clef: { type: String, default: "treble" }, // treble | bass
  items: { type: Array, default: () => [] }, // [{ midi } | { rest: true }, beats]
  current: { type: Number, default: -1 }, // индекс ноты, которую ждём сейчас
  doneCount: { type: Number, default: 0 }, // сколько нот уже сыграно
  showNames: { type: Boolean, default: false },
  meter: { type: Array, default: null }, // [4, 4]
  compact: { type: Boolean, default: false },
});

const HEIGHT = 132;
const LINE_GAP = 12; // расстояние между линейками
const TOP_Y = 34; // верхняя линейка
const STEP = LINE_GAP / 2; // одна ступень = половина промежутка
const FIRST_X = 78;
const SLOT = 44;

// Нижняя линейка: ми первой октавы в скрипичном ключе, соль малой — в басовом.
const BASE_STEP = computed(() => (props.clef === "bass" ? diatonicStep(43) : diatonicStep(64)));
const clefGlyph = computed(() => (props.clef === "bass" ? "\uD834\uDD22" : "\uD834\uDD1E"));
const clefSize = computed(() => (props.clef === "bass" ? 48 : 72));
const clefY = computed(() => (props.clef === "bass" ? lineY(3) : lineY(1)));
const clefX = 14;

const width = computed(() => FIRST_X + Math.max(props.items.length, 1) * SLOT + 24);

function lineY(index) {
  return TOP_Y + index * LINE_GAP;
}

// y середины ноты по её ступени (bottomLine = ми₄ или соль₂)
function stepY(step) {
  return lineY(4) - (step - BASE_STEP.value) * STEP;
}

// Паузы рисуем фигурами: целая висит под четвёртой линейкой, половинная
// лежит на средней, четвертная и восьмая — зигзагом.
function restShape(beats, x) {
  if (beats >= 4) return { restBar: { y: lineY(1) } };
  if (beats >= 2) return { restBar: { y: lineY(2) - 5 } };
  return { restPath: `M ${x - 5} ${lineY(1)} l 9 9 l -9 9 l 11 8` };
}

const placed = computed(() =>
  props.items.map((item, i) => {
    const x = FIRST_X + i * SLOT + SLOT / 2;
    const beats = item.beats == null ? 1 : item.beats;

    if (item.rest) {
      return { rest: true, x, ledgers: [], ...restShape(beats, x) };
    }

    const step = diatonicStep(item.midi);
    const y = stepY(step);
    const middle = BASE_STEP.value + 4; // средняя линейка
    const stemUp = step < middle;

    // Добавочные линейки над и под станом — через ступень, только на линиях.
    const ledgers = [];
    for (let s = BASE_STEP.value - 2; s >= step; s -= 2) ledgers.push(stepY(s));
    for (let s = BASE_STEP.value + 10; s <= step; s += 2) ledgers.push(stepY(s));

    const flagX = stemUp ? x + 8 : x - 8;
    const flagY = y + (stemUp ? -32 : 32);

    return {
      x,
      y,
      ledgers,
      open: beats >= 2,
      stem: beats < 4,
      stemUp,
      flag: beats <= 0.5,
      flagPath: `M ${flagX} ${flagY} q 11 6 9 18`,
      accidental: isBlackKey(item.midi) ? "\u266F" : "",
      name: noteName(item.midi),
    };
  })
);

function itemClass(i) {
  return {
    "staff__note": true,
    "is-current": i === props.current,
    "is-done": i < props.doneCount,
  };
}

const ariaLabel = computed(() => {
  const names = props.items.map((item) => (item.rest ? t("staff.rest") : noteName(item.midi)));
  const clefName = props.clef === "bass" ? t("staff.bass") : t("staff.treble");
  return clefName + ": " + names.join(", ");
});
</script>
