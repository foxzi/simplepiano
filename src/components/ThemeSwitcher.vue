<template>
  <div class="theme-switcher" role="group" :aria-label="t('theme.group')">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      class="theme-switcher__btn"
      :class="{ 'is-active': theme === option.value }"
      :aria-pressed="theme === option.value"
      @click="$emit('update:theme', option.value)"
    >
      <span class="theme-switcher__swatch" :data-swatch="option.value" aria-hidden="true"></span>
      {{ t("theme." + option.value) }}
    </button>
  </div>
</template>

<script setup>
import { t } from "../i18n";

defineProps({
  theme: { type: String, required: true },
});
defineEmits(["update:theme"]);

const options = [{ value: "light" }, { value: "dark" }, { value: "notebook" }];
</script>
