// Собирает один самодостаточный HTML из результата `vite build` (OFFLINE_BUILD=1).
// JS и CSS вставляются прямо в разметку: внешние module-скрипты из file:// браузер не выполняет.
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";

const DIR = "dist-offline";
const OUT = join(DIR, "piano-l.html");

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

writeFileSync(OUT, html);
rmSync(join(DIR, "assets"), { recursive: true, force: true });
rmSync(join(DIR, "index.html"), { force: true });

console.log(`${OUT} — ${(Buffer.byteLength(html) / 1024).toFixed(1)} kB`);
