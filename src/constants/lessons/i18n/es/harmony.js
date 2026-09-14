// Traduccion al espanol del modulo 4 "Intervalos y acordes" (harmony.js).
// Formato del paquete de traduccion: docs/ru/I18N.md.

export const HARMONY_ES = {
  "tones-intervals": {
    title: "Tono, semitono e intervalos",
    summary: "Qué es un intervalo, cómo contarlo por grados y cuántos semitonos tiene.",
    blocks: [
      "Un intervalo es la distancia entre dos notas. El semitono es la tecla más cercana, el tono es " +
        "a través de una tecla. Los intervalos se nombran según la cantidad de grados entre las notas, y se " +
        "miden en semitonos.",
      [
        "Unísono - 0 semitonos, es la misma nota.",
        "Segunda - el grado vecino, la segunda menor es 1 semitono, la segunda mayor es 2 semitonos.",
        "Tercera - a través de un grado, la tercera menor es 3 semitonos, la tercera mayor es 4 semitonos.",
        "Cuarta - 5 semitonos, quinta - 7 semitonos, sexta - menor 8 semitonos, mayor 9 semitonos, " +
          "séptima - menor 10 semitonos, mayor 11 semitonos.",
        "Octava - 12 semitonos, la repetición de la misma nota más arriba.",
      ],
      "La tercera es el intervalo más frecuente en la música, por eso es importante distinguir de oído " +
        "sus dos tipos: la tercera mayor (4 semitonos) suena más clara, la tercera menor (3 semitonos) más " +
        "oscura y suave.",
      "Cuenta los semitonos directamente en el teclado, incluidas las teclas negras: es la forma más " +
        "segura de comprobar un intervalo si todavía no confías en el oído.",
    ],
    practices: {
      "tone-half": {
        title: "Práctica 1: alternancia de tono y semitono",
        instruction:
          "Toca Do, Do sostenido, Do, Re, Mi, Fa, Mi, Fa sostenido: escucha dónde el paso es de un " +
          "semitono y dónde de un tono completo.",
        doneText: "La alternancia de tonos y semitonos quedó tocada.",
      },
      "build-intervals": {
        title: "Práctica 2: intervalos desde Do",
        instruction: "Construye desde la nota Do tres intervalos: tercera mayor, quinta y octava.",
        chordNames: ["tercera mayor", "quinta", "octava"],
        doneText: "Los tres intervalos desde Do quedaron construidos correctamente.",
      },
      "intervals-from-g": {
        title: "Práctica 3: intervalos desde Sol",
        instruction: "Desde la nota Sol construye una tercera mayor, una quinta justa y una sexta mayor.",
        chordNames: ["tercera mayor", "quinta justa", "sexta mayor"],
        doneText: "Los intervalos desde Sol quedaron construidos correctamente.",
      },
    },
  },

  "intervals-ear": {
    title: "Intervalos de oído",
    summary: "Cómo reconocer intervalos por melodías conocidas y comprobarte tocando de oído.",
    blocks: [
      "Lo más fácil es recordar un intervalo a través de una melodía conocida que empiece justo con él. " +
        "La quinta es el primer salto de 'Twinkle, Twinkle, Little Star', la octava es el comienzo de " +
        "'Somewhere Over the Rainbow', la segunda mayor son simplemente dos grados vecinos de la escala, " +
        "por ejemplo Do y Re.",
      [
        "Escucha primero la nota inferior, luego la superior: esa es la dirección del intervalo hacia arriba.",
        "Compara lo que escuchas con la melodía de referencia, en lugar de intentar adivinar al azar.",
        "Si no estás seguro, vuelve a escuchar el par un par de veces antes de responder.",
      ],
      "En la práctica de abajo la aplicación reproduce dos notas seguidas: primero la de referencia, " +
        "luego la segunda. Tu tarea es tocar en el teclado esa segunda nota que escuchaste.",
    ],
    practices: {
      "ear-basic": {
        title: "Práctica 1: tercera, quinta, octava",
        instruction:
          "Escucha un par de notas desde el Do de referencia y toca la segunda nota escuchada: será " +
          "una tercera, una quinta o una octava.",
        doneText: "La tercera, la quinta y la octava se reconocen con seguridad de oído.",
      },
      "ear-wide": {
        title: "Práctica 2: más intervalos",
        instruction:
          "Ahora se agregaron la segunda, la cuarta y la sexta: escucha con más atención y toca la " +
          "segunda nota de cada par.",
        doneText: "El conjunto ampliado de intervalos se reconoce de oído.",
      },
    },
  },

  triads: {
    title: "Tríadas mayores y menores",
    summary: "La tríada como dos terceras seguidas, y la diferencia entre mayor y menor en una sola nota.",
    blocks: [
      "La tríada son tres notas tomadas a través de un grado: una tercera más otra tercera encima. " +
        "Este acorde es el bloque de construcción básico de la armonía.",
      [
        "Tríada mayor: abajo una tercera mayor (4 semitonos), arriba una tercera menor (3 semitonos).",
        "Tríada menor: abajo una tercera menor (3 semitonos), arriba una tercera mayor (4 semitonos).",
        "De oído, el mayor suena más claro y seguro, el menor más oscuro y suave.",
        "La diferencia entre la tríada mayor y menor desde la misma nota está solo en la nota central " +
          "del acorde.",
      ],
      "Toca la tríada mayor y la menor desde la misma nota, una tras otra, y escucha: solo cambia el " +
        "sonido central, pero el carácter del acorde cambia por completo.",
    ],
    practices: {
      "major-triads": {
        title: "Práctica 1: tríadas mayores",
        instruction: "Construye y toca tres tríadas mayores: Do mayor, Fa mayor, Sol mayor.",
        chordNames: ["Do mayor", "Fa mayor", "Sol mayor"],
        doneText: "Las tres tríadas mayores quedaron tocadas correctamente.",
      },
      "minor-triads": {
        title: "Práctica 2: tríadas menores",
        instruction: "Construye y toca tres tríadas menores: La menor, Re menor, Mi menor.",
        chordNames: ["La menor", "Re menor", "Mi menor"],
        doneText: "Las tres tríadas menores quedaron tocadas correctamente.",
      },
      "major-minor": {
        title: "Práctica 3: mayor y menor desde la misma nota",
        instruction:
          "Compara de oído los pares de tríadas: Do mayor y Do menor, Fa mayor y Fa menor. Escucha " +
          "cómo cambia la nota central.",
        chordNames: ["Do mayor", "Do menor", "Fa mayor", "Fa menor"],
        doneText: "Los pares mayor-menor quedaron tocados y comparados de oído.",
      },
    },
  },

  inversions: {
    title: "Inversiones de acordes",
    summary: "El estado fundamental, la primera y la segunda inversión de la tríada, y para qué sirven.",
    blocks: [
      "La inversión es el mismo acorde, solo que su nota inferior se traslada una octava hacia arriba. " +
        "Las notas siguen siendo las mismas, solo cambia cuál de ellas queda abajo.",
      [
        "Estado fundamental: abajo la tónica, el acorde se construye por terceras hacia arriba.",
        "Primera inversión: abajo queda el tono de tercera, la tónica se traslada arriba.",
        "Segunda inversión: abajo queda el tono de quinta.",
      ],
      "Las inversiones sirven para que la mano salte menos por el teclado: los acordes vecinos en el " +
        "acompañamiento suelen enlazarse a través de notas comunes, eligiendo la inversión adecuada en " +
        "lugar del estado fundamental.",
    ],
    practices: {
      "c-inversions": {
        title: "Práctica 1: inversiones de Do mayor",
        instruction: "Toca Do mayor en estado fundamental, primera y segunda inversión, uno tras otro.",
        chordNames: ["estado fundamental", "primera inversión", "segunda inversión"],
        doneText: "Los tres estados de Do mayor quedaron tocados correctamente.",
      },
      "f-inversions": {
        title: "Práctica 2: inversiones de Fa mayor",
        instruction: "La misma secuencia de inversiones, pero para Fa mayor.",
        chordNames: ["estado fundamental", "primera inversión", "segunda inversión"],
        doneText: "Los tres estados de Fa mayor quedaron tocados correctamente.",
      },
      smooth: {
        title: "Práctica 3: enlace fluido de acordes",
        instruction:
          "Toca Do mayor, luego Fa mayor en segunda inversión, Sol mayor en primera inversión y de " +
          "nuevo Do mayor: la mano casi no se mueve entre acordes.",
        chordNames: [
          "Do mayor",
          "Fa mayor (segunda inversión)",
          "Sol mayor (primera inversión)",
          "Do mayor",
        ],
        doneText: "El enlace fluido de acordes quedó tocado sin saltos innecesarios de la mano.",
      },
    },
  },

  cadence: {
    title: "Acordes C, F, G y la progresión I-IV-V-I",
    summary:
      "Los grados de la tonalidad en números romanos, los tres acordes principales y una progresión " +
      "armónica completa.",
    blocks: [
      "Los grados de la tonalidad se designan con números romanos: I es la tónica, el apoyo principal; " +
        "IV es la subdominante; V es la dominante, el grado más tenso, que tira de vuelta hacia la tónica.",
      [
        "Sobre las tríadas I, IV y V se sostiene una enorme cantidad de canciones y piezas.",
        "La progresión I-IV-V-I suena como una frase musical completa, pregunta y respuesta.",
        "En la versión más simple, la mano izquierda puede tocar solo el bajo principal: la tónica de " +
          "cada acorde.",
      ],
      "Toca la progresión primero en estado fundamental, luego en posición cerrada con inversiones: en " +
        "el segundo caso la mano casi no se desplaza y el sonido resulta más fluido.",
    ],
    practices: {
      "three-chords": {
        title: "Práctica 1: progresión I-IV-V-I",
        instruction: "Toca C, F, G y de nuevo C: los tres acordes principales de la tonalidad de Do mayor.",
        chordNames: ["C (I)", "F (IV)", "G (V)", "C (I)"],
        doneText: "La progresión I-IV-V-I quedó tocada en estado fundamental.",
      },
      "cadence-smooth": {
        title: "Práctica 2: la misma progresión en posición cerrada",
        instruction:
          "Toca la misma progresión, pero con inversiones, para que la mano casi no se mueva entre " +
          "acordes.",
        chordNames: ["C", "F/Do", "G/Si", "C"],
        doneText: "La progresión quedó tocada en posición cerrada, sin saltos innecesarios.",
      },
      "bass-chords": {
        title: "Práctica 3: progresión con bajo de la mano izquierda",
        instruction:
          "La mano izquierda agrega el tono principal del acorde en la octava inferior, la mano derecha " +
          "toca la tríada arriba.",
        chordNames: ["C con bajo", "F con bajo", "G con bajo", "C con bajo"],
        doneText: "La progresión quedó tocada con ambas manos, con bajo en la mano izquierda.",
      },
    },
  },
};
