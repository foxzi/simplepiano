<template>
  <div class="theme-switcher" role="group" aria-label="Выбор темы оформления">
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
      {{ option.label }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  theme: { type: String, required: true },
});
defineEmits(["update:theme"]);

const options = [
  { value: "light", label: "Светлая" },
  { value: "dark", label: "Тёмная" },
  { value: "notebook", label: "Тетрадь" },
];
</script>
