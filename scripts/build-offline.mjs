// Собирает один самодостаточный HTML из результата `vite build` (OFFLINE_BUILD=1).
// JS и CSS вставляются прямо в разметку: внешние module-скрипты из file:// браузер не выполняет.
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";

const DIR = "dist-offline";
const OUT = join(DIR, "simple-piano.html");

// Файлы из public/: в одиночном HTML они не нужны, favicon встраиваем как data: URI.
const PUBLIC_FILES = [
  "favicon.svg",
  "apple-touch-icon.png",
  "og-cover.png",
  "site.webmanifest",
  "robots.txt",
  "sitemap.xml",
];

const read = (src) => readFileSync(join(DIR, src.replace(/^\.?\//, "")), "utf8");
const safe = (code) => code.replace(/<\/script/gi, "<\\/script");

let html = readFileSync(join(DIR, "index.html"), "utf8");

html = html.replace(
  /<script[^>]*src="([^"]+)"[^>]*><\/script>/g,
  (_, src) => `<script type="module">\n${safe(read(src))}\n</script>`,
);

html = html.replace(
  /<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g,
  (_, href) => `<style>\n${read(href)}\n</style>`,
);

const favicon = readFileSync(join(DIR, "favicon.svg"), "utf8");
html = html.replace(
  /<link[^>]*rel="icon"[^>]*>/,
  `<link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,${Buffer.from(favicon).toString("base64")}">`,
);
html = html.replace(/\s*<link[^>]*rel="(apple-touch-icon|manifest|canonical)"[^>]*>/g, "");
html = html.replace(/\s*<meta[^>]*(property="og:|name="twitter:)[^>]*>/g, "");

writeFileSync(OUT, html);
rmSync(join(DIR, "assets"), { recursive: true, force: true });
rmSync(join(DIR, "index.html"), { force: true });
PUBLIC_FILES.forEach((name) => rmSync(join(DIR, name), { force: true }));

console.log(`${OUT} — ${(Buffer.byteLength(html) / 1024).toFixed(1)} kB`);
