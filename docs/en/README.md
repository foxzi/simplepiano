# Simple Piano — English documentation

A small, dependency-free-to-the-user web app for learning piano basics: 32
lesson pages covering all 48 curriculum topics, a C major scale trainer
and a theory reference, with optional MIDI keyboard support. Built
with Vue 3 and Vite, with three switchable themes (light, dark, notebook).

## Running the app

The app is a Vue 3 + Vite project (`src/`, `index.html`, `vite.config.js`).
All dependencies are installed and run inside Docker — no `npm install` is
required on the host.

Development server (hot reload):

```bash
git clone https://github.com/foxzi/simplepiano.git
cd simplepiano
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

`compose.yaml` describes the development environment only: it runs `npm run
dev`. For public hosting there is a separate `Dockerfile.prod`, which builds
the app and copies `dist/` into an nginx image:

```bash
docker build -f Dockerfile.prod -t simple-piano .
docker run -d -p 8080:80 simple-piano
```

Routing inside the app is based on the URL hash (`#/lesson/...`), so the web
server needs no rewrite rules pointing back to `index.html`. HTTPS is the
job of a reverse proxy in front of this container; Web MIDI in Chrome only
works in a secure context, that is over HTTPS or from localhost.

A single-file offline build (output: `dist-offline/simple-piano.html`, opens
without a server and without internet access) is described below in
"Offline build (single file)".

## Offline build (single file)

Besides the regular production build, there is a command that bundles the
app into a single self-contained HTML file:

```bash
docker compose run --rm app npm run build:offline
```

The command runs `vite build` with the `OFFLINE_BUILD=1` environment
variable. In `vite.config.js` this variable enables `base: "./"` and lifts
the `assetsInlineLimit` restriction, so all assets, including fonts, end up
inlined into the CSS as `data:` URIs. The build goes into the
`dist-offline/` directory, then the `scripts/build-offline.mjs` script
inlines the resulting JS and CSS directly into the HTML and removes the
intermediate files. The result is a single file,
`dist-offline/simple-piano.html`, about 564 KB in size.

That file opens with a double-click from a file manager (the `file://`
protocol), no web server needed. Inlining is required because the browser
does not execute external `<script type="module" src="...">` tags when a
page is opened over `file://` (CORS restrictions, `null` origin) — all the
code has to live inside the HTML itself.

Verified in headless Chrome by opening `dist-offline/simple-piano.html` over
`file://` with no network access: the app renders, there are no console
errors, `window.isSecureContext === true`, `navigator.requestMIDIAccess` is
available (so MIDI keyboards work), Web Audio works, and `localStorage`
works (theme, lesson progress, and the rounds choice are all persisted).

As everywhere else, Web MIDI is only supported in Chrome and other
Chromium-based browsers — Firefox and Safari do not expose Web MIDI
regardless of how the page is opened (see "Web MIDI: HTTPS/localhost and
browser restrictions" below).

The `dist-offline/` directory is added to `.gitignore`. The regular build
(`npm run build`) and dev mode (`npm run dev`) are unchanged — there, fonts
are still loaded as separate `.woff2` files.

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

## Languages

Next to the theme switcher there is a language switcher: RU, EN, ES. Not
only the interface labels are translated, but also all 32 lessons, the
theory reference and the note names (До / C / Do). The choice is stored in
`localStorage` under the key `pianoL.locale.v1`; on the first visit the
language comes from the browser settings, falling back to Russian.

The lesson structure (notes, practice types, staff) is declared once and
translations are laid over it. See [I18N.md](./I18N.md) for the details and
the translation pack format.

## Fonts

Fonts are bundled locally with the app and are not loaded from the
internet. They used to be loaded from Google Fonts via a `<link>` and a
`preconnect` in `index.html`; those tags have been removed, and the font
files now live in the repository, under `src/assets/fonts/` (9 `.woff2`
files, about 147 KB total), declared in `src/fonts.css`, which is imported
in `src/main.js` before `src/style.css`. The set:

- Fraunces Variable (latin);
- Manrope Variable (latin and cyrillic);
- IBM Plex Mono, weights 400/500/600 (latin and cyrillic).

The fonts come from the `@fontsource` packages, licensed under OFL. Fraunces
does not include cyrillic glyphs (the font itself has no cyrillic), so
Russian headings fall back to Georgia — this was also the case with Google
Fonts, the behavior is unchanged. The notebook theme (the default)
intentionally uses Georgia/Iowan Old Style, while Manrope and Fraunces are
used in the light and dark themes.

Thanks to the local fonts, the app no longer needs internet access — not
for the regular build and dev server, and especially not for the offline
build (see "Offline build (single file)" above).

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

## Curriculum: 32 lessons, 48 topics

All 48 roadmap topics are implemented as lesson pages. Closely related
topics are merged, so there are 32 lessons with 86 practices in total. The
lessons are grouped into six modules, and the table of contents shows them
by module.

### Module 1. First steps (topics 1-10)

| Lesson | Title | Topics | Practices |
| --- | --- | --- | --- |
| 1 | Getting to know the keyboard | 1 | 1 |
| 2 | The note C and the white key names | 2, 3 | 2 |
| 3 | Octaves | 4 | 2 |
| 4 | Finger numbers | 5 | 1 |
| 5 | Five notes with each hand | 6, 7 | 2 |
| 6 | Simple note sequences | 8 | 3 |
| 7 | Rhythm basics and playing with a metronome | 9, 10 | 2 |

### Module 2. Rhythm and notes (topics 11-18)

| Lesson | Title | Topics | Practices |
| --- | --- | --- | --- |
| 8 | Quarter, half, and whole notes | 11 | 3 |
| 9 | Eighth notes and rests | 12 | 3 |
| 10 | The musical staff and the treble clef | 13, 14 | 3 |
| 11 | Reading notes with the right hand | 15 | 3 |
| 12 | The bass clef and reading with the left hand | 16, 17 | 3 |
| 13 | Simple melodies from notation | 18 | 3 |

### Module 3. Scales and keys (topics 19-26)

| Lesson | Title | Topics | Practices |
| --- | --- | --- | --- |
| 14 | C major scale with both hands | 19, 20, 21 | 3 |
| 15 | Sharps and flats | 22 | 3 |
| 16 | G major and F major scales | 23, 24 | 3 |
| 17 | D major and the remaining major scales | 25, 26 | 3 |

### Module 4. Intervals and chords (topics 27-34)

| Lesson | Title | Topics | Practices |
| --- | --- | --- | --- |
| 18 | Whole tone, semitone, and intervals | 27, 28 | 3 |
| 19 | Intervals by ear | 29 | 2 |
| 20 | Major and minor triads | 30, 31 | 3 |
| 21 | Chord inversions | 32 | 3 |
| 22 | Chords C, F, G and the I-IV-V-I progression | 33, 34 | 3 |

### Module 5. Two hands and repertoire (topics 35-42)

| Lesson | Title | Topics | Practices |
| --- | --- | --- | --- |
| 23 | Melody on the right, bass and chords on the left | 35, 36 | 3 |
| 24 | Playing with both hands and first pieces | 37, 38 | 3 |
| 25 | Sight reading and playing without hints | 39, 40 | 3 |
| 26 | Tempo: holding steady and building up | 41, 42 | 3 |

### Module 6. Going deeper (topics 43-48)

| Lesson | Title | Topics | Practices |
| --- | --- | --- | --- |
| 27 | Minor scales | 43 | 3 |
| 28 | Arpeggios | 44 | 3 |
| 29 | More complex rhythms | 45 | 3 |
| 30 | Dynamics and musical expression | 46 | 3 |
| 31 | The pedal | 47 | 2 |
| 32 | Final pieces | 48 | 3 |

Navigation uses hash routes without an external router: `#/` is the table of
contents, `#/lesson/<id>` is a lesson, `#/scale` is the original scale
trainer. The mini router lives in `src/router.js`. Lesson texts and tasks
are split by module under `src/constants/lessons/`: `basics.js`,
`reading.js`, `scales.js`, `harmony.js`, `hands.js`, `mastery.js`;
`index.js` combines them into the shared `LESSONS` and `MODULES`, and
`shared.js` holds common note sets.

### Musical notation

Lessons that involve reading notes show a real musical staff — the
`src/components/MusicStaff.vue` component draws it on an SVG: treble and
bass clef, ledger lines, whole, half, quarter, and eighth notes with dots,
rests, accidentals, and bar lines. Notes are highlighted in sync with the
practice, so you can see which bar is currently being played.

The keyboard, metronome, instrument selector and MIDI settings live in a
shared bar at the bottom of the screen (`.workbench` in `App.vue`), identical
on every page, so the keys are always within reach.

The bar can be collapsed with the button in its header to free up room for
the staff and the lesson text. The choice is kept in localStorage
(`pianoL.workbench.v1`, `src/composables/useWorkbench.js`) and only that
button changes it: playing on a connected MIDI keyboard does not expand a
collapsed bar. Notes still count towards the practice as usual, since the bar
only hosts the on-screen keyboard and the settings.

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
  counted per beat;
- `chord` - play a whole chord: the notes must sound together, and the
  check passes once all keys of the chord are held down at the same time;
- `ear` - an ear-training task: the app plays a reference note and a second
  note, and you must find the second one on the keyboard; the number of
  rounds is set by the `rounds` field.

Additional practice fields:

- `noHints` - do not highlight the keys (sight reading, playing from
  memory);
- `requireBpm: { min, max }` - the task only counts when the metronome is
  within the given tempo range;
- `labels` - labels shown on the keys (fingering, scale degrees);
- `chordNames` - chord names shown step by step;
- `staff` - the staff line drawn by `MusicStaff.vue`.

The keys you need are highlighted on the shared keyboard (amber dot), the
ones already played turn green. Tasks with fingering show finger numbers on
the keys.

### Number of rounds

Tasks are short, so each one has a "rounds" selector: 1, 2, 3, 5 or 8. The
task has to be played that many times in a row and is only marked as done
after the last round. Between rounds the step counter resets while errors
keep accumulating - the progress bar and the "round N of M" line show the
overall position.

The choice is stored per practice in `localStorage` under the key
`pianoL.repeats.v1` (shape: `{"lesson-id:practice-id": 3}`), so it survives
a reload. The number of rounds can only be changed while the task is not
running.

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

- The standalone trainer on the `#/scale` page only covers one scale (C
  major, one octave, ascending); the other scales are covered in the
  "Scales and keys" module lessons.
- The pedal and dynamics are explained and practiced by ear: the app does
  not read a MIDI pedal controller (CC 64) and does not evaluate velocity.
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
