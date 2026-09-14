// Traduccion al espanol del modulo 5 "Las dos manos y el repertorio".
// Formato del paquete de traduccion: docs/ru/I18N.md.

export const HANDS_ES = {
  "melody-bass": {
    title: "Melodía a la derecha, bajo y acordes a la izquierda",
    summary:
      "Reparto de roles entre las manos: la derecha lleva la melodía, la izquierda sostiene la armonía.",
    blocks: [
      "En la mayoría de las piezas las manos cumplen roles distintos. La derecha lleva la melodía: " +
        "lo que el oyente tararea después de escucharla una vez. La izquierda sostiene la armonía, " +
        "el fundamento sobre el que la melodía suena correcta.",
      [
        "El acompañamiento más simple es una sola nota de bajo en cada tiempo fuerte del compás.",
        "El siguiente paso es tomar en la mano izquierda una tríada entera en lugar de una sola nota.",
        "El bajo suele tomar la tónica u otro grado de apoyo del acorde sobre el que se construye la armonía.",
        "Mientras tanto, la mano derecha sigue llevando la melodía sin depender de lo que haga la izquierda.",
      ],
      "Esta textura conviene aprenderla compás a compás: primero la melodía sola, luego el " +
        "acompañamiento solo, y solo cuando ambas voces estén firmemente memorizadas, juntar las manos.",
      "No intentes tocar de inmediato toda la estrofa con ambas manos. Un compás tocado limpio y con " +
        "seguridad vale más que toda la estrofa tocada de manera desigual.",
    ],
    practices: {
      "bass-note": {
        title: "Práctica 1: bajo y nota de la melodía",
        instruction:
          "La mano izquierda sostiene Do3 en cada tiempo, mientras la derecha toca al mismo tiempo la " +
          "nota de la melodía. Toca cada par de notas junto.",
        doneText: "El bajo y la melodía se tocaron juntos en los cuatro tiempos.",
      },
      "bass-triad": {
        title: "Práctica 2: bajo y tríada a la izquierda",
        instruction:
          "Ahora la mano izquierda toca no una sola nota, sino el bajo junto con la tríada. Escucha " +
          "cómo la armonía se vuelve más densa y segura.",
        doneText: "El bajo y la tríada se tocaron juntos en los cuatro acordes.",
      },
      "twinkle-accomp": {
        title: "Práctica 3: 'Twinkle' con bajo",
        instruction:
          "El inicio de 'Twinkle, Twinkle, Little Star' con acompañamiento: en las notas La el bajo " +
          "pasa a Fa, y en el resto del tiempo sostiene Do.",
        doneText: "'Twinkle' con acompañamiento de bajo se tocó correctamente.",
      },
    },
  },

  "both-hands": {
    title: "Tocar con ambas manos y las primeras piezas",
    summary: "Cómo juntar las manos sin perder el ritmo y analizar la primera pieza pequeña.",
    blocks: [
      "La dificultad principal de tocar con ambas manos no está en la fuerza o el estiramiento de los " +
        "dedos, sino en la independencia: cada mano debe hacer lo suyo sin dejarse influir por la otra.",
      [
        "Un recurso probado: primero cada mano por separado al tempo de la pieza, luego ambas juntas " +
          "muy lento.",
        "Cuenta los tiempos en voz alta: eso mantiene a las dos manos en el mismo pulso, aunque los " +
          "dedos se enreden.",
        "Mira la partitura, no las manos: con el tiempo las manos encuentran las teclas solas, y los " +
          "ojos deben ir más adelante.",
        "Analiza la pieza no de un tirón, sino por frases de dos a cuatro compases, afianzando cada " +
          "una antes de pasar a la siguiente.",
      ],
      { caption: "El inicio del 'Himno a la alegría': Mi, Mi, Fa, Sol, Sol, Fa, Mi, Re." },
      "Si un compás no logra unirse de ninguna manera, baja aún más el tempo, hasta una nota por " +
        "segundo si hace falta. La velocidad volverá sola en cuanto las manos dejen de estorbarse.",
    ],
    practices: {
      "octave-scale": {
        title: "Práctica 1: escala en octava con ambas manos",
        instruction: "Toca el inicio de la escala de Do mayor con ambas manos a la vez, en octava.",
        doneText: "La escala en octava se tocó con ambas manos de forma sincronizada.",
      },
      "ode-hands": {
        title: "Práctica 2: 'Himno a la alegría' con ambas manos",
        instruction:
          "La melodía suena todo el tiempo en la mano derecha, y el bajo de la izquierda entra solo en " +
          "la primera y la quinta nota de la frase, en los tiempos fuertes.",
        doneText: "'Himno a la alegría' se tocó con ambas manos, con el bajo en los tiempos fuertes.",
      },
      "piece-twinkle": {
        title: "Práctica 3: 'Twinkle, Twinkle, Little Star' completa",
        instruction:
          "Toca toda la primera frase de 'Twinkle' con una sola mano, respetando con exactitud la " +
          "duración de las notas.",
        doneText: "La primera frase de 'Twinkle' se tocó de principio a fin.",
      },
    },
  },

  "sight-reading": {
    title: "Lectura a primera vista y tocar sin ayudas",
    summary: "La habilidad de tocar un texto desconocido de inmediato, sin detenerse ni mirar las manos.",
    blocks: [
      "La lectura a primera vista es la capacidad de tocar un texto musical desconocido de inmediato, " +
        "sin análisis previo, sin detenerse ni volver atrás, aunque se cuele alguna imprecisión.",
      [
        "Antes de tocar, fíjate en la tonalidad y en el compás: eso marca el marco de todo lo que sigue.",
        "Elige un tempo deliberadamente más lento de lo que parece necesario: mejor lento y parejo que " +
          "rápido y desigual.",
        "Si te equivocas, no te detengas ni vuelvas atrás, sigue adelante junto con el pulso.",
        "Mira con la vista una o dos notas por delante de la que estás tocando en ese momento.",
      ],
      "En las prácticas de esta lección el resaltado de las teclas necesarias está desactivado, igual " +
        "que en una lectura a primera vista real. Guíate por las notas, no por las pistas del teclado.",
    ],
    practices: {
      "sight-1": {
        title: "Práctica 1: melodía en clave de sol",
        instruction: "Toca según la partitura, sin mirar antes el teclado. No habrá pistas en las teclas.",
        doneText: "La melodía se leyó a primera vista sin pistas.",
      },
      "sight-2": {
        title: "Práctica 2: melodía en clave de fa",
        instruction:
          "El mismo principio, pero en clave de fa: lee las notas una por una, hacia adelante, sin volver atrás.",
        doneText: "La línea en clave de fa se leyó a primera vista.",
      },
      "sight-3": {
        title: "Práctica 3: una frase más larga",
        instruction: "La frase es más larga y exige mirar un par de notas por delante para no perder el tempo.",
        doneText: "La frase larga se leyó a primera vista sin detenerse.",
      },
    },
  },

  "tempo-work": {
    title: "Tempo: mantenerlo y aumentarlo",
    summary: "Por qué tocar lento es útil y cómo subir el tempo correctamente sin perder precisión.",
    blocks: [
      "Tocar lento no sirve solo para no equivocarse. El cerebro memoriza el movimiento en sí, no la " +
        "velocidad: si el movimiento se aprendió bien, la velocidad aumenta casi por sí sola.",
      [
        "Regla para subir el tempo: añade de 4 a 8 pulsaciones por minuto, y solo después de tres " +
          "pasadas limpias.",
        "Una pasada limpia es sin un solo error y sin fallos en la regularidad de principio a fin.",
        "Si en el nuevo tempo aparecen errores, vuelve al anterior y afiánzalo una vez más.",
        "La regularidad del pulso importa más que la velocidad misma: mejor tocar parejo a 80 que a " +
          "tirones a 120.",
      ],
      "En las tareas siguientes el metrónomo debe estar dentro del rango de BPM indicado; de lo " +
        "contrario las notas tocadas no se contarán, aunque se toquen correctamente.",
    ],
    practices: {
      "tempo-60": {
        title: "Práctica 1: escala a tempo lento",
        instruction:
          "Pon el metrónomo en el rango de 56 a 72 BPM y toca la escala de Do mayor ascendente, una " +
          "nota por clic.",
        startHint: "Establece el tempo en 56-72 BPM y luego pulsa 'Empezar'.",
        doneText: "La escala se tocó de forma pareja a tempo lento.",
      },
      "tempo-80": {
        title: "Práctica 2: escala a tempo medio",
        instruction:
          "Pon el metrónomo en el rango de 76 a 92 BPM y toca la escala de Do mayor ascendente y " +
          "descendente, una nota por clic.",
        startHint: "Establece el tempo en 76-92 BPM y luego pulsa 'Empezar'.",
        doneText: "La escala se tocó de forma pareja a tempo medio.",
      },
      "tempo-100": {
        title: "Práctica 3: escala a tempo rápido",
        instruction:
          "Pon el metrónomo en el rango de 96 a 120 BPM y toca la misma escala ascendente y " +
          "descendente, sin perder la regularidad.",
        startHint: "Establece el tempo en 96-120 BPM y luego pulsa 'Empezar'.",
        doneText: "La escala se tocó de forma pareja a tempo rápido.",
      },
    },
  },
};
