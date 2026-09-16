// Регрессия «бесконечного режима» повторов: useRepeats.js (хранение выбора
// в localStorage, защита от невалидных значений) и useLessonTask.js (конечный
// режим завершает задание после нужного числа кругов, бесконечный — засчитывает
// его после первого круга и продолжает повторять, пока не вызовут reset()).
//
// useLessonTask.js тянет src/stores/audio.js (Web Audio) и src/i18n, поэтому
// перед загрузкой модулей через Vite нужен минимальный мок window.
import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { ref } from 'vue';

// --- Мок localStorage: обычная Map, без имитации сбоев (тут они не проверяются) ---
function makeStorage() {
  const store = new Map();
  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
    removeItem(key) {
      store.delete(key);
    },
  };
}

global.window = {
  localStorage: makeStorage(),
  navigator: { languages: ['ru'], language: 'ru' },
  setTimeout: (...args) => setTimeout(...args),
  clearTimeout: (...args) => clearTimeout(...args),
};

const REPEATS_KEY = 'pianoL.repeats.v1';

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  optimizeDeps: { noDiscovery: true, include: [] },
});

try {
  const { REPEAT_OPTIONS, INFINITE_REPEATS, getRepeats, setRepeats } =
    await server.ssrLoadModule('/src/composables/useRepeats.js');
  const { useLessonTask } = await server.ssrLoadModule('/src/composables/useLessonTask.js');

  // 1. Бесконечный вариант — один из предлагаемых пользователю.
  assert.equal(INFINITE_REPEATS, 0, 'INFINITE_REPEATS должен быть 0');
  assert.ok(REPEAT_OPTIONS.includes(INFINITE_REPEATS), 'REPEAT_OPTIONS должен содержать бесконечный режим');

  // 2. getRepeats/setRepeats: хранение и защита от невалидных значений.
  assert.equal(getRepeats('unknown:key'), 1, 'неизвестный ключ должен давать 1 повтор');

  const key = 'lesson:practice';

  setRepeats(key, 0);
  assert.equal(getRepeats(key), 0, 'бесконечный режим должен сохраняться как 0');
  const raw = JSON.parse(global.window.localStorage.getItem(REPEATS_KEY));
  assert.equal(raw[key], 0, 'в localStorage должен быть записан именно 0');

  setRepeats(key, 3);
  assert.equal(getRepeats(key), 3, 'обычное значение должно сохраняться как есть');

  setRepeats(key, -2);
  assert.equal(getRepeats(key), 1, 'отрицательное значение должно откатываться к одному кругу');

  setRepeats(key, 'abc');
  assert.equal(getRepeats(key), 1, 'нечисловая строка должна откатываться к одному кругу');

  setRepeats(key, null);
  assert.equal(getRepeats(key), 1, 'null не должен включать бесконечный режим');

  setRepeats(key, 1.6);
  assert.equal(getRepeats(key), 2, 'дробное значение должно округляться');

  // 3. Конечный режим: два круга по две ноты, зачёт только после второго.
  const finitePractice = { id: 'p-finite', type: 'sequence', notes: [60, 62] };
  let finiteCompleted = 0;
  const finiteRepeats = ref(2);
  const finiteTask = useLessonTask(finitePractice, {
    onComplete: () => {
      finiteCompleted += 1;
    },
    repeats: finiteRepeats,
  });

  finiteTask.start();
  finiteTask.handleNote(60);
  finiteTask.handleNote(62);
  assert.equal(finiteTask.state.done, false, 'после первого круга задание ещё не завершено');
  assert.equal(finiteTask.state.round, 1, 'первый круг должен быть засчитан');
  assert.equal(finiteTask.state.index, 0, 'прогресс внутри круга должен сбрасываться');

  finiteTask.handleNote(60);
  finiteTask.handleNote(62);
  assert.equal(finiteTask.state.done, true, 'после второго круга задание должно завершиться');
  assert.equal(finiteTask.state.running, false, 'завершённое задание должно остановиться');
  assert.equal(finiteCompleted, 1, 'onComplete должен вызваться ровно один раз');

  // 4. Бесконечный режим: круги идут дальше, зачёт — только после первого круга.
  const infinitePractice = { id: 'p-infinite', type: 'sequence', notes: [60, 62] };
  let infiniteCompleted = 0;
  const infiniteRepeats = ref(INFINITE_REPEATS);
  const infiniteTask = useLessonTask(infinitePractice, {
    onComplete: () => {
      infiniteCompleted += 1;
    },
    repeats: infiniteRepeats,
  });

  infiniteTask.start();
  for (let round = 1; round <= 3; round += 1) {
    infiniteTask.handleNote(60);
    infiniteTask.handleNote(62);
  }
  assert.equal(infiniteTask.state.done, false, 'бесконечный режим не должен завершаться сам');
  assert.equal(infiniteTask.state.running, true, 'бесконечный режим продолжает работать после кругов');
  assert.equal(infiniteTask.state.round, 3, 'три круга должны быть пройдены');
  assert.equal(infiniteTask.state.index, 0, 'прогресс внутри круга должен сбрасываться после каждого круга');
  assert.equal(infiniteCompleted, 1, 'onComplete в бесконечном режиме должен вызваться только после первого круга');

  // 5. reset() — единственный способ остановить бесконечный режим.
  infiniteTask.reset();
  assert.equal(infiniteTask.state.running, false, 'reset должен останавливать бесконечный режим');
  assert.equal(infiniteTask.state.round, 0, 'reset должен сбрасывать счётчик кругов');

  console.log('Passed: бесконечный режим повторов — useRepeats.js и useLessonTask.js работают корректно.');
} finally {
  await server.close();
}
