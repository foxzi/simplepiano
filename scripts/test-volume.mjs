// Регрессия громкости: загрузка из localStorage, setVolume (клэмп/игнор невалидных),
// отсутствие AudioContext при работе только со слайдером, маршрутизация голосов и
// щелчков метронома через masterGain, живая рампа при выставлении нуля, dispose().
//
// useSynth.js обращается к window.* напрямую, поэтому здесь собран минимальный,
// но функциональный мок Web Audio API + localStorage, а модуль загружается через
// dev-сервер Vite (как в остальных scripts/test-*.mjs), чтобы не тащить сборку.
import assert from 'node:assert/strict';
import { createServer } from 'vite';

// --- Мок AudioParam: фиксирует все вызовы, чтобы проверять порядок рампы ---
class FakeAudioParam {
  constructor(initial = 0) {
    this._value = initial;
    this.calls = [];
  }
  get value() {
    return this._value;
  }
  set value(v) {
    this._value = v;
    this.calls.push({ method: 'value', args: [v] });
  }
  setValueAtTime(v, t) {
    this._value = v;
    this.calls.push({ method: 'setValueAtTime', args: [v, t] });
    return this;
  }
  linearRampToValueAtTime(v, t) {
    this._value = v;
    this.calls.push({ method: 'linearRampToValueAtTime', args: [v, t] });
    return this;
  }
  exponentialRampToValueAtTime(v, t) {
    this._value = v;
    this.calls.push({ method: 'exponentialRampToValueAtTime', args: [v, t] });
    return this;
  }
  cancelScheduledValues(t) {
    this.calls.push({ method: 'cancelScheduledValues', args: [t] });
    return this;
  }
  setTargetAtTime(v, t, tc) {
    this._value = v;
    this.calls.push({ method: 'setTargetAtTime', args: [v, t, tc] });
    return this;
  }
}

class FakeGainNode {
  constructor() {
    this.gain = new FakeAudioParam(1);
    this.connections = [];
  }
  connect(target) {
    this.connections.push(target);
    return target;
  }
  disconnect() {
    this.connections = [];
  }
}

class FakeOscillatorNode {
  constructor() {
    this.type = 'sine';
    this.frequency = new FakeAudioParam(440);
    this.detune = new FakeAudioParam(0);
    this.connections = [];
    this.started = false;
    this.stopped = false;
  }
  connect(target) {
    this.connections.push(target);
    return target;
  }
  start() {
    this.started = true;
  }
  stop(t) {
    this.stopped = true;
    this.stopAt = t;
  }
}

class FakeBiquadFilterNode {
  constructor() {
    this.type = 'lowpass';
    this.Q = new FakeAudioParam(1);
    this.frequency = new FakeAudioParam(350);
    this.connections = [];
  }
  connect(target) {
    this.connections.push(target);
    return target;
  }
  disconnect() {
    this.connections = [];
  }
}

class FakeAudioContext {
  constructor() {
    FakeAudioContext.createCount += 1;
    FakeAudioContext.instances.push(this);
    this.state = 'suspended';
    this.currentTime = 0;
    this.destination = { __destination: true };
    this._listeners = {};
    this._gainNodes = [];
  }
  addEventListener(type, fn) {
    (this._listeners[type] ||= []).push(fn);
  }
  removeEventListener(type, fn) {
    this._listeners[type] = (this._listeners[type] || []).filter((f) => f !== fn);
  }
  _fire(type) {
    (this._listeners[type] || []).forEach((fn) => fn());
  }
  resume() {
    return Promise.resolve().then(() => {
      this.state = 'running';
      this._fire('statechange');
    });
  }
  close() {
    return Promise.resolve().then(() => {
      this.state = 'closed';
      this._fire('statechange');
    });
  }
  createGain() {
    const node = new FakeGainNode();
    this._gainNodes.push(node);
    return node;
  }
  createOscillator() {
    return new FakeOscillatorNode();
  }
  createBiquadFilter() {
    return new FakeBiquadFilterNode();
  }
}
FakeAudioContext.createCount = 0;
FakeAudioContext.instances = [];

function latestCtx() {
  return FakeAudioContext.instances[FakeAudioContext.instances.length - 1];
}

// --- Мок localStorage: настраиваемое начальное состояние и точки отказа ---
function makeStorage(initial = {}, opts = {}) {
  const store = new Map(Object.entries(initial));
  return {
    getItem(key) {
      if (opts.throwOnGet) throw new Error('storage get failed');
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      if (opts.throwOnSet) throw new Error('storage set failed');
      store.set(key, String(value));
    },
    removeItem(key) {
      store.delete(key);
    },
    _store: store,
  };
}

function setStorage(initial, opts) {
  global.window.localStorage = makeStorage(initial, opts);
}

function flush() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

global.window = {
  localStorage: makeStorage(),
  navigator: { languages: ['ru'], language: 'ru' },
  AudioContext: FakeAudioContext,
};

const VOLUME_KEY = 'pianoL.volume.v1';

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  optimizeDeps: { noDiscovery: true, include: [] },
});

try {
  const { useSynth } = await server.ssrLoadModule('/src/composables/useSynth.js');

  // 1. Нет записи в хранилище -> громкость по умолчанию 100.
  setStorage({});
  assert.equal(useSynth().state.volume, 100, 'missing storage should default to 100');

  // 2. Невалидные значения в хранилище -> тоже дефолт 100.
  for (const bad of ['abc', '', 'NaN', 'Infinity']) {
    setStorage({ [VOLUME_KEY]: bad });
    assert.equal(useSynth().state.volume, 100, `invalid stored "${bad}" should default to 100`);
  }

  // 3. Значения вне диапазона при загрузке зажимаются, а не отбрасываются.
  setStorage({ [VOLUME_KEY]: '500' });
  assert.equal(useSynth().state.volume, 100, 'stored 500 should clamp to 100 on load');
  setStorage({ [VOLUME_KEY]: '-40' });
  assert.equal(useSynth().state.volume, 0, 'stored -40 should clamp to 0 on load');

  // 4. Восстановленный ноль не должен превращаться в дефолт (0 -- валидное значение).
  setStorage({ [VOLUME_KEY]: '0' });
  assert.equal(useSynth().state.volume, 0, 'stored "0" must be restored as 0, not defaulted');

  // 5. Ошибки чтения хранилища -> тихий фолбэк на дефолт, без исключений.
  setStorage({ [VOLUME_KEY]: '42' }, { throwOnGet: true });
  assert.equal(useSynth().state.volume, 100, 'storage read errors should fall back to default');

  // 6. Ошибки записи не должны мешать обновлению состояния в памяти.
  setStorage({}, { throwOnSet: true });
  {
    const synth = useSynth();
    assert.doesNotThrow(() => synth.setVolume(55));
    assert.equal(synth.state.volume, 55, 'in-memory volume should update even if persistence fails');
  }

  // 7. setVolume: значения вне 0..100 зажимаются.
  setStorage({});
  {
    const synth = useSynth();
    synth.setVolume(150);
    assert.equal(synth.state.volume, 100, 'setVolume(150) should clamp to 100');
    synth.setVolume(-20);
    assert.equal(synth.state.volume, 0, 'setVolume(-20) should clamp to 0');
    synth.setVolume('30');
    assert.equal(synth.state.volume, 30, 'setVolume should accept numeric strings');
    assert.equal(global.window.localStorage._store.get(VOLUME_KEY), '30', 'setVolume should persist valid value');
  }

  // 8. setVolume: невалидные значения полностью игнорируются (текущая громкость сохраняется).
  setStorage({});
  {
    const synth = useSynth();
    synth.setVolume(40);
    for (const invalid of [NaN, undefined, null, '', 'abc', {}, [], Infinity, -Infinity]) {
      synth.setVolume(invalid);
      assert.equal(synth.state.volume, 40, `setVolume(${String(invalid)}) must be ignored`);
    }
  }

  // 9. Работа только со слайдером не должна создавать AudioContext.
  setStorage({});
  {
    const before = FakeAudioContext.createCount;
    const synth = useSynth();
    synth.setVolume(10);
    synth.setVolume(90);
    synth.setVolume(0);
    assert.equal(FakeAudioContext.createCount, before, 'setVolume alone must not create an AudioContext');
  }

  // 10. Маршрутизация голосов: огибающая ноты подключается к masterGain.
  setStorage({});
  {
    const synth = useSynth();
    synth.startHeld(60);
    await flush();
    const ctx = latestCtx();
    const masterGain = ctx._gainNodes[0];
    const voiceRouted = ctx._gainNodes.slice(1).some((node) => node.connections.includes(masterGain));
    assert.ok(voiceRouted, 'voice envelope must be routed through masterGain');
    synth.stopAllHeld();
    synth.dispose();
  }

  // 11. Маршрутизация щелчков метронома: тоже через masterGain, независимо от инструмента.
  setStorage({});
  {
    const synth = useSynth();
    synth.ensureContext();
    await flush();
    const ctx = latestCtx();
    const masterGain = ctx._gainNodes[0];
    const before = ctx._gainNodes.length;
    synth.playClick();
    await flush();
    const clickRouted = ctx._gainNodes.slice(before).some((node) => node.connections.includes(masterGain));
    assert.ok(clickRouted, 'metronome click must be routed through masterGain');
    synth.dispose();
  }

  // 12. Живая рампа: выставление нуля во время работающего контекста плавно доводит
  // masterGain.gain до 0 через cancel -> setValueAtTime -> linearRamp, а не скачком.
  setStorage({});
  {
    const synth = useSynth();
    synth.ensureContext();
    await flush();
    const ctx = latestCtx();
    const masterGain = ctx._gainNodes[0];
    masterGain.gain.calls = [];
    synth.setVolume(0);
    const methods = masterGain.gain.calls.map((c) => c.method);
    assert.deepEqual(
      methods,
      ['cancelScheduledValues', 'setValueAtTime', 'linearRampToValueAtTime'],
      'setVolume(0) on a live context must ramp, not jump'
    );
    const last = masterGain.gain.calls[masterGain.gain.calls.length - 1];
    assert.equal(last.args[0], 0, 'ramp target for volume 0 must be gain 0');
    assert.equal(masterGain.gain.value, 0);
    synth.dispose();
  }

  // 13. dispose(): закрывает контекст, отключает masterGain, безопасен без контекста и повторно.
  setStorage({});
  {
    const synth = useSynth();
    assert.doesNotThrow(() => synth.dispose(), 'dispose before any AudioContext must be a no-op');

    synth.ensureContext();
    await flush();
    const ctx = latestCtx();
    const before = FakeAudioContext.createCount;
    assert.equal(ctx.state, 'running');

    synth.dispose();
    await flush(); // close() resolves asynchronously
    assert.equal(ctx.state, 'closed', 'dispose must close the AudioContext');
    assert.equal(synth.state.status, 'idle', 'dispose must reset status to idle');
    assert.deepEqual(ctx._gainNodes[0].connections, [], 'dispose must disconnect masterGain');
    assert.doesNotThrow(() => synth.dispose(), 'dispose must be idempotent');

    synth.ensureContext();
    await flush();
    assert.equal(FakeAudioContext.createCount, before + 1, 'ensureContext after dispose must create a fresh context');
    synth.dispose();
  }

  console.log('Passed: volume default/restore, clamp/ignore, no-context slider path, master routing, live ramp, disposal.');
} finally {
  await server.close();
}
