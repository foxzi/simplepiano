// Английский словарь интерфейса. Ключи и вложенность должны в точности
// совпадать со словарём RU (./ru.js).

export const EN = {
  app: {
    title: "Simple Piano \u2014 Learning Notebook",
    description: "Simple Piano \u2014 a learning notebook: theory, the C major scale, MIDI, and a metronome, right in your browser.",
    brand: "Simple Piano",
  },

  nav: {
    label: "Main navigation",
    home: "Contents",
    scale: "Scale",
    about: "About",
  },

  theme: {
    group: "Choose a theme",
    light: "Light",
    dark: "Dark",
    notebook: "Notebook",
  },

  locale: {
    group: "Choose a language",
  },

  workbench: {
    region: "Keyboard and sound settings",
    show: "Show keyboard and settings",
    hide: "Hide keyboard and settings",
    barInfo: "{bpm} {unit}",
    barInfoRunning: "{bpm} {unit} \u00b7 metronome running",
    tempo: "Tempo, BPM",
    bpmUnit: "BPM",
    metronome: "Metronome",
    metronomeStop: "Stop metronome",
    audioLabel: "Sound: {status}",
    audioTest: "Test sound",
    audioStatus: {
      running: "running",
      suspended: "blocked by the browser \u2014 click \u201cTest sound\u201d",
      closed: "context closed",
      unsupported: "your browser doesn't support Web Audio",
      error: "error creating the audio context",
      idle: "not started yet",
    },
    settings: "Settings: MIDI, instrument, sound",
    connectMidi: "Connect MIDI",
    refreshMidi: "Refresh device list",
    device: "Device",
    deviceAria: "Choose a MIDI device",
    instrument: "Instrument",
    instrumentAria: "Choose an instrument sound",
    browserMessage: "Browser message: {error}",
    midiSound: "Synth sound for MIDI (off by default, so it doesn't duplicate the sound of your own keyboard)",
  },

  home: {
    kicker: "learning notebook \u00b7 piano",
    title: "Full course: {topics} topics in {lessons} lessons",
    subtitle:
      "The program is split into six modules and {count} lessons, each with theory and hands-on keyboard practice. " +
      "Go through them in order: every lesson builds on the one before it.",
    progressTitle: "Your progress",
    progressHint: "Lessons completed: <strong>{done}</strong> of {total}. Progress is stored only in this browser.",
    continueBtn: "Continue: {title}",
    startBtn: "Start learning: {title}",
    resetProgress: "Reset progress",
    moduleProgress: "{done} of {total} completed",
    lessonMeta: "Program topics: {topics} \u00b7 practices: {count}",
    extraTitle: "Extra",
    extraHint:
      "A standalone C major scale trainer with a demo and short theory \u2014 it was here before the lessons and " +
      "is still available.",
    scaleTrainer: "C major scale trainer",
    footerPrivacy: "Your progress is saved locally in this browser. Nothing is sent to a server.",
    footerRoadmap: "The full learning program ({topics} topics) \u2014",
    roadmapRu: "roadmap (RU)",
    roadmapEn: "roadmap (EN)",
  },

  modules: {
    basics: { title: "First Steps", summary: "The keyboard, note names, finger numbers, and your first rhythm." },
    reading: { title: "Rhythm and Notes", summary: "Note durations, rests, the staff, and reading both clefs." },
    scales: {
      title: "Scales and Keys",
      summary: "C major with both hands, accidentals, and other scales.",
    },
    harmony: {
      title: "Intervals and Chords",
      summary: "Whole and half steps, intervals by ear, triads, and inversions.",
    },
    hands: {
      title: "Two Hands and Repertoire",
      summary: "Melody with accompaniment, sight-reading, and working on tempo.",
    },
    mastery: {
      title: "Going Further",
      summary: "Minor keys, arpeggios, advanced rhythm, dynamics, pedal, and pieces.",
    },
  },

  lesson: {
    crumbHome: "Contents",
    crumbLesson: "Lesson {number}",
    kicker: "{module} \u00b7 Lesson {number} \u00b7 topics {topics}",
    kickerNoModule: "Lesson {number} \u00b7 topics {topics}",
    done: "Lesson completed",
    theoryTitle: "Theory",
    practiceTitle: "Practice",
    practiceHint: "Play on a MIDI keyboard or click the keys at the bottom of the page. The keys you need are highlighted.",
    toContents: "Back to contents",
    notFoundTitle: "Lesson not found",
    notFoundText: "The link may be outdated.",
    notFoundLink: "Go back to contents",
  },

  practice: {
    limitsSequence:
      "Only the order of the notes is checked automatically. Judge rhythm, note durations, dynamics, and " +
      "hand technique yourself.",
    limitsRhythm:
      "Notes and their timing against the metronome clicks are checked. Holding keys down and silence during " +
      "rests are not checked. Inaccuracies are flagged but won't stop you from finishing the exercise: check " +
      "the \u201cOn beat\u201d and error counters.",
    limitsChord:
      "The set of notes is checked within a 1.2-second window \u2014 that's a training tolerance, not a " +
      "judgment of simultaneity. Play the notes together; judge how long you hold the keys and your hand " +
      "technique yourself.",
    start: "Start",
    restart: "Restart",
    again: "Again",
    reset: "Reset",
    listen: "Listen",
    replaySound: "Replay sound",
    rounds: "Rounds:",
    step: "Step: <strong>{index}</strong> / {total}",
    round: "Round: <strong>{round}</strong> / {passes}",
    errors: "Errors: <strong>{errors}</strong>",
    inTime: "On beat: <strong>{count}</strong>",
  },

  task: {
    defaultStartHint: "Click \u201cStart\u201d to begin the exercise.",
    defaultDoneText: "Exercise complete!",
    completeDefault: "Great job, exercise complete!",
    exploreProgress: "Different keys pressed: {index} of {total}.",
    setRemaining: "Still to find: {list}",
    chordNamed: "Chord {title}: {list}",
    chordPlain: "Play together: {list}",
    earQuestion: "Question {n} of {total}: play the second note you heard.",
    noteNoHints: "Note {n} of {total}: play from the score, no hints.",
    playNote: "Play: {note}",
    startRhythm: "Turn on the metronome and play exactly on the clicks.",
    startChord: "With the mouse you can click the notes quickly one after another \u2014 that counts too.",
    roundDone: "Round {round} of {passes} complete \u2014 play it again.",
    earListen: "Listen: first the reference note, then the second one.",
    exploreRepeat: "You've already pressed this key \u2014 try a neighboring one.",
    explorePlayed: "That's {note}.",
    setWrong: "That's {note}. Keep looking for the right keys.",
    setAlready: "{note} is already found.",
    correctNote: "Correct: {note}.",
    chordWrong: "Extra note {note} \u2014 starting the chord over.",
    chordDone: "Chord played.",
    chordHold: "Keep holding: {count} note(s) left.",
    earWrong: "That's {note}. Listen again and compare it with the reference note.",
    earCorrect: "Correct: {interval}.",
    rhythmNoMetronome: "Start the metronome first \u2014 you need to play along with the clicks.",
    rhythmBpmRange: "Set the tempo to {min}\u2013{max} {unit}.",
    rhythmOneNote: "One note per click. Wait for the next click.",
    rhythmEarly: "Too early: hold the previous note, {count} beat(s) left.",
    rhythmLate: "Too late: the note should have come in earlier. Moving on.",
    rhythmInTime: "On beat!",
    rhythmOffBeat: "Right note, but off the beat \u2014 listen to the click.",
    wrongNoteNoHints: "Wrong note \u2014 that was {note}.",
    wrongNote: "That was {note}, but you need {expected}.",
  },

  intervals: {
    0: "unison",
    1: "minor second",
    2: "major second",
    3: "minor third",
    4: "major third",
    5: "perfect fourth",
    6: "tritone",
    7: "perfect fifth",
    8: "minor sixth",
    9: "major sixth",
    10: "minor seventh",
    11: "major seventh",
    12: "octave",
  },

  scale: {
    crumbTitle: "Scale trainer",
    kicker: "extra \u00b7 topics 19\u201320",
    title: "C major scale, one octave",
    summary:
      "C \u2013 D \u2013 E \u2013 F \u2013 G \u2013 A \u2013 B \u2013 C. Play the notes in order with the hand you choose, on a MIDI keyboard or " +
      "by clicking the keys at the bottom of the page.",
    exerciseTitle: "Exercise",
    handLegend: "Hand",
    handRight: "Right",
    handLeft: "Left",
    start: "Start",
    reset: "Reset",
    playDemo: "Play demo",
    stopDemo: "Stop demo",
    demoHint: "The demo plays the whole scale and highlights the keys.",
    theoryTitle: "Quick theory",
    theoryNavAria: "Theory topics",
  },

  about: {
    crumbTitle: "About",
    kicker: "about the project",
    title: "What Simple Piano is",
    lead:
      "Simple Piano is a free piano course that runs right in your browser. Nothing to download or install, " +
      "no sign-up: open the page and start playing.",
    howTitle: "How it works",
    howItems: [
      "A keyboard is always at the bottom of the screen. Play it with the mouse, with your finger on a phone, or plug in a real MIDI keyboard.",
      "Every lesson is a short explanation followed by practice. The app listens to what you play and tells you when a note is wrong.",
      "A metronome and a choice of sounds are right there: grand piano, electric piano, organ, strings, music box.",
      "Finished lessons get a check mark, so you always see where you stopped.",
    ],
    whoTitle: "Who it is for",
    whoItems: [
      "Complete beginners who want a plain explanation without heavy terminology.",
      "People who learned once and want to refresh notes, scales and chords.",
      "Students who take lessons with a teacher and need a trainer for practice at home.",
      "Parents who want to try music with a child before buying an instrument.",
    ],
    learnTitle: "What you will learn",
    learnText:
      "The notebook holds {lessons} lessons grouped into {modules} modules: from the very first key press to " +
      "reading notes, scales, chords, playing with both hands and your first simple pieces. The lessons build on " +
      "each other, so it is better not to skip ahead.",
    needTitle: "What you need to start",
    needItems: [
      "Any modern browser on a computer, tablet or phone.",
      "Headphones or speakers: the browser generates the sound itself, nothing is downloaded.",
      "A MIDI keyboard is optional. Without one everything works the same, you just play with the mouse or your finger.",
      "15 to 20 minutes a day. Short regular practice beats rare long sessions.",
    ],
    privacyTitle: "Privacy and cost",
    privacyText:
      "The project is free, with no ads and no accounts. Your progress, language and theme are stored only in " +
      "your browser and are never sent anywhere. The trade-off: clearing browser data or opening the site on " +
      "another device starts the progress over.",
    startTitle: "Where to start",
    startText:
      "Open the contents and begin with the first lesson, which explains how the keyboard is laid out. " +
      "If you already know the notes, go straight to the scale trainer.",
    ctaHome: "Go to the lessons",
    ctaScale: "Scale trainer",
  },

  exercise: {
    pressStart: "Click \u201cStart\u201d to begin the exercise.",
    playNote: "Play: {note} (finger {finger}, {hand} hand)",
    handRight: "right",
    handLeft: "left",
    started: "Exercise started. Play the first note.",
    correct: "Correct! Play the next note.",
    wrong: "Wrong note (you played {played}, need {expected}). Try again.",
    scaleComplete: "Scale complete!",
    finished: "Exercise finished.",
    result: "Result: C major scale completed with the {hand} hand, errors: {errors}.",
    notSaved: "(Couldn't save the result in this browser.)",
    previousResult: "Previously completed ({date}): {hand} hand, errors: {errors}.",
  },

  midi: {
    notConnected: "MIDI isn't connected yet.",
    unsupported: "This browser doesn't support the Web MIDI API. Try a recent version of Chrome, Edge, or Opera on desktop.",
    insecure: "Web MIDI requires a secure context: open the page via https:// or http://localhost.",
    connecting: "Requesting MIDI access...",
    accessError: "Couldn't get MIDI access: {message}.",
    requestDenied: "request denied",
    noDevices: "No MIDI devices found. Connect your keyboard and click \u201cRefresh device list\u201d.",
    connected: "Connected: {name}.",
    disconnected: "Device \u201c{name}\u201d disconnected.",
  },

  synth: {
    unsupported: "Your browser doesn't support the Web Audio API.",
  },

  staff: {
    treble: "Treble clef",
    bass: "Bass clef",
    rest: "rest",
  },

  piano: {
    aria: "Piano keyboard, two octaves starting from middle C",
  },

  instruments: {
    piano: {
      label: "Piano",
      hint: "A percussive tone with decay and fading brightness \u2014 closest to an acoustic grand piano.",
    },
    epiano: {
      label: "Electric Piano",
      hint: "A soft, bell-like tone in the style of a Rhodes piano.",
    },
    organ: {
      label: "Organ",
      hint: "The sound stays steady as long as the key is held \u2014 handy for listening to intervals and chords.",
    },
    strings: {
      label: "Strings",
      hint: "A smooth swell and a long tail \u2014 good for working on legato.",
    },
    musicbox: {
      label: "Music Box",
      hint: "A short, bright sound \u2014 even the fastest notes stand out.",
    },
    synth: {
      label: "Simple Synth",
      hint: "The app's original plain tone: a single triangle oscillator with no decay.",
    },
  },

  theory: {
    "notes-octaves": {
      title: "Notes and Octaves",
      html:
        "<h3>Notes and Octaves</h3>" +
        "<p>Music uses seven basic notes: C, D, E, F, G, A, B. After B, C repeats, but an octave higher \u2014 it " +
        "sounds the same, just higher in pitch. A piano usually spans more than seven octaves.</p>" +
        "<p>To tell identical notes in different octaves apart, a number is added to the name: C4 (also known " +
        "as middle C) is the note roughly in the middle of the keyboard, a handy place to start " +
        "learning.</p>",
    },
    "sharps-flats": {
      title: "Sharps and Flats",
      html:
        "<h3>Sharps and Flats</h3>" +
        "<p>The black keys on a piano are sharps (\u266f, a half step above the neighboring note) and flats (a " +
        "half step below). For example, the black key between C and D is C\u266f (C sharp) or D flat \u2014 the same " +
        "key, two different names depending on context.</p>" +
        "<p>Between C and the next C (an octave up) there are 12 half steps: 7 white keys and 5 black ones. " +
        "Notice that there's no black key between E and F, or between B and C \u2014 those pairs are already a " +
        "half step apart.</p>",
    },
    "keyboard-layout": {
      title: "The Piano Keyboard",
      html:
        "<h3>How the Keyboard Is Laid Out</h3>" +
        "<p>The black keys come in groups of two and three. The group of two black keys sits between C-D and " +
        "D-E. Right before that group of two, to its left, is the white key C.</p>" +
        "<p>This is the most reliable way to find C on any keyboard: look for a group of two black keys \u2014 " +
        "the white key just to its left is C.</p>",
    },
    "c-major-scale": {
      title: "The C Major Scale",
      html:
        "<h3>The C Major Scale</h3>" +
        "<p>The C major scale is the sequence C, D, E, F, G, A, B, C, played on the white keys only. It's " +
        "built from whole and half steps in this pattern: whole-whole-half-whole-whole-whole-half.</p>" +
        "<p>It's the easiest scale to start with, since it doesn't use any black keys. Try playing it in the " +
        "\u201cExercise\u201d section below \u2014 with either the right or left hand, using the correct fingering " +
        "(finger numbers).</p>",
    },
    "note-durations": {
      title: "Note Durations",
      html:
        "<h3>Note Durations</h3>" +
        "<p>Duration shows how long a note is held. A whole note is the longest; a half note lasts half as " +
        "long as a whole note; a quarter note is half a half note; an eighth note is half a quarter note.</p>" +
        "<p>Durations are counted relative to each other, not in seconds: the actual time depends on the " +
        "tempo (speed) of the performance, which the metronome sets.</p>",
    },
    "metronome-tempo": {
      title: "Metronome and Tempo",
      html:
        "<h3>Metronome and Tempo</h3>" +
        "<p>A metronome clicks out a steady pulse at a set speed \u2014 the tempo, measured in beats per minute " +
        "(BPM). The bigger the number, the faster the tempo.</p>" +
        "<p>Playing with a metronome helps you build a steady, even rhythm instead of speeding up or slowing " +
        "down without noticing. Try turning on the metronome in the demo and metronome controls and find a " +
        "comfortable tempo.</p>",
    },
  },
};
