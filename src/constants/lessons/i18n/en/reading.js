// English translation package for src/constants/lessons/reading.js.
// Format is described in docs/ru/I18N.md.

export const READING_EN = {
  "note-values": {
    title: "Quarter, half, and whole notes",
    summary: "Note durations: quarter, half, and whole notes, and how to count them.",
    blocks: [
      "A beat is a unit of time in music — the same click you hear from a metronome. A quarter " +
        "note lasts exactly one beat: play it, and on the very next beat you can take another " +
        "note.",
      [
        "A quarter note has a filled-in notehead with a stem and lasts one beat.",
        "A half note has an open (white) notehead with a stem and lasts two beats.",
        "A whole note has an open notehead with no stem and lasts four beats.",
        "The longer the note, the longer you need to hold the key down before taking the next " +
          "one.",
      ],
      "A handy way to count out loud is: 'one-and-two-and-three-and-four-and', where each " +
        "number lands on one beat. A long note simply spans several of these counts in a row, " +
        "with nothing new sounding in between.",
      { caption: "A bar of four quarter notes: C, D, E, F — one note per beat." },
      "If you're not sure how long to hold a note, count the beats out loud and release the " +
        "key exactly on the count when the next note should begin.",
    ],
    practices: {
      quarters: {
        title: "Practice 1: quarter notes only",
        instruction:
          "Set the tempo to 60-80 BPM. Every metronome click is one quarter note: one beat, " +
          "one click.",
        startHint: "Start the metronome, then press 'Start'.",
        doneText: "Eight quarter notes played exactly on the clicks.",
      },
      halves: {
        title: "Practice 2: half notes",
        instruction:
          "Each note now lasts two beats — hold the key down for two clicks in a row, and take " +
          "the next note exactly on the third click.",
        startHint: "Start the metronome, then press 'Start'.",
        doneText: "Half notes held correctly.",
      },
      whole: {
        title: "Practice 3: whole note",
        instruction:
          "The first note lasts a full four beats — hold it through all four clicks. Next come " +
          "two half notes, and then another whole note for four clicks.",
        startHint: "Start the metronome, then press 'Start'.",
        doneText: "The whole note held correctly, with no confusion between durations.",
      },
    },
  },

  "eighths-rests": {
    title: "Eighth notes and rests",
    summary: "Eighth-note durations and rests — silence that also needs to be counted.",
    blocks: [
      "An eighth note is half as long as a quarter note — it takes up half a beat. Two eighth " +
        "notes exactly fill one beat, so it's handy to count them as 'one-and', where 'one' " +
        "and 'and' are the first and second half of the beat.",
      [
        "Eighth notes are written with a flag on the stem; a run of them is joined by a shared " +
          "beam.",
        "A practical trick: set the metronome twice as fast and count every click as one " +
          "eighth note.",
        "A rest is a symbol that means silence lasting the same duration as the matching note.",
        "A quarter rest looks like a squiggle; an eighth rest looks like a small flag with a " +
          "hook.",
      ],
      "A rest matters just as much as a note: if you skip a rest and come in early, the rhythm " +
        "of the phrase falls apart completely, even if the notes themselves are played " +
        "correctly.",
      { caption: "A quarter note, a quarter rest, two eighth notes, and another quarter note." },
    ],
    practices: {
      "eighth-run": {
        title: "Practice 1: running eighth notes",
        instruction:
          "Set the tempo to 100-120 and count every click as one eighth note — that way each " +
          "note lands exactly on its click.",
        startHint: "Start the metronome, then press 'Start'.",
        doneText: "Eight eighth notes played evenly, one per click.",
      },
      "with-rests": {
        title: "Practice 2: notes separated by rests",
        instruction:
          "After every note comes a quarter rest: release the key and wait one click in " +
          "silence before taking the next note.",
        startHint: "Start the metronome, then press 'Start'.",
        doneText: "Rests held correctly, with no notes overlapping.",
      },
      mixed: {
        title: "Practice 3: notes and rests mixed together",
        instruction:
          "Here rests don't follow every note, but every other one — count the beats " +
          "carefully so you don't come in too early.",
        startHint: "Start the metronome, then press 'Start'.",
        doneText: "The mixed pattern of notes and rests played correctly.",
      },
    },
  },

  "staff-treble": {
    title: "The staff and the treble clef",
    summary: "Five lines, the spaces between them, and the treble clef as a reference point.",
    blocks: [
      "The staff is five horizontal lines with four spaces between them. Lines and spaces are " +
        "numbered from the bottom up: the first line is the lowest, the fifth is the highest.",
      "The lines alone don't tell you anything about pitch — you need a clef to set the " +
        "reference point. The treble clef curls around the second line from the bottom, which " +
        "is the note G4.",
      [
        "From bottom to top, the lines are: E, G, B, D, F.",
        "From bottom to top, the spaces are: F, A, C, E.",
        "Middle C sits on a ledger line just below the staff — a short line drawn only for " +
          "that note.",
      ],
      { caption: "The notes on the lines: E, G, B, D, F." },
      { caption: "The notes in the spaces: F, A, C, E." },
    ],
    practices: {
      lines: {
        title: "Practice 1: notes on the lines",
        instruction:
          "Play, in order, the five notes that sit right on the lines: E, G, B, D, F.",
        doneText: "All the notes on the lines played in order.",
      },
      spaces: {
        title: "Practice 2: notes in the spaces",
        instruction:
          "Play, in order, the four notes from the spaces between the lines: F, A, C, E.",
        doneText: "All the notes in the spaces played in order.",
      },
      "middle-c": {
        title: "Practice 3: starting from middle C",
        instruction:
          "Play five notes in a row, starting from middle C on the ledger line: C, D, E, F, G.",
        doneText: "Five notes from middle C played correctly.",
      },
    },
  },

  "read-right": {
    title: "Reading notes with the right hand",
    summary: "How to read a melody by the motion of the notes, not letter by letter.",
    blocks: [
      "Experienced musicians don't read notes one letter at a time — they see motion: a note " +
        "sits higher, lower, or at the same level as the one before it, and the hand finds the " +
        "right key on its own.",
      [
        "A step is a neighboring note — one line higher or lower, or from a line to the " +
          "adjacent space.",
        "A skip jumps over a note — a wider, more noticeable move to the eye.",
        "It's worth memorizing the anchor notes C, G, and F precisely — the neighboring notes " +
          "are easy to work out from them.",
      ],
      "Look not at the note you're playing right now, but at the next one — that way your " +
        "fingers have time to get ready in advance, and the playing doesn't stall.",
      "Don't hunt for keys with your eyes. Your hand should remember where the fingers sit on " +
        "the keyboard, while your eyes stay on the notes the whole time.",
      { caption: "C — a skip to E — a step to D — a skip to F — a step to E — a skip to G." },
    ],
    practices: {
      "read-1": {
        title: "Practice 1: steps and skips",
        instruction:
          "Read and play the melody from the notes, following the motion up and down.",
        doneText: "The melody of steps and skips played correctly.",
      },
      "read-2": {
        title: "Practice 2: without hints",
        instruction:
          "The keys are no longer highlighted — read the notes on your own and play them in " +
          "order.",
        doneText: "The melody played from the notes with no hints.",
      },
      "read-ode": {
        title: "Practice 3: 'Ode to Joy'",
        instruction:
          "This is the opening of Beethoven's theme from the Ninth Symphony. Read and play the " +
          "phrase from the notes.",
        doneText: "The opening of 'Ode to Joy' played from the notes.",
      },
    },
  },

  "staff-bass": {
    title: "The bass clef and reading with the left hand",
    summary: "The bass clef for low pitches and the left-hand part.",
    blocks: [
      "The bass clef is used for low pitches — usually the left-hand part. It also sets a " +
        "reference point: its two dots sit on either side of the fourth line, and that line is " +
        "F3.",
      [
        "From bottom to top, the lines are: G, B, D, F, A.",
        "From bottom to top, the spaces are: A, C, E, G.",
        "Middle C sits on a ledger line above the bass staff — the very same spot where the " +
          "treble clef's ledger line ends: it's the one note where both clefs meet.",
      ],
      "On the on-screen keyboard, the lowest octave starts exactly at C3 — the very note that " +
        "sits in the second space from the bottom of the bass staff.",
      { caption: "The C scale from C3 in the bass clef: C, D, E, F, G." },
    ],
    practices: {
      "bass-names": {
        title: "Practice 1: the scale in the bass clef",
        instruction: "Play, in order, five notes starting from C3: C, D, E, F, G.",
        doneText: "The bass-clef scale played going up.",
      },
      "bass-down": {
        title: "Practice 2: the scale going down",
        instruction: "Now play the same five notes in reverse order: G, F, E, D, C.",
        doneText: "The bass-clef scale played going down.",
      },
      "bass-melody": {
        title: "Practice 3: a melody with the left hand",
        instruction:
          "Read and play a short melody in the bass clef with no hints on the keyboard.",
        doneText: "The bass-clef melody played from the notes.",
      },
    },
  },

  "read-melodies": {
    title: "Simple melodies from notation",
    summary:
      "How to work through an unfamiliar melody step by step: from studying it visually to " +
      "playing it up to tempo.",
    blocks: [
      "You shouldn't jump straight into playing a new melody up to tempo. There's a reliable " +
        "order for working through it that saves time and eliminates most mistakes before your " +
        "hands even touch the keys.",
      [
        "First read the notes with your eyes, without playing: spot the steps, the skips, and " +
          "any repeated phrases.",
        "Play the melody very slowly, without a metronome, focusing on getting the notes right.",
        "Turn on the metronome at a slow tempo and play with an even rhythm.",
        "Only after that gradually increase the tempo to the target speed.",
      ],
      "Many melodies are built on repetition: one phrase sounds twice in a row, or comes back " +
        "later with a small change. Once you notice the repeat, you effectively learn the " +
        "phrase once instead of twice.",
      "The 'Listen' button plays a recording of the exercise at the current metronome tempo — " +
        "check yourself against it if you're not sure you've read the rhythm correctly.",
      { caption: "The first phrase of 'Twinkle, Twinkle, Little Star'." },
    ],
    practices: {
      "twinkle-a": {
        title: "Practice 1: the first phrase of 'Twinkle'",
        instruction: "Play the first phrase of 'Twinkle, Twinkle, Little Star' from the notes.",
        doneText: "The first phrase of 'Twinkle' played correctly.",
      },
      "twinkle-b": {
        title: "Practice 2: the second phrase of 'Twinkle'",
        instruction: "Play the second phrase of the same melody from the notes.",
        doneText: "The second phrase of 'Twinkle' played correctly.",
      },
      "twinkle-rhythm": {
        title: "Practice 3: the whole melody with the metronome",
        instruction:
          "Set the tempo to 60-80 BPM and play the whole of 'Twinkle, Twinkle, Little Star' " +
          "from start to finish, landing exactly on the metronome clicks.",
        startHint: "Start the metronome, then press 'Start'.",
        doneText:
          "'Twinkle, Twinkle, Little Star' played all the way through with the metronome.",
      },
    },
  },
};
