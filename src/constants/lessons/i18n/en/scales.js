// English translation package for src/constants/lessons/scales.js.
// Format is described in docs/ru/I18N.md.

export const SCALES_EN = {
  "c-major": {
    title: "The C major scale, two hands",
    summary:
      "Fingering for the C major scale in the right and left hand, playing both hands in octaves.",
    blocks: [
      "A scale is the seven steps of a key played in a row, plus an eighth note that repeats " +
        "the tonic an octave higher. C major is the simplest scale: all seven steps fall on " +
        "white keys.",
      [
        "Right-hand fingering: 1-2-3-1-2-3-4-5 — the thumb tucks under right after finger 3 " +
          "on E.",
        "Left-hand fingering: 5-4-3-2-1-3-2-1 — finger 3 crosses over the thumb after G.",
        "Play the scale evenly, without jerks or speeding up during the thumb tuck or the " +
          "finger crossing.",
        "When playing with both hands, the left hand sounds an octave lower than the right — " +
          "that's the standard arrangement.",
      ],
      "Tucking the thumb under and crossing finger 3 over it isn't a mechanical trick — it's " +
        "how you play the scale without pauses or a jump of the hand. Practice both movements " +
        "separately, at a slow tempo.",
      {
        caption: "The C major scale going up: C, D, E, F, G, A, B, C.",
      },
    ],
    practices: {
      "c-right": {
        title: "Practice 1: right hand",
        instruction:
          "Play the C major scale with your right hand, up and down. Finger numbers are " +
          "labeled on the keys: 1-2-3-1-2-3-4-5 going up and 5-4-3-2-1-3-2-1 coming down.",
        doneText: "The right hand played the C major scale up and down.",
      },
      "c-left": {
        title: "Practice 2: left hand",
        instruction:
          "The same scale with your left hand, an octave lower. Fingering: 5-4-3-2-1-3-2-1 " +
          "going up and 1-2-3-1-2-3-4-5 coming down.",
        doneText: "The left hand played the C major scale up and down.",
      },
      "c-both": {
        title: "Practice 3: both hands in octaves",
        instruction:
          "Play the scale with both hands at once, in octaves: each pair of notes is the left " +
          "and right hand on the same step. With the mouse you can take a pair quickly one " +
          "after the other; on a MIDI keyboard, play them exactly together.",
        doneText: "The scale was played with both hands in octaves, from tonic to tonic.",
      },
    },
  },

  accidentals: {
    title: "Sharps and flats",
    summary: "Half steps and whole steps, sharps and flats, and enharmonic black keys.",
    blocks: [
      "A half step is the distance to the very next key, whether white or black. A whole step " +
        "is two half steps in a row. Every interval in music ultimately builds from these two " +
        "building blocks.",
      [
        "A sharp (\u266f) raises a note by a half step — you take the nearest key to the right.",
        "A flat (\u266d) lowers a note by a half step — you take the nearest key to the left.",
        "Every black key has two names: F\u266f and G\u266d — it's the same key, an enharmonic " +
          "pair.",
        "A natural (\u266e) cancels a sharp or flat, returning a note to its plain form.",
      ],
      "A sharp or flat placed in the key signature applies to the whole piece, while one " +
        "placed right before a note in a bar applies only until the end of that bar.",
    ],
    practices: {
      "black-keys": {
        title: "Practice 1: all the black keys of an octave",
        instruction: "Find and play all five black keys of one octave. Order doesn't matter.",
        doneText: "All five black keys of the octave found.",
      },
      chromatic: {
        title: "Practice 2: a chromatic run",
        instruction:
          "Play every key in a row from C to F\u266f without skipping any — the step is " +
          "always a half step.",
        doneText: "The chromatic run was played without skipping any keys.",
      },
      "sharp-flat": {
        title: "Practice 3: sharp and flat side by side",
        instruction:
          "Play F, F\u266f, G, F\u266f, F, E\u266d, D. Notice that E\u266d and D\u266f are the " +
          "same key.",
        doneText: "The sharps and flats around F and D were played correctly.",
      },
    },
  },

  "g-f-major": {
    title: "The G major and F major scales",
    summary:
      "How a major scale is built from whole and half steps, using G major and F major as " +
      "examples.",
    blocks: [
      "Every major scale is built from the same formula of steps: whole, whole, half, whole, " +
        "whole, whole, half. It's exactly this sequence that gives the recognizable major " +
        "sound.",
      [
        "G major: the formula requires one sharp — F\u266f — everything else is played on " +
          "white keys.",
        "F major: the formula requires one flat — B\u266d — everything else is played on white " +
          "keys.",
        "The right-hand fingering in G major is the same as in C major: 1-2-3-1-2-3-4-5.",
        "The right-hand fingering in F major is different: 1-2-3-4-1-2-3-4.",
      ],
      "Before you play the scale, find the required accidental on the keyboard and memorize it " +
        "separately: in G major it's F\u266f, in F major it's B\u266d. Everything else matches " +
        "C major.",
      {
        caption: "The G major scale: G, A, B, C, D, E, F\u266f, G.",
      },
    ],
    practices: {
      "g-scale": {
        title: "Practice 1: the G major scale",
        instruction:
          "Play the G major scale up and down. The fingering is the same as in C major: " +
          "1-2-3-1-2-3-4-5.",
        doneText: "The G major scale was played up and down.",
      },
      "f-scale": {
        title: "Practice 2: the F major scale",
        instruction:
          "Play the F major scale up and down. Here the fingering is different: " +
          "1-2-3-4-1-2-3-4.",
        doneText: "The F major scale was played up and down.",
      },
      "key-signs": {
        title: "Practice 3: find the key signature accidentals",
        instruction:
          "Find B\u266d and F\u266f — these are the very accidentals that set F major and G " +
          "major apart from C major.",
        doneText: "Both key signature accidentals were found.",
      },
    },
  },

  "more-scales": {
    title: "D major and the rest of the major scales",
    summary:
      "The major formula in half steps, the circle of fifths, and building any major scale.",
    blocks: [
      "A major scale can be built starting from any note if you know the formula of steps in " +
        "half steps: 2-2-1-2-2-2-1. It's the same whole-whole-half-whole-whole-whole-half " +
        "formula, just written as numbers.",
      [
        "Circle of fifths: the next key clockwise is a fifth higher, with one more sharp.",
        "Counterclockwise, keys go down by fifths and add one more flat each time.",
        "Sharps always appear in the same order: F, C, G, D, A, E, B.",
        "D major is second in this order and has two sharps: F\u266f and C\u266f.",
      ],
      [
        "C major \u2014 no accidentals.",
        "G major \u2014 one sharp (F\u266f).",
        "D major \u2014 two sharps (F\u266f, C\u266f).",
        "A major \u2014 three sharps (F\u266f, C\u266f, G\u266f).",
        "F major \u2014 one flat (B\u266d).",
        "B-flat major \u2014 two flats (B\u266d, E\u266d).",
      ],
      "The formula 2-2-1-2-2-2-1 can be applied starting from any note: count the half steps " +
        "on the keyboard and you'll get a correct major scale, even if you don't remember that " +
        "key's accidentals by heart.",
    ],
    practices: {
      "d-scale": {
        title: "Practice 1: the D major scale",
        instruction:
          "Play the D major scale up and down, using two sharps: F\u266f and C\u266f.",
        doneText: "The D major scale was played up and down.",
      },
      "a-scale": {
        title: "Practice 2: the A major scale on your own",
        instruction:
          "Build and play the A major scale using the 2-2-1-2-2-2-1 formula, with no hints on " +
          "the keyboard.",
        doneText: "The A major scale was built and played correctly.",
      },
      "bb-scale": {
        title: "Practice 3: the B-flat major scale on your own",
        instruction:
          "Build and play the B-flat major scale using the same formula, with no hints on the " +
          "keyboard.",
        doneText: "The B-flat major scale was built and played correctly.",
      },
    },
  },
};
