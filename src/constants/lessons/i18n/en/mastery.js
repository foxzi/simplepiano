// English translation package for src/constants/lessons/mastery.js.
// Format is described in docs/ru/I18N.md.

export const MASTERY_EN = {
  "minor-scales": {
    title: "Minor scales",
    summary: "The three forms of minor and the relative key to C major.",
    blocks: [
      "Minor has three forms: natural, harmonic, and melodic. All three are built from the " +
        "same tonic, but differ in one or two scale degrees.",
      [
        "A minor is the relative key to C major: the same keys, but now centered on the note " +
          "A.",
        "The natural minor uses exactly the same seven scale degrees as the relative major.",
        "In harmonic minor the 7th degree is raised by a half step - in A minor that's G\u266f " +
          "instead of G.",
        "The raised 7th degree creates the characteristic 'exotic' step between the 6th and " +
          "7th degrees.",
      ],
      "Play the natural and harmonic minor from the same note back to back and listen to the " +
        "difference: only one note changes, yet the color of the scale becomes completely " +
        "different.",
    ],
    practices: {
      "a-natural": {
        title: "Practice 1: A minor natural",
        instruction:
          "Play the natural A minor scale up and down - the same keys as C major.",
        doneText: "The natural A minor scale was played up and down.",
      },
      "a-harmonic": {
        title: "Practice 2: A minor harmonic",
        instruction:
          "The same scale, but with the raised seventh degree - G\u266f. Listen for the " +
          "characteristic step right before the upper tonic.",
        doneText: "The harmonic A minor scale was played with the raised 7th degree.",
      },
      "d-minor": {
        title: "Practice 3: D minor natural",
        instruction:
          "Play the natural D minor scale going up, with no hints on the keyboard.",
        doneText: "The natural D minor scale was played with no hints.",
      },
    },
  },

  arpeggios: {
    title: "Arpeggios",
    summary: "A chord broken into individual notes, and the basic fingering for it.",
    blocks: [
      "An arpeggio is a chord whose notes are played not together but one after another, in " +
        "sequence. This texture sounds like a wave and often serves as accompaniment in the " +
        "left hand.",
      [
        "The standard right-hand fingering for an arpeggio going up is 1-2-3-5.",
        "The hand leads the arm along the keyboard, while the elbow follows smoothly and " +
          "unobtrusively.",
        "There should be no jerks between the notes of an arpeggio - the transition from " +
          "finger to finger is smooth, without jolts.",
        "A broken chord in the left hand is one of the most common types of accompaniment in " +
          "easy repertoire.",
      ],
      "Play the arpeggio very slowly, checking that each finger lands on the key without " +
        "tension in the wrist. Speed will come once the movement becomes free.",
    ],
    practices: {
      "c-arp": {
        title: "Practice 1: C major arpeggio",
        instruction:
          "Play the broken C major triad up and down using the fingering 1-2-3-5.",
        doneText: "The C major arpeggio was played up and down.",
      },
      "f-g-arp": {
        title: "Practice 2: F major and G major arpeggios",
        instruction:
          "Play two arpeggios in a row: first F major, then G major, each up and down.",
        doneText: "Both arpeggios were played in a row, up and down.",
      },
      "bass-arp": {
        title: "Practice 3: bass note and broken chord",
        instruction:
          "The first note is a supporting bass note in the left hand, followed by a broken " +
          "triad in the right hand going up and down.",
        doneText: "The bass note and broken chord were played as one phrase.",
      },
    },
  },

  "complex-rhythm": {
    title: "More complex rhythms",
    summary: "Dotted rhythm, syncopation, and counting in eighth notes.",
    blocks: [
      "A dotted rhythm is a dotted quarter note (one and a half beats) plus an eighth note " +
        "(half a beat): the dot lengthens the note by half of its duration, and the " +
        "following short note fills out the rest of the beat.",
      [
        "Syncopation is an accent shifted onto a weak beat or the weak half of a beat, rather " +
          "than the strong one.",
        "A handy trick for both rhythms: count in eighth notes - 'one-and-two-and-three-and-" +
          "four-and'.",
        "It helps to set the metronome twice as fast and count each click as a single eighth " +
          "note.",
        "A pickup (anacrusis) is an incomplete bar before the first full beat, from which a " +
          "phrase sometimes begins.",
      ],
      "Before playing a dotted rhythm or syncopation on the instrument, clap the rhythm and " +
        "say the count out loud in eighth notes - that way the pattern settles in your head " +
        "before your fingers get involved.",
    ],
    practices: {
      dotted: {
        title: "Practice 1: dotted rhythm",
        instruction:
          "Set the metronome to 100-130 and count each click as a single eighth note. The " +
          "pattern: a dotted quarter and an eighth note, twice in a row.",
        startHint: "Set the tempo to 100-130 BPM, then press 'Start'.",
        doneText: "The dotted rhythm was played correctly twice in a row.",
      },
      syncope: {
        title: "Practice 2: syncopation",
        instruction:
          "Metronome 100-130, each click is an eighth note. The second note enters on a weak " +
          "eighth beat, shifted away from the strong beat of the bar.",
        startHint: "Set the tempo to 100-130 BPM, then press 'Start'.",
        doneText: "The syncopated pattern was played correctly.",
      },
      "mixed-rhythm": {
        title: "Practice 3: mixed rhythm",
        instruction:
          "Metronome 100-130, each click is an eighth note. Quarter notes and eighth notes " +
          "alternate here - count carefully to tell which note is long and which is short.",
        startHint: "Set the tempo to 100-130 BPM, then press 'Start'.",
        doneText: "The mixed rhythm of quarter and eighth notes was played correctly.",
      },
    },
  },

  dynamics: {
    title: "Dynamics and expression",
    summary: "Loudness markings, crescendo and diminuendo, and the breath of a musical phrase.",
    blocks: [
      "Dynamics is the loudness of the sound. The main markings are: p (piano, quiet), mp " +
        "(mezzo-piano, moderately quiet), mf (mezzo-forte, moderately loud), f (forte, loud).",
      [
        "Crescendo is a gradual increase in loudness, diminuendo is a gradual fading.",
        "The loudness of a piano note depends on the speed of the finger's motion toward the " +
          "key, not on how hard you press.",
        "A musical phrase usually 'breathes': it grows louder toward its peak and softer " +
          "toward the end.",
        "Dynamics should be planned in advance rather than added at random while you play.",
      ],
      {
        text: "Listen to the same phrase at different volumes and with different dynamic shapes.",
        labels: ["Quiet (p)", "Loud (f)", "Crescendo"],
      },
    ],
    practices: {
      crescendo: {
        title: "Practice 1: playing with a build-up",
        instruction:
          "Play the scale going up with a crescendo: start very quietly and gradually " +
          "increase the volume toward the top note. The app doesn't measure dynamics - " +
          "listen to yourself.",
        doneText: "The scale was played with a gradual increase in loudness.",
      },
      diminuendo: {
        title: "Practice 2: playing with a fade-out",
        instruction:
          "Play the scale going down with a diminuendo: start loud and gradually fade toward " +
          "the bottom note. The app doesn't measure dynamics - listen to yourself.",
        doneText: "The scale was played with a gradual decrease in loudness.",
      },
      phrase: {
        title: "Practice 3: a phrase with a peak",
        instruction:
          "Play the broken triad with a peak on the top C: build toward the peak, then fade " +
          "toward the end of the phrase. The app doesn't measure dynamics - listen to " +
          "yourself.",
        doneText: "The phrase was played with a volume peak on the top note.",
      },
    },
  },

  pedal: {
    title: "The pedal",
    summary: "The sustain pedal, delayed pedaling, and connecting sound without it.",
    blocks: [
      "The sustain pedal lifts the dampers off the strings, and the sound keeps ringing after " +
        "the key has been released. This lets you connect notes that the fingers physically " +
        "cannot hold together.",
      [
        "The main rule is delayed pedaling: press it right AFTER taking the new harmony, not " +
          "before.",
        "If you press the pedal too early, the old and new harmony will blend and sound muddy.",
        "The cleanliness of the pedaling should be checked by ear at every change of harmony, " +
          "not by feel in the foot.",
        "The on-screen keyboard has no pedal, so here we train connected sound with the " +
          "fingers instead - legato.",
      ],
      {
        text: "Compare the same chord progression without the pedal and with the pedal.",
        labels: ["Without pedal", "With pedal"],
      },
    ],
    practices: {
      "legato-chords": {
        title: "Practice 1: a connected change of harmony",
        instruction:
          "Play four chords in a row, trying to connect them with your fingers as smoothly " +
          "as possible - the way the pedal does on a real instrument.",
        doneText: "The change of harmony was played smoothly, with no abrupt breaks.",
      },
      "pedal-arp": {
        title: "Practice 2: a wide arpeggio",
        instruction:
          "Play a wide broken triad from bottom to top. On a real instrument this kind of " +
          "passage is usually held with a single pedal all the way to the end.",
        doneText: "The wide arpeggio was played from the bass note to the top note.",
      },
    },
  },

  "final-pieces": {
    title: "Final pieces",
    summary: "What it means to have learned a piece, and where to go after this program.",
    blocks: [
      "A piece can be considered learned when it's played at a steady tempo, from beginning " +
        "to end, without stopping - confidently from the score or already from memory.",
      [
        "Before performing, it helps to play through the whole piece at a slower tempo, " +
          "without a single stop.",
        "Record yourself on a voice recorder or on video - from the outside, mistakes in " +
          "tempo and dynamics are easier to hear.",
        "After this program, keep moving forward: collections of pieces for beginners, new " +
          "keys, ensemble playing.",
        "Learning new pieces will go faster if you keep regularly reviewing the scales you've " +
          "already covered.",
      ],
      { caption: "'Ode to Joy' in full - the program's final piece." },
    ],
    practices: {
      "ode-full": {
        title: "Practice 1: 'Ode to Joy' in full",
        instruction:
          "Play the whole piece from beginning to end from the score, with no hints on the " +
          "keyboard.",
        doneText: "'Ode to Joy' was played in full with no hints.",
      },
      "ode-tempo": {
        title: "Practice 2: the same piece in tempo",
        instruction:
          "Set the metronome to 66-96 BPM and play the piece evenly, on the clicks, from " +
          "beginning to end.",
        startHint: "Set the tempo to 66-96 BPM, then press 'Start'.",
        doneText: "The piece was played evenly at the given tempo.",
      },
      "twinkle-final": {
        title: "Practice 3: 'Twinkle' with both hands",
        instruction:
          "Play 'Twinkle, Twinkle, Little Star' with both hands: the bass in the left hand " +
          "enters only on strong beats, while the rest of the melody is played with the " +
          "right hand alone.",
        doneText: "'Twinkle' was played with both hands, with the bass on strong beats.",
      },
    },
  },
};
