import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// Офлайн-сборка: один самодостаточный HTML (см. scripts/build-offline.mjs).
const offline = process.env.OFFLINE_BUILD === "1";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: offline ? "./" : "/",
  build: {
    // Шрифты и прочие ассеты уходят внутрь CSS как data: URI.
    assetsInlineLimit: offline ? Number.MAX_SAFE_INTEGER : 4096,
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
  },
  preview: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
  },
});
