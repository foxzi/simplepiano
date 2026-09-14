// Общие данные уроков: подписи на клавишах и помощник для нотной записи.

export const WHITE_NAMES = {
  60: "До", 62: "Ре", 64: "Ми", 65: "Фа", 67: "Соль", 69: "Ля", 71: "Си", 72: "До",
};

export const RIGHT_FINGERS = { 60: "1", 62: "2", 64: "3", 65: "4", 67: "5" };
export const LEFT_FINGERS = { 60: "5", 62: "4", 64: "3", 65: "2", 67: "1" };

// Аппликатура гаммы до мажор на октаву: правая 1-2-3-1-2-3-4-5, левая 5-4-3-2-1-3-2-1.
export const C_SCALE_RIGHT = { 60: "1", 62: "2", 64: "3", 65: "1", 67: "2", 69: "3", 71: "4", 72: "5" };
export const C_SCALE_LEFT = { 48: "5", 50: "4", 52: "3", 53: "2", 55: "1", 57: "3", 59: "2", 60: "1" };

// Собирает практику по нотной записи.
//
//   score("treble", [[60, 1], [null, 1], [64, 2]])
//
// Пара — это [midi, длительность в долях]; midi === null означает паузу.
// Возвращает staff для рисования, notes для проверки и beats — момент
// вступления каждой ноты в долях от начала.
export function score(clef, pairs, options = {}) {
  const items = [];
  const notes = [];
  const beats = [];
  let at = 0;

  pairs.forEach(([midi, length = 1]) => {
    if (midi == null) {
      items.push({ rest: true, beats: length });
    } else {
      items.push({ midi, beats: length });
      notes.push(midi);
      beats.push(at);
    }
    at += length;
  });

  return {
    notes,
    beats,
    staff: { clef, items, meter: options.meter || null, showNames: !!options.showNames },
  };
}
