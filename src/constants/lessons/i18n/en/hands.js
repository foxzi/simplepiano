// English translation package for src/constants/lessons/hands.js.
// Format is described in docs/ru/I18N.md.

export const HANDS_EN = {
  "melody-bass": {
    title: "Melody on the right, bass and chords on the left",
    summary: "Splitting roles between the hands: the right hand leads the melody, the left holds the harmony.",
    blocks: [
      "In most pieces the hands play different roles. The right hand leads the melody — the " +
        "part a listener hums after hearing it once. The left hand holds the harmony — the " +
        "foundation that makes the melody sound right.",
      [
        "The simplest accompaniment is a single bass note on every strong beat of the bar.",
        "The next step is to take a whole triad in the left hand instead of a single note.",
        "The bass usually takes the tonic or another root degree of the chord the harmony is built on.",
        "The right hand keeps leading the melody, independent of whatever the left hand is doing.",
      ],
      "Learn this kind of texture one bar at a time: first the melody alone, then the " +
        "accompaniment alone, and only once both parts are firmly memorized, put the hands together.",
      "Don't try to play the whole verse with both hands right away. One bar played cleanly " +
        "and confidently is worth more than the whole verse played raggedly.",
    ],
    practices: {
      "bass-note": {
        title: "Practice 1: bass and melody note",
        instruction:
          "The left hand holds C3 on every beat, while the right hand takes a melody note at " +
          "the same time. Play each pair of notes together.",
        doneText: "Bass and melody played together on all four beats.",
      },
      "bass-triad": {
        title: "Practice 2: bass and triad on the left",
        instruction:
          "Now the left hand takes not just a single note but the bass together with a triad. " +
          "Listen to how the harmony becomes thicker and more solid.",
        doneText: "Bass and triad played together on all four chords.",
      },
      "twinkle-accomp": {
        title: "Practice 3: 'Twinkle' with a bass part",
        instruction:
          "The opening of 'Twinkle, Twinkle, Little Star' with accompaniment: under the note A " +
          "the bass moves to F, and holds C the rest of the time.",
        doneText: "'Twinkle' with a bass accompaniment played correctly.",
      },
    },
  },

  "both-hands": {
    title: "Playing hands together and your first pieces",
    summary: "How to bring the hands together without losing the rhythm, and work through a first short piece.",
    blocks: [
      "The main difficulty of playing hands together isn't finger strength or reach — it's " +
        "independence: each hand has to do its own job without getting thrown off by the other.",
      [
        "A proven approach: first each hand alone at the piece's tempo, then both together very slowly.",
        "Count the beats out loud — this keeps both hands on the same pulse even if the fingers get confused.",
        "Look at the sheet music, not at your hands: your hands will find the keys over time, " +
          "but your eyes need to keep leading forward.",
        "Work through the piece not as a whole, but in phrases of two to four bars, securing each before the next.",
      ],
      { caption: "The opening of 'Ode to Joy': E, E, F, G, G, F, E, D." },
      "If a bar just won't come together, slow down even more — down to one note per second. " +
        "The speed will come back on its own once the hands stop getting in each other's way.",
    ],
    practices: {
      "octave-scale": {
        title: "Practice 1: scale in octaves with both hands",
        instruction: "Play the start of the C major scale with both hands at once, an octave apart.",
        doneText: "The scale in octaves played with both hands in sync.",
      },
      "ode-hands": {
        title: "Practice 2: 'Ode to Joy' with both hands",
        instruction:
          "The melody sounds the whole time in the right hand, while the bass in the left hand " +
          "only enters on the first and fifth notes of the phrase — on the strong beats.",
        doneText: "'Ode to Joy' played with both hands, with the bass on the strong beats.",
      },
      "piece-twinkle": {
        title: "Practice 3: the whole of 'Twinkle, Twinkle, Little Star'",
        instruction: "Play the whole first phrase of 'Twinkle' with one hand, keeping the note durations exact.",
        doneText: "The first phrase of 'Twinkle' played from start to finish.",
      },
    },
  },

  "sight-reading": {
    title: "Sight-reading and playing without hints",
    summary: "The skill of playing unfamiliar music right away, without stopping or looking at your hands.",
    blocks: [
      "Sight-reading is the ability to play unfamiliar sheet music right away, with no prior " +
        "preparation, without stopping and without going back, even if an inaccuracy has crept in somewhere.",
      [
        "Before you play, look at the key signature and time signature — they set the frame for everything that follows.",
        "Pick a tempo deliberately slower than you think you need: slow and even beats fast and ragged.",
        "If you make a mistake, don't stop and don't go back — keep moving forward with the pulse.",
        "Keep your eyes one or two notes ahead of the one you're playing right now.",
      ],
      "In this lesson's practices, key highlighting is turned off — just like in real " +
        "sight-reading. Rely on the sheet music, not on hints on the keyboard.",
    ],
    practices: {
      "sight-1": {
        title: "Practice 1: melody in the treble clef",
        instruction: "Play from the sheet music without looking at the keyboard ahead of time. There will be no key hints.",
        doneText: "The melody sight-read with no hints.",
      },
      "sight-2": {
        title: "Practice 2: melody in the bass clef",
        instruction: "Same idea, but in the bass clef — read the notes one at a time, forward, with no going back.",
        doneText: "The line in the bass clef sight-read.",
      },
      "sight-3": {
        title: "Practice 3: a longer phrase",
        instruction: "The phrase is longer and requires looking a couple of notes ahead to keep the tempo.",
        doneText: "The long phrase sight-read without stopping.",
      },
    },
  },

  "tempo-work": {
    title: "Tempo: holding it and building it up",
    summary: "Why playing slowly is useful, and how to raise the tempo correctly without losing accuracy.",
    blocks: [
      "Playing slowly isn't just about not making mistakes. The brain memorizes the movement " +
        "itself, not the speed: if the movement is learned correctly, speed builds up almost by itself.",
      [
        "The rule for raising tempo: add 4-8 beats per minute, and only after three clean run-throughs.",
        "A clean run-through means not a single mistake and no loss of evenness from start to finish.",
        "If mistakes appear at the new tempo, go back to the previous one and secure it again.",
        "Evenness of the pulse matters more than raw speed: better to play evenly at 80 than jerkily at 120.",
      ],
      "In the tasks below, the metronome must be set within the given BPM range, or the notes " +
        "played won't count, even if they're played correctly.",
    ],
    practices: {
      "tempo-60": {
        title: "Practice 1: scale at a slow tempo",
        instruction:
          "Set the metronome to 56-72 BPM and play the C major scale going up, one note per click.",
        startHint: "Set the tempo to 56-72 BPM, then press 'Start'.",
        doneText: "The scale played evenly at a slow tempo.",
      },
      "tempo-80": {
        title: "Practice 2: scale at a medium tempo",
        instruction:
          "Set the metronome to 76-92 BPM and play the C major scale up and down, one note per click.",
        startHint: "Set the tempo to 76-92 BPM, then press 'Start'.",
        doneText: "The scale played evenly at a medium tempo.",
      },
      "tempo-100": {
        title: "Practice 3: scale at a fast tempo",
        instruction:
          "Set the metronome to 96-120 BPM and play the same scale up and down without losing evenness.",
        startHint: "Set the tempo to 96-120 BPM, then press 'Start'.",
        doneText: "The scale played evenly at a fast tempo.",
      },
    },
  },
};
