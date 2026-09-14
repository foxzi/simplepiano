// Проверка переводов: словари интерфейса и пакеты уроков должны повторять
// структуру русских оригиналов — иначе интерфейс молча упадёт на fallback.
import assert from 'node:assert/strict';
import { createServer } from 'vite';

const LOCALES = ['en', 'es'];

function leafKeys(node, prefix = '') {
  return Object.entries(node).flatMap(([key, value]) =>
    value && typeof value === 'object' && !Array.isArray(value)
      ? leafKeys(value, `${prefix}${key}.`)
      : [`${prefix}${key}`]
  );
}

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', optimizeDeps: { noDiscovery: true, include: [] } });
try {
  const { RU } = await server.ssrLoadModule('/src/i18n/ru.js');
  const dicts = { en: (await server.ssrLoadModule('/src/i18n/en.js')).EN, es: (await server.ssrLoadModule('/src/i18n/es.js')).ES };
  const ruKeys = leafKeys(RU);

  for (const locale of LOCALES) {
    const keys = leafKeys(dicts[locale]);
    assert.deepEqual(keys.filter(key => !ruKeys.includes(key)), [], `${locale}: лишние ключи`);
    assert.deepEqual(ruKeys.filter(key => !keys.includes(key)), [], `${locale}: нет перевода`);
    for (const key of ruKeys) {
      const ru = key.split('.').reduce((node, part) => node[part], RU);
      const value = key.split('.').reduce((node, part) => node[part], dicts[locale]);
      assert.equal(Array.isArray(ru), Array.isArray(value), `${locale}.${key}: другой тип`);
      if (Array.isArray(ru)) assert.equal(ru.length, value.length, `${locale}.${key}: другая длина`);
      const vars = String(ru).match(/\{\w+\}/g) || [];
      for (const name of vars) assert.ok(String(value).includes(name), `${locale}.${key}: потерян ${name}`);
    }
  }

  const { LESSONS } = await server.ssrLoadModule('/src/constants/lessons/index.js');
  const { localizeLesson, localizeLessonMeta } = await server.ssrLoadModule('/src/constants/lessons/localize.js');
  const packs = {
    en: (await server.ssrLoadModule('/src/constants/lessons/i18n/en/index.js')).EN_LESSONS,
    es: (await server.ssrLoadModule('/src/constants/lessons/i18n/es/index.js')).ES_LESSONS,
  };

  // Пакет должен доезжать до страниц: localize.js обязан видеть те же тексты.
  for (const locale of LOCALES) {
    for (const lesson of LESSONS) {
      const meta = localizeLessonMeta(lesson, locale);
      assert.equal(meta.title, packs[locale][lesson.id].title, `${locale}/${lesson.id}: localize не подставил заголовок`);
      const full = localizeLesson(lesson, locale);
      assert.equal(full.blocks.length, lesson.blocks.length, `${locale}/${lesson.id}: localize потерял блок`);
      assert.equal(full.practices.length, lesson.practices.length, `${locale}/${lesson.id}: localize потерял практику`);
    }
  }

  for (const locale of LOCALES) {
    const pack = packs[locale];
    assert.equal(Object.keys(pack).length, LESSONS.length, `${locale}: переведены не все уроки`);
    for (const lesson of LESSONS) {
      const tr = pack[lesson.id];
      assert.ok(tr, `${locale}: нет урока ${lesson.id}`);
      assert.ok(tr.title && tr.summary, `${locale}/${lesson.id}: нет title или summary`);
      assert.equal(tr.blocks.length, lesson.blocks.length, `${locale}/${lesson.id}: другое число блоков`);
      lesson.blocks.forEach((block, i) => {
        const value = tr.blocks[i];
        const where = `${locale}/${lesson.id}: блок ${i} (${block.type})`;
        if (block.type === 'list' || block.type === 'ordered') {
          assert.ok(Array.isArray(value), where);
          assert.equal(value.length, block.items.length, where);
        } else if (block.type === 'text' || block.type === 'note') {
          assert.equal(typeof value, 'string', where);
        } else if (block.type === 'listen') {
          assert.equal(value.labels.length, block.variants.length, where);
        }
      });
      const ids = lesson.practices.map(practice => practice.id);
      assert.deepEqual(Object.keys(tr.practices || {}).filter(id => !ids.includes(id)), [], `${locale}/${lesson.id}: лишняя практика`);
      for (const practice of lesson.practices) {
        const trp = (tr.practices || {})[practice.id];
        assert.ok(trp && trp.title && trp.instruction, `${locale}/${lesson.id}/${practice.id}: нет перевода`);
        if (practice.chordNames) assert.equal(trp.chordNames.length, practice.chordNames.length, `${locale}/${practice.id}: chordNames`);
      }
    }
  }

  // Испанский без диакритики — типичная потеря при машинном переводе.
  const spanish = JSON.stringify(packs.es) + JSON.stringify(dicts.es);
  assert.ok(/[áéíóúñ¿¡]/.test(spanish), 'es: нет диакритики');

  const uiKeys = ruKeys.length;
  console.log(`Passed: ${uiKeys} ключей интерфейса на ${LOCALES.length + 1} языках, ${LESSONS.length} уроков переведены на ${LOCALES.join(' и ')}.`);
} finally {
  await server.close();
}
