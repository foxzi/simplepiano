// English translation package for src/constants/lessons/harmony.js.
// Format is described in docs/ru/I18N.md.

export const HARMONY_EN = {
  "tones-intervals": {
    title: "Whole steps, half steps, and intervals",
    summary:
      "What an interval is, how to count it by scale steps, and how many half steps it contains.",
    blocks: [
      "An interval is the distance between two notes. A half step is the nearest key; a whole " +
        "step skips one key. Intervals are named by the number of scale steps between notes, " +
        "but measured in half steps.",
      [
        "Unison \u2014 0 half steps, the same note.",
        "Second \u2014 a neighboring step: minor second is 1 half step, major second is 2 half " +
          "steps.",
        "Third \u2014 skips a step: minor third is 3 half steps, major third is 4 half steps.",
        "Fourth is 5 half steps, fifth is 7 half steps; sixth is 8 half steps (minor) or 9 half " +
          "steps (major); seventh is 10 half steps (minor) or 11 half steps (major).",
        "Octave \u2014 12 half steps, the same note repeated higher.",
      ],
      "The third is the most common interval in music, so it's important to tell its two kinds " +
        "apart by ear right away: the major third (4 half steps) sounds brighter, the minor " +
        "third (3 half steps) sounds darker and softer.",
      "Count the half steps directly on the keyboard, including the black keys: this is the " +
        "most reliable way to check an interval if you're not yet confident by ear.",
    ],
    practices: {
      "tone-half": {
        title: "Practice 1: alternating whole steps and half steps",
        instruction:
          "Play C, C\u266f, C, D, E, F, E, F\u266f \u2014 listen for where the step is a half " +
          "step and where it's a whole step.",
        doneText: "The alternating whole steps and half steps were played.",
      },
      "build-intervals": {
        title: "Practice 2: intervals from C",
        instruction:
          "Build three intervals from the note C: a major third, a fifth, and an octave.",
        chordNames: ["major third", "fifth", "octave"],
        doneText: "The three intervals from C were built correctly.",
      },
      "intervals-from-g": {
        title: "Practice 3: intervals from G",
        instruction:
          "From the note G, build a major third, a perfect fifth, and a major sixth.",
        chordNames: ["major third", "perfect fifth", "major sixth"],
        doneText: "The intervals from G were built correctly.",
      },
    },
  },

  "intervals-ear": {
    title: "Intervals by ear",
    summary: "How to recognize intervals through familiar tunes and check yourself by ear.",
    blocks: [
      "The easiest way to remember an interval is through a familiar tune that starts with " +
        "exactly that interval. The fifth is the first leap in \u201cTwinkle, Twinkle, Little " +
        "Star\u201d, the octave opens \u201cSomewhere Over the Rainbow\u201d, and the major " +
        "second is simply two neighboring scale steps, for example C and D.",
      [
        "Listen to the lower note first, then the higher one \u2014 that's the upward " +
          "direction of the interval.",
        "Compare what you hear with the reference tune, rather than guessing at random.",
        "If you're not sure, listen to the pair again a couple of times before answering.",
      ],
      "In the practice below, the app plays two notes in a row on its own: first the reference " +
        "note, then the second one. Your task is to play on the keyboard the second note you " +
        "heard.",
    ],
    practices: {
      "ear-basic": {
        title: "Practice 1: third, fifth, octave",
        instruction:
          "Listen to a pair of notes from the reference C and play the second note you heard: " +
          "it will be a third, a fifth, or an octave.",
        doneText: "The third, fifth, and octave are confidently recognized by ear.",
      },
      "ear-wide": {
        title: "Practice 2: more intervals",
        instruction:
          "Now the second, fourth, and sixth have been added \u2014 listen more carefully and " +
          "play the second note of each pair.",
        doneText: "The extended set of intervals is recognized by ear.",
      },
    },
  },

  triads: {
    title: "Major and minor triads",
    summary: "A triad as two stacked thirds, and the one-note difference between major and minor.",
    blocks: [
      "A triad is three notes taken a step apart: a third plus another third stacked on top. " +
        "This chord is the basic building block of harmony.",
      [
        "Major triad: a major third (4 half steps) on the bottom, a minor third (3 half steps) " +
          "on top.",
        "Minor triad: a minor third (3 half steps) on the bottom, a major third (4 half steps) " +
          "on top.",
        "By ear, major sounds brighter and more confident, minor sounds darker and softer.",
        "The difference between a major and a minor triad built on the same note is only in " +
          "the middle note of the chord.",
      ],
      "Play a major and a minor triad from the same note back to back and listen: only the " +
        "middle note changes, but the mood of the chord changes completely.",
    ],
    practices: {
      "major-triads": {
        title: "Practice 1: major triads",
        instruction: "Build and play three major triads: C major, F major, G major.",
        chordNames: ["C major", "F major", "G major"],
        doneText: "The three major triads were played correctly.",
      },
      "minor-triads": {
        title: "Practice 2: minor triads",
        instruction: "Build and play three minor triads: A minor, D minor, E minor.",
        chordNames: ["A minor", "D minor", "E minor"],
        doneText: "The three minor triads were played correctly.",
      },
      "major-minor": {
        title: "Practice 3: major and minor from the same note",
        instruction:
          "Compare the triad pairs by ear: C major and C minor, F major and F minor. Listen to " +
          "how the middle note changes.",
        chordNames: ["C major", "C minor", "F major", "F minor"],
        doneText: "The major-minor pairs were played and compared by ear.",
      },
    },
  },

  inversions: {
    title: "Chord inversions",
    summary: "Root position, first inversion, and second inversion of a triad, and why they matter.",
    blocks: [
      "An inversion is the same chord, only its lowest note has been moved up an octave. The " +
        "notes stay the same \u2014 only which one is on the bottom changes.",
      [
        "Root position: the tonic is on the bottom, the chord is built in thirds going up.",
        "First inversion: the third of the chord ends up on the bottom, the tonic moves to the " +
          "top.",
        "Second inversion: the fifth of the chord ends up on the bottom.",
      ],
      "Inversions let your hand jump around the keyboard less: neighboring chords in an " +
        "accompaniment are often connected through shared notes, choosing a suitable inversion " +
        "instead of the root position.",
    ],
    practices: {
      "c-inversions": {
        title: "Practice 1: inversions of C major",
        instruction:
          "Play C major in root position, first inversion, and second inversion, one after " +
          "another.",
        chordNames: ["root position", "first inversion", "second inversion"],
        doneText: "All three forms of C major were played correctly.",
      },
      "f-inversions": {
        title: "Practice 2: inversions of F major",
        instruction: "The same sequence of inversions, but for F major.",
        chordNames: ["root position", "first inversion", "second inversion"],
        doneText: "All three forms of F major were played correctly.",
      },
      smooth: {
        title: "Practice 3: smooth chord connections",
        instruction:
          "Play C major, then F major in second inversion, G major in first inversion, and C " +
          "major again \u2014 the hand barely moves between chords.",
        chordNames: [
          "C major",
          "F major (second inversion)",
          "G major (first inversion)",
          "C major",
        ],
        doneText: "The smooth chord progression was played without unnecessary hand jumps.",
      },
    },
  },

  cadence: {
    title: "The C, F, G chords and the I-IV-V-I progression",
    summary:
      "Scale degrees in Roman numerals, the three primary chords, and a complete cadential " +
      "progression.",
    blocks: [
      "Scale degrees are traditionally labeled with Roman numerals: I is the tonic, the main " +
        "point of rest; IV is the subdominant; V is the dominant, the most tense degree, which " +
        "pulls back toward the tonic.",
      [
        "A huge number of songs and pieces rest on the I, IV, and V triads.",
        "The I-IV-V-I progression sounds like a complete musical phrase, a question and an " +
          "answer.",
        "In the simplest version, the left hand can play just the root bass note \u2014 the " +
          "tonic of each chord.",
      ],
      "Play the progression first in root position, then in close position with inversions " +
        "\u2014 in the second case the hand barely moves, and the sound becomes smoother.",
    ],
    practices: {
      "three-chords": {
        title: "Practice 1: the I-IV-V-I progression",
        instruction:
          "Play C, F, G, and C again \u2014 the three primary chords of the key of C major.",
        chordNames: ["C (I)", "F (IV)", "G (V)", "C (I)"],
        doneText: "The I-IV-V-I progression was played in root position.",
      },
      "cadence-smooth": {
        title: "Practice 2: the same progression in close position",
        instruction:
          "Play the same progression, but with inversions, so the hand barely moves between " +
          "chords.",
        chordNames: ["C", "F/C", "G/B", "C"],
        doneText: "The progression was played in close position, without unnecessary jumps.",
      },
      "bass-chords": {
        title: "Practice 3: progression with bass in the left hand",
        instruction:
          "The left hand adds the root of the chord in the lower octave, the right hand plays " +
          "the triad on top.",
        chordNames: ["C with bass", "F with bass", "G with bass", "C with bass"],
        doneText: "The progression was played with both hands, with bass in the left hand.",
      },
    },
  },
};
