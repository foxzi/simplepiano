import { createApp } from "vue";
import App from "./App.vue";
import { applyDocumentLocale } from "./i18n";
import "./fonts.css";
import "./style.css";

applyDocumentLocale();
createApp(App).mount("#app");
