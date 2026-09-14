// English translation package for src/constants/lessons/basics.js.
// Format is described in docs/ru/I18N.md.

export const BASICS_EN = {
  "keyboard-tour": {
    title: "Meet the keyboard",
    summary: "How the white and black keys are arranged, and why the pattern repeats.",
    blocks: [
      "The piano keyboard looks endless only at first glance. In reality it's the same small " +
        "pattern, repeated many times from left to right.",
      [
        "The white keys run one after another, with no gaps.",
        "The black keys are grouped in twos and threes.",
        "A group of two and a group of three alternate — that's the repeating pattern.",
        "The further right a key is, the higher its pitch; the further left, the lower.",
      ],
      "Find any group of two black keys with your eyes. The white key right before it is C. " +
        "From that C to the next C, before the next group of two black keys, there are always " +
        "seven white keys in a row: C, D, E, F, G, A, B. This pattern is what all further " +
        "orientation on the keyboard relies on.",
      "Sit so your forearms are roughly parallel to the floor and your fingers are rounded, as " +
        "if holding a ball. Press the key with the pad of your finger, not the nail.",
    ],
    practices: {
      explore: {
        title: "Practice: explore the keyboard by ear",
        instruction:
          "Press eight different keys — with the mouse, a finger on the screen, or a MIDI " +
          "keyboard. Listen to how the pitch changes from left to right.",
        doneText: "Done: you heard how pitch rises from left to right.",
      },
    },
  },

  "white-keys": {
    title: "The note C and the names of the white keys",
    summary: "The reference note C and the seven white keys: C, D, E, F, G, A, B.",
    blocks: [
      "C is your main landmark. It's the white key just to the left of a group of two black " +
        "keys. There's one in every octave, so there are several C's on the instrument.",
      [
        "Find a group of two black keys.",
        "Take the white key immediately to its left — that's C.",
        "Check yourself: there are always exactly two black keys to the right of C.",
      ],
      "Moving right from C, the white keys are named in order: C, D, E, F, G, A, B — and then C " +
        "again. Seven names, and the eighth note repeats the first, only higher.",
      "Your second landmark is F: the white key to the left of a group of three black keys. " +
        "Once you know C and F, the rest of the names are easy to fill in.",
    ],
    practices: {
      "find-c": {
        title: "Practice 1: find every C",
        instruction:
          "Play every C on this keyboard — there are four of them. The order doesn't matter.",
        doneText: "All four C's found.",
      },
      "white-row": {
        title: "Practice 2: white keys in order",
        instruction:
          "Play C, D, E, F, G, A, B, C in a row. The names are labeled right on the keys.",
        doneText: "You've played through the whole row of white keys from C to C.",
      },
    },
  },

  octaves: {
    title: "Octaves",
    summary: "Why notes repeat, and what an octave is.",
    blocks: [
      "The distance from one note to the next note with the same name is called an octave. An " +
        "octave contains seven white keys and five black keys — twelve in all.",
      [
        "Notes in neighboring octaves sound alike, but one is exactly twice the frequency of " +
          "the other.",
        "Octaves are numbered: C4 is the C near the middle of the keyboard (MIDI note 60).",
        "The on-screen keyboard here spans three octaves: from C3 to C6.",
      ],
      "Play the same note in different octaves in a row — you'll hear that it's like the same " +
        "sound sung by different voices: a child's, a woman's, a man's.",
    ],
    practices: {
      "octave-jump": {
        title: "Practice 1: C across three octaves",
        instruction: "Play C from low to high: C4, C5, C6. Listen for how similar they sound.",
        doneText: "You've played three octaves of the same note.",
      },
      "octave-find": {
        title: "Practice 2: find G in every octave",
        instruction: "Find every G. G is the fourth white key to the right of C.",
        doneText: "All the G's found.",
      },
    },
  },

  fingers: {
    title: "Finger numbers",
    summary: "Fingering: fingers are numbered from the thumb to the little finger, 1 through 5.",
    blocks: [
      "In sheet music, numbers written above the notes are finger numbers. The numbering is the " +
        "same for both hands: 1 is the thumb, 2 the index finger, 3 the middle finger, 4 the " +
        "ring finger, 5 the little finger.",
      [
        "Right hand: moving right (upward in pitch), the numbers increase — 1, 2, 3, 4, 5.",
        "Left hand: moving right, the numbers decrease — 5, 4, 3, 2, 1.",
        "Fingering isn't arbitrary — it lets you play a phrase without unnecessary hand " +
          "repositioning.",
      ],
      "Even if you're playing with the mouse, say the finger number out loud — the habit will " +
        "stick faster once you sit down at a real instrument.",
    ],
    practices: {
      "fingers-right": {
        title: "Practice: fingers 1-5 of the right hand",
        instruction:
          "Play five notes in a row, naming the finger number as you go: 1, 2, 3, 4, 5. The " +
          "numbers are labeled on the keys.",
        doneText: "Fingers one through five practiced.",
      },
    },
  },

  "five-finger": {
    title: "Five notes with the right and left hand",
    summary: "The five-finger position C4-G4 for each hand — up and down.",
    blocks: [
      "The five-finger position is the basic hand position: all five fingers rest on five " +
        "neighboring white keys — C, D, E, F, G — and the hand doesn't move.",
      [
        "Place your right hand so the thumb is on C and the little finger is on G.",
        "Play upward: C, D, E, F, G (fingers 1-2-3-4-5).",
        "Play back down the same way: G, F, E, D, C (fingers 5-4-3-2-1).",
        "Repeat with the left hand: little finger on C, thumb on G.",
      ],
      "On a real instrument the left hand usually plays this position an octave lower. Here " +
        "both hands work on the same keys — what matters is the finger work, not the pitch.",
    ],
    practices: {
      "right-hand": {
        title: "Practice 1: right hand, up and down",
        instruction: "C, D, E, F, G and back. Fingers 1-2-3-4-5-4-3-2-1.",
        doneText: "The right hand has played the position both ways.",
      },
      "left-hand": {
        title: "Practice 2: left hand, up and down",
        instruction: "The same notes with the left hand. Fingers 5-4-3-2-1-2-3-4-5.",
        doneText: "The left hand has played the position both ways.",
      },
    },
  },

  patterns: {
    title: "Simple note patterns",
    summary: "Stepwise motion, skips, and your first short melody.",
    blocks: [
      "A melody almost always consists of simple moves: a step to a neighboring note, a skip " +
        "over a note, and a return to the home note. Once you can recognize these moves, " +
        "melodies become much easier to remember.",
      [
        "Stepwise motion: neighboring notes, for example C - D - E.",
        "Skipping motion: C - E - G, which sounds like a broken chord.",
        "Return: a phrase ends on the same note it started on, which creates a sense of " +
          "completion.",
      ],
      "The third practice is the traditional tune \"Mary Had a Little Lamb.\" It's built on just " +
        "three notes, yet it already sounds like real music.",
    ],
    practices: {
      steps: {
        title: "Practice 1: skipping a note",
        instruction: "Play C, E, G, E, C — a skip and a return.",
        doneText: "Skipping motion mastered.",
      },
      wave: {
        title: "Practice 2: the wave",
        instruction: "C, D, E, D, C, D, E, G — a phrase that rocks back and forth, then climbs.",
        doneText: "The wave played.",
      },
      melody: {
        title: "Practice 3: your first melody",
        instruction: "\"Mary Had a Little Lamb\": E, D, C, D, E, E, E, D, D, D, E, G, G.",
        doneText: "First melody played all the way through.",
      },
    },
  },

  rhythm: {
    title: "Rhythm basics and playing with a metronome",
    summary:
      "A steady pulse, beats and bars, and your first playing along with metronome clicks.",
    blocks: [
      "Rhythm is the organization of sounds in time. At its core is the pulse: even strikes " +
        "coming at equal intervals. Each such strike is called a beat.",
      [
        "Tempo is measured in beats per minute (BPM): 60 BPM means one beat per second.",
        "Beats are grouped into bars, most often four at a time: one, two, three, four.",
        "The first beat of a bar is the strongest — your ear naturally leans on it.",
        "The metronome counts out the beats so you don't speed up or slow down without " +
          "noticing.",
      ],
      [
        "Set the tempo to 60-80 BPM — that's enough to start with.",
        "Start the metronome and just listen to a few clicks, counting \"one, two, three, four.\"",
        "Start playing, landing exactly on the click; the note should sound at the same moment " +
          "as it.",
        "If you keep missing the click, slow the tempo down instead of trying to catch up.",
      ],
      "In the practice below, a note only counts if it's played close to a click. The metronome " +
        "is turned on with the button in the toolbar above the keyboard.",
    ],
    practices: {
      pulse: {
        title: "Practice 1: a steady pulse on one note",
        instruction: "Turn on the metronome and play C4 eight times — one note per click.",
        startHint: "Start the metronome, then press \"Start.\"",
        doneText: "Eight even beats played.",
      },
      "beat-steps": {
        title: "Practice 2: beats with a moving melody",
        instruction:
          "One note per click: C, D, E, F — then again. Make sure your hand doesn't rush.",
        startHint: "Start the metronome, then press \"Start.\"",
        doneText: "Two bars of four beats played evenly.",
      },
    },
  },
};
