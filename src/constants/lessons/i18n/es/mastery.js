// Traduccion al espanol del modulo 6 "Mas alla" (mastery.js).
// Formato del paquete de traduccion: docs/ru/I18N.md.

export const MASTERY_ES = {
  "minor-scales": {
    title: "Escalas menores",
    summary: "Los tres tipos de menor y la tonalidad relativa de do mayor.",
    blocks: [
      "El menor tiene tres variantes: natural, armónica y melódica. Las tres se construyen desde la " +
        "misma tónica, pero se diferencian en uno o dos grados.",
      [
        "La menor es la tonalidad relativa de do mayor: las mismas teclas, pero ahora el apoyo es la nota la.",
        "El menor natural usa exactamente los mismos siete grados que el mayor relativo.",
        "En el menor armónico el VII grado se sube un semitono: en la menor eso es sol\u266f en lugar de sol.",
        "El VII grado elevado crea el paso característico, de sabor \u00aboriental\u00bb, entre el VI y el VII grado.",
      ],
      "Toca el menor natural y el armónico desde la misma nota, uno tras otro, y escucha la diferencia: " +
        "cambia una sola nota, pero el color de la escala se vuelve completamente distinto.",
    ],
    practices: {
      "a-natural": {
        title: "Práctica 1: la menor natural",
        instruction: "Toca la menor natural hacia arriba y hacia abajo: las mismas teclas que do mayor.",
        doneText: "El la menor natural quedó tocado hacia arriba y hacia abajo.",
      },
      "a-harmonic": {
        title: "Práctica 2: la menor armónico",
        instruction:
          "La misma escala, pero con el séptimo grado elevado: sol\u266f. Escucha el paso característico " +
          "antes de la tónica superior.",
        doneText: "El la menor armónico quedó tocado con el VII grado elevado.",
      },
      "d-minor": {
        title: "Práctica 3: re menor natural",
        instruction: "Toca re menor natural hacia arriba, sin ayudas en el teclado.",
        doneText: "El re menor natural quedó tocado sin ayudas.",
      },
    },
  },

  arpeggios: {
    title: "Arpegios",
    summary: "El acorde repartido en notas, y la digitación básica para tocarlo.",
    blocks: [
      "El arpegio es un acorde cuyas notas se tocan no al mismo tiempo, sino una tras otra, por turno. " +
        "Esta textura suena como una ola y suele servir de acompañamiento en la mano izquierda.",
      [
        "Digitación estándar de la mano derecha para el arpegio ascendente: 1-2-3-5.",
        "La muñeca guía la mano a lo largo del teclado, mientras el codo la sigue de forma suave y casi imperceptible.",
        "Entre las notas del arpegio no debe haber sacudidas: el paso de un dedo a otro es fluido, sin golpes.",
        "El acorde repartido en la mano izquierda es uno de los tipos de acompañamiento más frecuentes en el repertorio fácil.",
      ],
      "Toca el arpegio muy despacio, comprobando que cada dedo se posa en la tecla sin tensión en la " +
        "muñeca. La velocidad llegará cuando el movimiento se vuelva libre.",
    ],
    practices: {
      "c-arp": {
        title: "Práctica 1: arpegio de do mayor",
        instruction: "Toca la tríada repartida de do mayor hacia arriba y hacia abajo con la digitación 1-2-3-5.",
        doneText: "El arpegio de do mayor quedó tocado hacia arriba y hacia abajo.",
      },
      "f-g-arp": {
        title: "Práctica 2: arpegios de fa mayor y sol mayor",
        instruction: "Toca dos arpegios seguidos: primero fa mayor, luego sol mayor, cada uno hacia arriba y hacia abajo.",
        doneText: "Ambos arpegios quedaron tocados seguidos, hacia arriba y hacia abajo.",
      },
      "bass-arp": {
        title: "Práctica 3: bajo y acorde repartido",
        instruction:
          "La primera nota es el bajo de apoyo en la mano izquierda, luego viene la tríada repartida en " +
          "la mano derecha hacia arriba y hacia abajo.",
        doneText: "El bajo y el acorde repartido quedaron tocados como una sola frase.",
      },
    },
  },

  "complex-rhythm": {
    title: "Ritmos más complejos",
    summary: "El ritmo con puntillo, la síncopa y el conteo por corcheas.",
    blocks: [
      "El ritmo con puntillo es una negra con puntillo (un tiempo y medio) más una corchea (medio " +
        "tiempo): el puntillo alarga la nota la mitad de su duración, y la siguiente nota corta completa el tiempo.",
      [
        "La síncopa es un acento desplazado hacia el tiempo débil o hacia la mitad débil del tiempo, y no hacia el fuerte.",
        "Un recurso cómodo para ambos ritmos: contar por corcheas, \u00abun-y-dos-y-tres-y-cuatro-y\u00bb.",
        "Conviene poner el metrónomo al doble de velocidad y contar cada clic como una corchea.",
        "El anacrusa es un compás incompleto antes del primer tiempo fuerte, con el que a veces empieza la frase.",
      ],
      "Antes de tocar el puntillo o la síncopa en el instrumento, marca el ritmo con palmas y di el " +
        "conteo en voz alta por corcheas: así el dibujo rítmico se fija en la cabeza antes de que entren los dedos.",
    ],
    practices: {
      dotted: {
        title: "Práctica 1: ritmo con puntillo",
        instruction:
          "Pon el metrónomo a 100-130 y cuenta cada clic como una corchea. El dibujo: negra con puntillo " +
          "y corchea, dos veces seguidas.",
        startHint: "Configura el tempo en 100-130 BPM y luego pulsa \u00abEmpezar\u00bb.",
        doneText: "El ritmo con puntillo quedó tocado con exactitud dos veces seguidas.",
      },
      syncope: {
        title: "Práctica 2: síncopa",
        instruction:
          "Metrónomo a 100-130, cada clic es una corchea. La segunda nota entra en la corchea débil, " +
          "desplazada respecto al tiempo fuerte del compás.",
        startHint: "Configura el tempo en 100-130 BPM y luego pulsa \u00abEmpezar\u00bb.",
        doneText: "El dibujo sincopado quedó tocado correctamente.",
      },
      "mixed-rhythm": {
        title: "Práctica 3: ritmo mixto",
        instruction:
          "Metrónomo a 100-130, cada clic es una corchea. Aquí se alternan negras y corcheas: cuenta con " +
          "atención donde hay una nota larga y donde una corta.",
        startHint: "Configura el tempo en 100-130 BPM y luego pulsa \u00abEmpezar\u00bb.",
        doneText: "El ritmo mixto de negras y corcheas quedó tocado correctamente.",
      },
    },
  },

  dynamics: {
    title: "Dinámica y expresividad",
    summary: "Las indicaciones de volumen, el crescendo y el diminuendo, la respiración de la frase musical.",
    blocks: [
      "La dinámica es el volumen del sonido. Las indicaciones principales: p (piano, suave), mp " +
        "(mezzo-piano, moderadamente suave), mf (mezzo-forte, moderadamente fuerte), f (forte, fuerte).",
      [
        "El crescendo es el aumento gradual del volumen, el diminuendo es la disminución gradual.",
        "En el piano, el volumen del sonido depende de la velocidad con que el dedo se mueve hacia la tecla, no de la fuerza del golpe.",
        "La frase musical suele \u00abrespirar\u00bb: se hace más fuerte hacia la cima y más suave hacia el final.",
        "Conviene planear la dinámica de antemano, en lugar de añadirla al azar mientras se toca.",
      ],
      {
        text: "Escucha la misma frase con distinto volumen y con distinto movimiento de la dinámica.",
        labels: ["Suave (p)", "Fuerte (f)", "Crescendo"],
      },
    ],
    practices: {
      crescendo: {
        title: "Práctica 1: tocar con crescendo",
        instruction:
          "Toca la escala hacia arriba con crescendo: empieza muy suave y aumenta poco a poco el " +
          "volumen hasta la nota superior. La aplicación no mide la dinámica: escúchate a ti mismo.",
        doneText: "La escala quedó tocada con aumento de volumen.",
      },
      diminuendo: {
        title: "Práctica 2: tocar con diminuendo",
        instruction:
          "Toca la escala hacia abajo con diminuendo: empieza fuerte y ve bajando el volumen poco a " +
          "poco hasta la nota inferior. La aplicación no mide la dinámica: escúchate a ti mismo.",
        doneText: "La escala quedó tocada con disminución de volumen.",
      },
      phrase: {
        title: "Práctica 3: frase con cima",
        instruction:
          "Toca la tríada repartida con la cima en el do superior: crece hacia la cima y luego baja " +
          "hacia el final de la frase. La aplicación no mide la dinámica: escúchate a ti mismo.",
        doneText: "La frase quedó tocada con la cima de volumen en la nota superior.",
      },
    },
  },

  pedal: {
    title: "Pedal",
    summary: "El pedal de resonancia, el pedal retrasado y la conexión del sonido sin él.",
    blocks: [
      "El pedal de resonancia levanta los apagadores de las cuerdas, y el sonido sigue prolongándose " +
        "después de soltar la tecla. Esto permite unir notas que los dedos no pueden ligar físicamente.",
      [
        "La regla principal es el pedal retrasado: pisarlo justo DESPUÉS de tomar la nueva armonía.",
        "Si el pedal se pisa demasiado pronto, la armonía vieja y la nueva se mezclan y suenan sucias.",
        "La limpieza de la pedalización hay que comprobarla con el oído en cada cambio de armonía, no por la sensación en el pie.",
        "El teclado en pantalla no tiene pedal, así que aquí entrenamos la conexión del sonido con los dedos: el legato.",
      ],
      {
        text: "Compara la misma progresión de acordes sin pedal y con pedal.",
        labels: ["Sin pedal", "Con pedal"],
      },
    ],
    practices: {
      "legato-chords": {
        title: "Práctica 1: cambio de armonía conectado",
        instruction:
          "Toca cuatro acordes seguidos, procurando unirlos con los dedos lo más fluidamente posible, " +
          "tal como lo hace el pedal en un instrumento real.",
        doneText: "El cambio de armonía quedó tocado de forma conectada, sin cortes bruscos.",
      },
      "pedal-arp": {
        title: "Práctica 2: arpegio amplio",
        instruction:
          "Toca una tríada repartida amplia de abajo hacia arriba. En un instrumento real este pasaje " +
          "suele sostenerse con un solo pedal hasta el final.",
        doneText: "El arpegio amplio quedó tocado desde el bajo hasta la nota superior.",
      },
    },
  },

  "final-pieces": {
    title: "Piezas finales",
    summary: "Qué significa aprender una pieza y hacia dónde seguir después de este programa.",
    blocks: [
      "Una pieza se puede considerar aprendida cuando se toca a tempo constante, de principio a fin, " +
        "sin paradas, con seguridad por partitura o ya de memoria.",
      [
        "Antes de una interpretación conviene tocar la pieza entera a tempo lento, sin una sola parada.",
        "Grábate en audio o video: desde fuera los errores de tempo y dinámica se oyen con más claridad.",
        "Después de este programa sigue avanzando: colecciones de piezas para principiantes, nuevas " +
          "tonalidades, conjunto instrumental.",
        "Aprender piezas nuevas será más rápido si sigues repasando con regularidad las escalas ya estudiadas.",
      ],
      { caption: "\u00abHimno a la alegría\u00bb completo: la pieza final del programa." },
    ],
    practices: {
      "ode-full": {
        title: "Práctica 1: \u00abHimno a la alegría\u00bb completo",
        instruction: "Toca la pieza entera de principio a fin por partitura, sin ayudas en el teclado.",
        doneText: "\u00abHimno a la alegría\u00bb quedó tocado por completo sin ayudas.",
      },
      "ode-tempo": {
        title: "Práctica 2: la misma pieza a tempo",
        instruction: "Pon el metrónomo a 66-96 BPM y toca la pieza de manera uniforme, siguiendo los clics, de principio a fin.",
        startHint: "Configura el tempo en 66-96 BPM y luego pulsa \u00abEmpezar\u00bb.",
        doneText: "La pieza quedó tocada de manera uniforme al tempo indicado.",
      },
      "twinkle-final": {
        title: "Práctica 3: \u00abTwinkle\u00bb con dos manos",
        instruction:
          "Toca \u00abTwinkle, Twinkle, Little Star\u00bb con dos manos: el bajo en la mano izquierda " +
          "entra solo en los tiempos fuertes, el resto de la melodía se toca con la mano derecha sola.",
        doneText: "\u00abTwinkle\u00bb quedó tocado con dos manos y el bajo en los tiempos fuertes.",
      },
    },
  },
};
