// Traduccion al espanol del modulo 1 "Primeros pasos".
// Formato del paquete de traduccion: docs/ru/I18N.md.

export const BASICS_ES = {
  "keyboard-tour": {
    title: "Conoce el teclado",
    summary: "Cómo se organizan las teclas blancas y negras y por qué el dibujo se repite.",
    blocks: [
      "El teclado del piano solo parece infinito a primera vista. En realidad es el mismo dibujo " +
        "pequeño, repetido muchas veces de izquierda a derecha.",
      [
        "Las teclas blancas van seguidas, sin huecos.",
        "Las teclas negras están agrupadas de dos en dos y de tres en tres.",
        "El grupo de dos y el grupo de tres se alternan: ese es el dibujo que se repite.",
        "Cuanto más a la derecha esté la tecla, más agudo es el sonido; cuanto más a la izquierda, más grave.",
      ],
      "Busca con la vista cualquier grupo de dos teclas negras. La tecla blanca justo delante de él " +
        "es Do. Desde ese Do hasta el siguiente Do, antes del próximo grupo de dos teclas negras, " +
        "siempre hay siete teclas blancas seguidas: Do, Re, Mi, Fa, Sol, La, Si. En este dibujo se " +
        "apoya toda la orientación posterior.",
      "Siéntate de manera que los antebrazos queden casi paralelos al suelo y los dedos estén " +
        "redondeados, como si sostuvieran una pelota. Pulsa la tecla con la yema del dedo, no con la uña.",
    ],
    practices: {
      explore: {
        title: "Práctica: prueba el teclado de oído",
        instruction:
          "Toca ocho teclas cualesquiera distintas: con el ratón, con el dedo en la pantalla o en un " +
          "teclado MIDI. Escucha cómo cambia la altura del sonido de izquierda a derecha.",
        doneText: "Listo: has escuchado cómo la altura del sonido sube de izquierda a derecha.",
      },
    },
  },

  "white-keys": {
    title: "La nota Do y los nombres de las teclas blancas",
    summary: "La nota de referencia Do y las siete teclas blancas: Do, Re, Mi, Fa, Sol, La, Si.",
    blocks: [
      "Do (en notación latina, C) es la referencia principal. Es la tecla blanca a la izquierda del " +
        "grupo de dos negras. Esta tecla existe en cada octava, por eso hay varios Do en el instrumento.",
      [
        "Busca un grupo de dos teclas negras.",
        "Toma la tecla blanca justo a la izquierda: esa es Do.",
        "Compruébalo: a la derecha de Do siempre hay exactamente dos teclas negras.",
      ],
      "Desde Do hacia la derecha, las teclas blancas se llaman en orden: Do, Re, Mi, Fa, Sol, La, Si, " +
        "y de nuevo Do. Siete nombres; la octava nota repite la primera, solo que más aguda.",
      "El segundo punto de referencia es Fa: es la tecla blanca a la izquierda del grupo de tres " +
        "negras. Conociendo Do y Fa, es fácil deducir el resto de los nombres.",
    ],
    practices: {
      "find-c": {
        title: "Práctica 1: busca todos los Do",
        instruction: "Toca todas las notas Do que hay en este teclado: son cuatro. El orden no importa.",
        doneText: "Los cuatro Do encontrados.",
      },
      "white-row": {
        title: "Práctica 2: las teclas blancas en orden",
        instruction:
          "Toca seguidos Do, Re, Mi, Fa, Sol, La, Si, Do. Los nombres están escritos justo en las teclas.",
        doneText: "Has recorrido toda la fila de teclas blancas de Do a Do.",
      },
    },
  },

  octaves: {
    title: "Octavas",
    summary: "Por qué se repiten las notas y qué es una octava.",
    blocks: [
      "La distancia entre una nota y la siguiente nota con el mismo nombre se llama octava. Dentro " +
        "de una octava caben siete teclas blancas y cinco negras: doce en total.",
      [
        "Las notas de octavas vecinas suenan parecido, pero una está exactamente al doble de " +
          "frecuencia que la otra.",
        "Las octavas se numeran: do4 es el Do de la octava central del teclado (en MIDI, el número 60).",
        "En el teclado de esta pantalla hay tres octavas: de do3 a do6.",
      ],
      "Toca la misma nota en distintas octavas seguidas: escucharás que es como si fuera el mismo " +
        "sonido, cantado por voces distintas: infantil, femenina, masculina.",
    ],
    practices: {
      "octave-jump": {
        title: "Práctica 1: Do en tres octavas",
        instruction: "Toca Do de abajo hacia arriba: do4, do5, do6. Escucha con atención el parecido de los sonidos.",
        doneText: "Has recorrido tres octavas de una misma nota.",
      },
      "octave-find": {
        title: "Práctica 2: busca Sol en todas las octavas",
        instruction: "Encuentra todas las notas Sol. Sol es la cuarta tecla blanca a la derecha de Do.",
        doneText: "Todos los Sol encontrados.",
      },
    },
  },

  fingers: {
    title: "Números de los dedos",
    summary: "Digitación: los dedos se numeran del pulgar al meñique, del 1 al 5.",
    blocks: [
      "En las partituras, sobre las teclas se escriben números: son los números de los dedos. La " +
        "numeración es la misma para ambas manos: 1, el pulgar; 2, el índice; 3, el medio; 4, el " +
        "anular; 5, el meñique.",
      [
        "Mano derecha: al tocar hacia la derecha (subiendo en el sonido), los números aumentan: 1, 2, 3, 4, 5.",
        "Mano izquierda: al tocar hacia la derecha, los números disminuyen: 5, 4, 3, 2, 1.",
        "La digitación no es un capricho: permite tocar una frase sin cambios de mano innecesarios.",
      ],
      "Si tocas con el ratón, di igualmente el número del dedo en voz alta: así el hábito se afianza " +
        "más rápido cuando te sientes ante un instrumento real.",
    ],
    practices: {
      "fingers-right": {
        title: "Práctica: dedos 1 a 5 de la mano derecha",
        instruction:
          "Toca cinco notas seguidas, diciendo el número del dedo: 1, 2, 3, 4, 5. Los números están " +
          "escritos en las teclas.",
        doneText: "Dedos del primero al quinto trabajados.",
      },
    },
  },

  "five-finger": {
    title: "Cinco notas con la mano derecha e izquierda",
    summary: "Posición de cinco dedos do4-sol4 para cada mano: subiendo y bajando.",
    blocks: [
      "La posición de cinco dedos es la postura básica de la mano: los cinco dedos se colocan en " +
        "cinco teclas blancas consecutivas, Do, Re, Mi, Fa, Sol, y la mano no se desplaza.",
      [
        "Coloca la mano derecha de modo que el pulgar quede en Do y el meñique en Sol.",
        "Toca hacia arriba: Do, Re, Mi, Fa, Sol (dedos 1-2-3-4-5).",
        "Toca hacia abajo por el mismo camino: Sol, Fa, Mi, Re, Do (dedos 5-4-3-2-1).",
        "Repite lo mismo con la mano izquierda: el meñique en Do, el pulgar en Sol.",
      ],
      "En un instrumento real, la mano izquierda suele tocar esta posición una octava más abajo. Aquí " +
        "ambas manos trabajan sobre las mismas teclas: lo importante no es la altura, sino el trabajo " +
        "de los dedos.",
    ],
    practices: {
      "right-hand": {
        title: "Práctica 1: mano derecha, subiendo y bajando",
        instruction: "Do, Re, Mi, Fa, Sol y de vuelta. Dedos 1-2-3-4-5-4-3-2-1.",
        doneText: "La mano derecha ha recorrido la posición en ambos sentidos.",
      },
      "left-hand": {
        title: "Práctica 2: mano izquierda, subiendo y bajando",
        instruction: "Las mismas notas con la mano izquierda. Dedos 5-4-3-2-1-2-3-4-5.",
        doneText: "La mano izquierda ha recorrido la posición en ambos sentidos.",
      },
    },
  },

  patterns: {
    title: "Secuencias sencillas de notas",
    summary: "Movimiento por notas vecinas, saltos de una nota y la primera melodía corta.",
    blocks: [
      "Una melodía casi siempre se compone de movimientos sencillos: un paso al grado vecino, un " +
        "salto saltando una nota y un regreso al sonido de referencia. Si reconoces estos movimientos, " +
        "las melodías se memorizan mucho más fácil.",
      [
        "Movimiento por grados: notas vecinas, por ejemplo Do, Re, Mi.",
        "Movimiento saltando una nota: Do, Mi, Sol, suena como un acorde arpegiado.",
        "Regreso: la frase termina en la misma nota con la que empezó, y así aparece la sensación de conclusión.",
      ],
      "En la tercera práctica aparece la melodía tradicional \u00abMary tenía un corderito\u00bb. Está " +
        "construida con solo tres notas, pero ya suena como música de verdad.",
    ],
    practices: {
      steps: {
        title: "Práctica 1: saltando una nota",
        instruction: "Toca Do, Mi, Sol, Mi, Do: movimiento saltando una nota y regreso.",
        doneText: "Movimiento saltando una nota dominado.",
      },
      wave: {
        title: "Práctica 2: la ola",
        instruction: "Do, Re, Mi, Re, Do, Re, Mi, Sol: una frase que se mece y asciende.",
        doneText: "La ola tocada.",
      },
      melody: {
        title: "Práctica 3: primera melodía",
        instruction: "\u00abMary tenía un corderito\u00bb: Mi, Re, Do, Re, Mi, Mi, Mi, Re, Re, Re, Mi, Sol, Sol.",
        doneText: "Primera melodía tocada por completo.",
      },
    },
  },

  rhythm: {
    title: "Fundamentos del ritmo y tocar con el metrónomo",
    summary: "Pulsación regular, tiempos y compases, primera práctica con los clics del metrónomo.",
    blocks: [
      "El ritmo es la organización de los sonidos en el tiempo. En su base está el pulso: golpes " +
        "regulares que se suceden a intervalos iguales. Cada uno de esos golpes se llama tiempo.",
      [
        "El tempo se mide en golpes por minuto (BPM, o ppm en español): 60 ppm es un tiempo por segundo.",
        "Los tiempos se agrupan en compases, casi siempre de cuatro: uno, dos, tres, cuatro.",
        "El primer tiempo del compás es el más fuerte: en él se apoya el oído.",
        "El metrónomo marca los tiempos en voz alta para que no aceleres ni ralentices sin darte cuenta.",
      ],
      [
        "Fija un tempo de 60-80 ppm: para empezar, es suficiente.",
        "Pon en marcha el metrónomo y escucha unos cuantos clics contando \u00abuno, dos, tres, cuatro\u00bb.",
        "Empieza a tocar cayendo exactamente en el clic; la nota debe sonar a la vez que él.",
        "Si no coincides de forma constante, baja el tempo en lugar de intentar alcanzarlo.",
      ],
      "En la práctica siguiente, la nota se valida solo si se toca junto al clic. El metrónomo se " +
        "activa con el botón de la barra de herramientas encima del teclado.",
    ],
    practices: {
      pulse: {
        title: "Práctica 1: pulso regular en una sola nota",
        instruction: "Activa el metrónomo y toca do4 ocho veces: una nota por cada clic.",
        startHint: "Pon en marcha el metrónomo y luego pulsa \u00abEmpezar\u00bb.",
        doneText: "Ocho tiempos regulares tocados.",
      },
      "beat-steps": {
        title: "Práctica 2: tiempos con movimiento melódico",
        instruction: "Una nota por clic: Do, Re, Mi, Fa, y otra vez. Vigila que la mano no se adelante.",
        startHint: "Pon en marcha el metrónomo y luego pulsa \u00abEmpezar\u00bb.",
        doneText: "Dos compases de cuatro tiempos tocados con regularidad.",
      },
    },
  },
};
