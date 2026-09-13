# Piano Learning Notebook — English documentation

A small, dependency-free-to-the-user web app for learning piano basics: seven
lesson pages covering the first ten curriculum topics, a C major scale trainer
and a theory reference, with optional MIDI keyboard support. Built
with Vue 3 and Vite, with three switchable themes (light, dark, notebook).

## Running the app

The app is a Vue 3 + Vite project (`src/`, `index.html`, `vite.config.js`).
All dependencies are installed and run inside Docker — no `npm install` is
required on the host.

Development server (hot reload):

```bash
cd /home/piligrim/Work/audio/piano-l
docker compose up -d
```

This builds the `node:22-alpine`-based image, installs dependencies inside
the container, and starts the Vite dev server bound to
`127.0.0.1:5174` on the host (mapped to port `5173` inside the container).
Open `http://127.0.0.1:5174/` in your browser. Stop it with
`docker compose down`.

Production build (output goes to `dist/`):

```bash
docker compose run --rm app npm run build
```

The dev server binds only to `127.0.0.1` on the host for safety. If port
5174 is already used by another project on your machine, change the host
port in `compose.yaml` (the `ports:` mapping).

## Web MIDI: HTTPS/localhost and browser restrictions

The Web MIDI API (`navigator.requestMIDIAccess`) is only available in a
**secure context**. In practice this means one of:

- the page is served over `https://`, or
- the page is served over `http://localhost` / `http://127.0.0.1`.

Serving over a plain `http://` address on a LAN IP (e.g. `http://192.168.x.x`)
will **not** work — the browser will not expose `navigator.requestMIDIAccess`,
or it will exist but calling it will be blocked. The Vite dev server started
via `docker compose up -d` is reachable at `http://127.0.0.1:5174`, which
satisfies the secure-context requirement, so no HTTPS certificate is needed
for local testing.

Browser support also varies:

- Chrome, Edge, Opera, and other Chromium-based browsers support Web MIDI.
- Firefox and Safari have historically had limited or no support (check the
  current state for your browser version before assuming it works).
- The app detects both cases (API missing, or insecure context) and disables
  the "Connect MIDI" button with an explanatory message instead of failing
  silently.

The app requests MIDI access **without** SysEx (`{ sysex: false }`), which
keeps the permission prompt simpler and is all that's needed for note on/off
messages.

## Themes

Three accessible themes are available from the theme switcher in the header:
light, dark, and notebook (a warm, paper-like look). The chosen theme is
persisted in `localStorage` and restored on the next visit; the correct
theme is applied before the first paint to avoid a flash of the wrong theme.
If no preference is stored yet, the app falls back to the browser's
`prefers-color-scheme`.

## No physical MIDI hardware was used to verify this build

This app was implemented and verified with a production build
(`docker compose run --rm app npm run build`) in an environment without a
physical MIDI keyboard attached. The MIDI code path
(`requestMIDIAccess`, input selection, `onmidimessage`, `onstatechange`)
follows the standard Web MIDI API contract, but it has **not** been
end-to-end tested against real hardware. Please verify with an actual MIDI
keyboard/synth before relying on it, and report any device-specific quirks
(e.g. running status, unusual message framing) if you hit them.

The on-screen piano and all non-MIDI features (Web Audio synth, exercise
logic, metronome, theory lessons, localStorage persistence) do not depend on
hardware and were exercised in the browser during development.

## Instrument sound

The "Settings: MIDI, timbre, sound" block in the bottom bar has an
"Instrument" dropdown with six presets
(additive synthesis: a set of harmonics + an ADSR envelope + an optional
lowpass filter with its own brightness envelope):

- "Piano" (`piano`) — the default sound, a percussive tone that decays.
- "Electric piano" (`epiano`) — a soft, bell-like Rhodes-style tone.
- "Organ" (`organ`) — sustains steadily as long as the key is held.
- "Strings" (`strings`) — a slow attack with a long, gradual release.
- "Music box" (`musicbox`) — a short, bright, bell-like tone.
- "Simple synth" (`synth`) — the app's original tone: a single triangle
  oscillator with no decay.

Presets are defined in `src/constants/instruments.js`. For "Piano" and
"Music box", higher notes decay faster than lower notes (the
`decayPitchSemitones` field), similar to acoustic instruments. Switching the
instrument immediately plays a C4 note so you can hear the new sound, and a
short hint about its character is shown under the dropdown. The choice is
persisted in `localStorage` under the key `pianoL.instrument.v1` and restored
on the next visit. The metronome click is intentionally independent of the
selected instrument. No audio samples are used — all sound is synthesized in
the browser via the Web Audio API.

## Lessons 1-10 (separate pages)

The first ten roadmap topics are implemented as standalone pages. Closely
related topics are merged, so there are seven pages:

| # | Page | Topics | Practices |
| --- | --- | --- | --- |
| 1 | Getting to know the keyboard | 1 | 1 |
| 2 | The note C and the white key names | 2, 3 | 2 |
| 3 | Octaves | 4 | 2 |
| 4 | Finger numbers | 5 | 1 |
| 5 | Five notes with each hand | 6, 7 | 2 |
| 6 | Simple note sequences | 8 | 3 |
| 7 | Rhythm basics and playing with a metronome | 9, 10 | 2 |

Navigation uses hash routes without an external router: `#/` is the table of
contents, `#/lesson/<id>` is a lesson, `#/scale` is the original scale
trainer. The mini router lives in `src/router.js`; lesson texts and tasks are
in `src/constants/lessons.js`.

The keyboard, metronome, instrument selector and MIDI settings live in a
shared bar at the bottom of the screen (`.workbench` in `App.vue`), identical
on every page, so the keys are always within reach.

### Practice task types

The task engine is `src/composables/useLessonTask.js`; the kind of task is
set by the `type` field of a practice:

- `explore` - press a given number of different keys (free exploration, no
  mistakes possible);
- `set` - find a set of notes in any order (for example, every C on the
  keyboard);
- `sequence` - play the notes in strict order; a wrong note increases the
  error counter but does not reset progress;
- `rhythm` - same as `sequence`, but every note must land on a metronome
  click: the tolerance is 35% of the beat length, and only one note is
  counted per beat.

The keys you need are highlighted on the shared keyboard (amber dot), the
ones already played turn green. Tasks with fingering show finger numbers on
the keys.

### Lesson progress

A lesson is complete when all of its practices are done. The list of
completed lessons is stored in `localStorage` under the key
`pianoL.lessons.v1` (shape: `{"completed": ["keyboard-tour", ...]}`).
The table of contents shows the overall progress and a "continue" button
pointing at the first unfinished lesson; the old scale trainer result is
still kept separately under `pianoL.progress.v1`.

## The exercise: C major scale, one octave

- Notes (MIDI numbers): C4=60, D4=62, E4=64, F4=65, G4=67, A4=69, B4=71,
  C5=72 — the ascending C major scale within a single octave.
- The app waits for the correct next note before advancing; wrong notes are
  counted as errors but do not block progress.
- A MIDI "note on" with velocity 0 is treated as "note off", per the MIDI
  spec, so it does not advance the exercise.
- You can pick right or left hand fingering (displayed per note) before
  starting.
- Progress, error count, and completion result persist to `localStorage`
  (wrapped in try/catch — if storage is unavailable, e.g. private browsing,
  the app degrades gracefully and tells you the result wasn't saved).
- A completion record is only ever written after the full 8-note sequence is
  actually played correctly in order — there is no "fake" success state.

## Limitations

- The exercise only covers one specific scale (C major, one octave,
  ascending). It's a starting point, not a full curriculum.
- The sound is additive synthesis (see "Instrument sound"), not a sampled
  real piano.
- The Web Audio "sound" toggle only affects notes coming from a connected
  MIDI device (to avoid double sound when your hardware has its own synth).
  On-screen piano clicks and the scale demo always produce sound after a user
  gesture, per browser autoplay policies.
- No backend, no accounts, no analytics — everything runs in your browser.

## If there is no sound at all

The bottom bar has a "Check sound" button and an audio status
badge. Press the button — you should hear an A4 tone about a second long and the
badge should switch to "running".

| Badge | Meaning |
| --- | --- |
| running | Web Audio is started and routed to the system output |
| blocked by the browser | The context is still asleep — press "Check sound" or any key |
| Web Audio not supported | Use a modern browser (Chrome, Edge, Safari, Firefox) |
| error | The browser error message is shown under the badge |

If the badge says "running" but you still hear nothing, the cause is outside the
app: check the system volume, the per-tab volume in your mixer, the selected
output device and that the tab is not muted.

Clicks on the on-screen keys, the scale demo and the metronome always produce
sound. The "Synth sound for MIDI" toggle only affects notes arriving from an
external MIDI keyboard.

## If your MIDI keyboard makes no sound

1. Make sure the "Synth sound for MIDI" toggle in the "Settings: MIDI,
   timbre, sound" block is on — it is off by default so it does not double the sound of an
   instrument that already has its own synth.
2. If your instrument is a silent MIDI controller, this toggle is required.
3. Check that the connection status shows your device name; if on-screen keys
   light up, MIDI input is being received correctly.
4. Check the system volume and that the browser tab is not muted.

## Roadmap

See [ROADMAP.md](./ROADMAP.md) for the planned learning curriculum (not yet
implemented in full).
