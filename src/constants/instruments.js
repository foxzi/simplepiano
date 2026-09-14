// Пресеты инструментов для синтезатора.
//
// Каждый голос собирается из нескольких гармоник (partials) с общей огибающей
// ADSR. Опциональный фильтр нижних частот с собственной огибающей даёт спад
// яркости — именно он делает щипковые и ударные тембры похожими на настоящие.
//
// Поля пресета:
//   partials  — [{ ratio, gain, type, detune }] гармоники относительно основного тона
//   gain      — общая громкость голоса (0..1)
//   attack    — время нарастания, с
//   decay     — время спада до уровня sustain, с
//   sustain   — уровень удержания (0 = звук затухает, как у фортепиано)
//   release   — время затухания после отпускания клавиши, с
//   decayPitchSemitones — на сколько полутонов вверх спад укорачивается вдвое
//   filter    — { from, to, q } частоты среза в начале и в конце спада, Гц

export const INSTRUMENTS = [
  {
    id: "piano",
    gain: 0.3,
    attack: 0.004,
    decay: 3.2,
    sustain: 0,
    release: 0.22,
    decayPitchSemitones: 30,
    filter: { from: 5200, to: 700, q: 0.7 },
    partials: [
      { ratio: 1, gain: 1, type: "triangle" },
      { ratio: 2, gain: 0.45, type: "sine", detune: 2 },
      { ratio: 3, gain: 0.22, type: "sine", detune: -3 },
      { ratio: 4, gain: 0.12, type: "sine", detune: 4 },
      { ratio: 5.02, gain: 0.06, type: "sine" },
      { ratio: 6.05, gain: 0.035, type: "sine" },
    ],
  },
  {
    id: "epiano",
    gain: 0.32,
    attack: 0.005,
    decay: 2.4,
    sustain: 0.12,
    release: 0.3,
    decayPitchSemitones: 36,
    filter: { from: 4200, to: 900, q: 0.6 },
    partials: [
      { ratio: 1, gain: 1, type: "sine" },
      { ratio: 2, gain: 0.3, type: "sine" },
      { ratio: 4, gain: 0.14, type: "sine", detune: 5 },
      { ratio: 14, gain: 0.05, type: "sine" },
    ],
  },
  {
    id: "organ",
    gain: 0.2,
    attack: 0.02,
    decay: 0.1,
    sustain: 1,
    release: 0.09,
    partials: [
      { ratio: 0.5, gain: 0.35, type: "sine" },
      { ratio: 1, gain: 1, type: "sine" },
      { ratio: 2, gain: 0.5, type: "sine" },
      { ratio: 3, gain: 0.25, type: "sine" },
      { ratio: 4, gain: 0.15, type: "sine" },
    ],
  },
  {
    id: "strings",
    gain: 0.16,
    attack: 0.22,
    decay: 0.6,
    sustain: 0.8,
    release: 0.5,
    filter: { from: 2600, to: 1600, q: 0.8 },
    partials: [
      { ratio: 1, gain: 1, type: "sawtooth", detune: -7 },
      { ratio: 1, gain: 0.8, type: "sawtooth", detune: 7 },
      { ratio: 2, gain: 0.2, type: "sine" },
    ],
  },
  {
    id: "musicbox",
    gain: 0.3,
    attack: 0.002,
    decay: 1.1,
    sustain: 0,
    release: 0.12,
    decayPitchSemitones: 24,
    filter: { from: 7000, to: 2000, q: 0.9 },
    partials: [
      { ratio: 1, gain: 1, type: "sine" },
      { ratio: 4, gain: 0.25, type: "sine" },
      { ratio: 8, gain: 0.1, type: "sine" },
      { ratio: 12.7, gain: 0.04, type: "sine" },
    ],
  },
  {
    id: "synth",
    gain: 0.22,
    attack: 0.02,
    decay: 0.1,
    sustain: 1,
    release: 0.09,
    partials: [{ ratio: 1, gain: 1, type: "triangle" }],
  },
];

export const DEFAULT_INSTRUMENT_ID = "piano";

export function findInstrument(id) {
  return INSTRUMENTS.find((item) => item.id === id) || INSTRUMENTS[0];
}
