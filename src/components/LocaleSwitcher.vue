<template>
  <div class="locale-switcher" role="group" :aria-label="t('locale.group')">
    <button
      v-for="option in locales"
      :key="option.id"
      type="button"
      class="locale-switcher__btn"
      :class="{ 'is-active': locale === option.id }"
      :aria-pressed="locale === option.id"
      :title="option.label"
      @click="setLocale(option.id)"
    >
      {{ option.short }}
    </button>
  </div>
</template>

<script setup>
import { LOCALES as locales, locale, setLocale, t } from "../i18n";
</script>
