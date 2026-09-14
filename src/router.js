// Мини-роутер на хэше: #/ — оглавление, #/lesson/<id> — урок, #/scale — тренажёр гаммы,
// #/about — описание проекта.
// Отдельная библиотека не нужна: маршрутов мало, а хэш работает и без сервера.

import { ref } from "vue";

export const route = ref(parse(window.location.hash));

function parse(hash) {
  const path = String(hash || "").replace(/^#/, "");
  const parts = path.split("/").filter(Boolean);
  if (parts[0] === "lesson" && parts[1]) return { name: "lesson", id: parts[1] };
  if (parts[0] === "scale") return { name: "scale", id: null };
  if (parts[0] === "about") return { name: "about", id: null };
  return { name: "home", id: null };
}

window.addEventListener("hashchange", () => {
  route.value = parse(window.location.hash);
  window.scrollTo({ top: 0, behavior: "smooth" });
});

export function navigate(path) {
  window.location.hash = path;
}

export function lessonHref(id) {
  return "#/lesson/" + id;
}
