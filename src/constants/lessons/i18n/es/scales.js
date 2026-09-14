// Traduccion al espanol del modulo 3 "Gamas y tonalidades" (scales.js).

export const SCALES_ES = {
  "c-major": {
    title: "Escala de do mayor a dos manos",
    summary:
      "Digitación de la escala de do mayor para la mano derecha e izquierda, tocada a dos manos en octava.",
    blocks: [
      "Una escala son los siete grados de la tonalidad tocados uno tras otro, más la octava nota que repite " +
        "la tónica una octava más arriba. Do mayor es la escala más simple: los siete grados caen sobre teclas blancas.",
      [
        "Digitación de la mano derecha: 1-2-3-1-2-3-4-5; el primer dedo pasa por debajo de la mano justo después de mi.",
        "Digitación de la mano izquierda: 5-4-3-2-1-3-2-1; el tercer dedo se cruza sobre el primero después de sol.",
        "Toca la escala de forma uniforme, sin sacudidas ni aceleraciones al pasar o cruzar los dedos.",
        "Al tocar a dos manos, la izquierda suena una octava más grave que la derecha; esta es la disposición estándar.",
      ],
      "El paso del pulgar y el cruce del tercer dedo no son un truco mecánico, sino una forma de tocar la escala " +
        "sin pausas ni saltos de la mano. Practica ambos movimientos por separado, a un tempo lento.",
      { caption: "Escala de do mayor ascendente: do, re, mi, fa, sol, la, si, do." },
    ],
    practices: {
      "c-right": {
        title: "Práctica 1: mano derecha",
        instruction:
          "Toca la escala de do mayor con la mano derecha, subiendo y bajando. Los números de dedo están " +
          "marcados en las teclas: 1-2-3-1-2-3-4-5 al subir y 5-4-3-2-1-3-2-1 al bajar.",
        doneText: "La mano derecha completó la escala de do mayor subiendo y bajando.",
      },
      "c-left": {
        title: "Práctica 2: mano izquierda",
        instruction:
          "La misma escala con la mano izquierda, una octava más grave. Digitación: 5-4-3-2-1-3-2-1 al subir " +
          "y 1-2-3-1-2-3-4-5 al bajar.",
        doneText: "La mano izquierda completó la escala de do mayor subiendo y bajando.",
      },
      "c-both": {
        title: "Práctica 3: ambas manos en octava",
        instruction:
          "Toca la escala con ambas manos a la vez, en octava: cada par de notas es la mano izquierda y la " +
          "derecha en el mismo grado. Con el ratón puedes tocar el par rápidamente uno tras otro, y en un " +
          "teclado MIDI, exactamente juntos.",
        doneText: "La escala se tocó a dos manos en octava, de tónica a tónica.",
      },
    },
  },

  accidentals: {
    title: "Sostenidos y bemoles",
    summary: "Semitono y tono, alteraciones y enarmonía de las teclas negras.",
    blocks: [
      "El semitono es la distancia hasta la tecla más cercana, sea blanca o negra. El tono son dos semitonos " +
        "seguidos. Todos los intervalos de la música se construyen a partir de estos dos bloques.",
      [
        "El sostenido (\u266f) sube la nota un semitono: se toma la tecla más cercana a la derecha.",
        "El bemol (\u266d) baja la nota un semitono: se toma la tecla más cercana a la izquierda.",
        "Cada tecla negra tiene dos nombres: fa\u266f y sol\u266d son la misma tecla; esto es la enarmonía.",
        "El becuadro (\u266e) anula el efecto de un sostenido o un bemol y devuelve la nota a su forma natural.",
      ],
      "Una alteración colocada en la armadura afecta a toda la pieza, mientras que una alteración colocada " +
        "justo delante de una nota en el compás es válida hasta el final de ese compás.",
    ],
    practices: {
      "black-keys": {
        title: "Práctica 1: todas las teclas negras de la octava",
        instruction: "Encuentra y toca las cinco teclas negras de una octava. El orden no importa.",
        doneText: "Se encontraron las cinco teclas negras de la octava.",
      },
      chromatic: {
        title: "Práctica 2: escala cromática",
        instruction:
          "Toca seguidas todas las teclas desde do hasta fa\u266f, sin saltarte ninguna: el paso es siempre " +
          "de un semitono.",
        doneText: "La escala cromática se tocó sin omisiones.",
      },
      "sharp-flat": {
        title: "Práctica 3: sostenido y bemol juntos",
        instruction:
          "Toca fa, fa\u266f, sol, fa\u266f, fa, mi\u266d, re. Observa que mi\u266d y re\u266f son la misma tecla.",
        doneText: "Los sostenidos y bemoles alrededor de fa y re se tocaron correctamente.",
      },
    },
  },

  "g-f-major": {
    title: "Escalas de sol mayor y fa mayor",
    summary:
      "Construcción de la escala mayor en tonos y semitonos, con el ejemplo de sol mayor y fa mayor.",
    blocks: [
      "Toda escala mayor se construye con la misma fórmula de pasos: tono, tono, semitono, tono, tono, tono, " +
        "semitono. Esta secuencia es la que da el sonido mayor reconocible.",
      [
        "Sol mayor: la fórmula requiere una sola alteración, fa\u266f; todo lo demás se toca en teclas blancas.",
        "Fa mayor: la fórmula requiere una sola alteración, si\u266d; todo lo demás se toca en teclas blancas.",
        "La digitación de la mano derecha en sol mayor es la misma que en do mayor: 1-2-3-1-2-3-4-5.",
        "La digitación de la mano derecha en fa mayor es distinta: 1-2-3-4-1-2-3-4.",
      ],
      "Antes de tocar la escala, busca la alteración necesaria en el teclado y memorízala por separado: en " +
        "sol mayor es fa\u266f, en fa mayor es si\u266d. El resto de la estructura coincide con do mayor.",
      { caption: "Escala de sol mayor: sol, la, si, do, re, mi, fa\u266f, sol." },
    ],
    practices: {
      "g-scale": {
        title: "Práctica 1: escala de sol mayor",
        instruction:
          "Toca la escala de sol mayor subiendo y bajando. La digitación es la misma que en do mayor: " +
          "1-2-3-1-2-3-4-5.",
        doneText: "La escala de sol mayor se tocó subiendo y bajando.",
      },
      "f-scale": {
        title: "Práctica 2: escala de fa mayor",
        instruction:
          "Toca la escala de fa mayor subiendo y bajando. Aquí la digitación es distinta: 1-2-3-4-1-2-3-4.",
        doneText: "La escala de fa mayor se tocó subiendo y bajando.",
      },
      "key-signs": {
        title: "Práctica 3: encuentra las alteraciones de la armadura",
        instruction:
          "Encuentra si\u266d y fa\u266f: son las únicas alteraciones que distinguen fa mayor y sol mayor de do mayor.",
        doneText: "Se encontraron ambas alteraciones de la armadura.",
      },
    },
  },

  "more-scales": {
    title: "Re mayor y el resto de las escalas mayores",
    summary:
      "La fórmula mayor en semitonos, el círculo de quintas y la construcción de cualquier escala mayor.",
    blocks: [
      "Se puede construir una escala mayor desde cualquier nota si se conoce la fórmula de pasos en " +
        "semitonos: 2-2-1-2-2-2-1. Es la misma fórmula tono-tono-semitono-tono-tono-tono-semitono, solo que " +
        "en números.",
      [
        "Círculo de quintas: la siguiente tonalidad en el sentido horario está una quinta más arriba, con un sostenido más.",
        "En sentido antihorario, las tonalidades descienden por quintas y añaden un bemol cada vez.",
        "El orden de aparición de los sostenidos es siempre el mismo: fa, do, sol, re, la, mi, si.",
        "Re mayor ocupa el segundo lugar en este orden y contiene dos sostenidos: fa\u266f y do\u266f.",
      ],
      [
        "Do mayor: sin alteraciones.",
        "Sol mayor: un sostenido (fa\u266f).",
        "Re mayor: dos sostenidos (fa\u266f, do\u266f).",
        "La mayor: tres sostenidos (fa\u266f, do\u266f, sol\u266f).",
        "Fa mayor: un bemol (si\u266d).",
        "Si bemol mayor: dos bemoles (si\u266d, mi\u266d).",
      ],
      "Puedes aplicar la fórmula 2-2-1-2-2-2-1 desde cualquier nota: cuenta los semitonos en el teclado y " +
        "obtendrás una escala mayor sin errores, incluso si no recuerdas de memoria las alteraciones de esa " +
        "tonalidad.",
    ],
    practices: {
      "d-scale": {
        title: "Práctica 1: escala de re mayor",
        instruction:
          "Toca la escala de re mayor subiendo y bajando, usando dos sostenidos: fa\u266f y do\u266f.",
        doneText: "La escala de re mayor se tocó subiendo y bajando.",
      },
      "a-scale": {
        title: "Práctica 2: escala de la mayor por tu cuenta",
        instruction:
          "Construye y toca la escala de la mayor con la fórmula 2-2-1-2-2-2-1, sin pistas en el teclado.",
        doneText: "La escala de la mayor se construyó y se tocó correctamente.",
      },
      "bb-scale": {
        title: "Práctica 3: escala de si bemol mayor por tu cuenta",
        instruction:
          "Construye y toca la escala de si bemol mayor con la misma fórmula, sin pistas en el teclado.",
        doneText: "La escala de si bemol mayor se construyó y se tocó correctamente.",
      },
    },
  },
};
