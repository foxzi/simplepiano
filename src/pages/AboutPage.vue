<template>
  <div class="page">
    <nav class="crumbs">
      <a href="#/">{{ t("lesson.crumbHome") }}</a>
      <span aria-hidden="true">/</span>
      <span>{{ t("about.crumbTitle") }}</span>
    </nav>

    <header class="page__head">
      <p class="page__kicker">{{ t("about.kicker") }}</p>
      <h1 class="page__title">{{ t("about.title") }}</h1>
      <p class="page__summary">{{ t("about.lead") }}</p>
    </header>

    <section class="card card--wide">
      <h2 class="card__title">{{ t("about.howTitle") }}</h2>
      <ul class="theory__list">
        <li v-for="(item, i) in tList('about.howItems')" :key="i">{{ item }}</li>
      </ul>
    </section>

    <section class="card card--wide">
      <h2 class="card__title">{{ t("about.whoTitle") }}</h2>
      <ul class="theory__list">
        <li v-for="(item, i) in tList('about.whoItems')" :key="i">{{ item }}</li>
      </ul>
    </section>

    <section class="card card--wide">
      <h2 class="card__title">{{ t("about.learnTitle") }}</h2>
      <p class="theory__text">{{ t("about.learnText", { lessons: LESSONS.length, modules: MODULES.length }) }}</p>
    </section>

    <section class="card card--wide">
      <h2 class="card__title">{{ t("about.needTitle") }}</h2>
      <ul class="theory__list">
        <li v-for="(item, i) in tList('about.needItems')" :key="i">{{ item }}</li>
      </ul>
    </section>

    <section class="card card--wide">
      <h2 class="card__title">{{ t("about.privacyTitle") }}</h2>
      <p class="theory__text">{{ t("about.privacyText") }}</p>
    </section>

    <section class="card card--wide">
      <h2 class="card__title">{{ t("about.startTitle") }}</h2>
      <p class="theory__text">{{ t("about.startText") }}</p>
      <div class="row row--wrap">
        <a class="btn btn--primary" href="#/">{{ t("about.ctaHome") }}</a>
        <a class="btn" href="#/scale">{{ t("about.ctaScale") }}</a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { LESSONS, MODULES } from "../constants/lessons";
import { t, tList } from "../i18n";
</script>
