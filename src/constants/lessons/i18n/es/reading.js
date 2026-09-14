// Traduccion al espanol del modulo 2 "Ritmo y notas".
// Formato del paquete de traduccion: docs/ru/I18N.md.

export const READING_ES = {
  "note-values": {
    title: "Las notas negra, blanca y redonda",
    summary: "Duraciones de las notas: negra, blanca y redonda, y cómo contarlas.",
    blocks: [
      "El tiempo es la unidad de duración en la música: el mismo clic que oyes en el metrónomo. " +
        "La negra dura exactamente un tiempo: la tocas y, en el tiempo siguiente, ya puedes tocar " +
        "otra nota.",
      [
        "La negra tiene la cabeza rellena y una plica, y dura un tiempo.",
        "La blanca tiene la cabeza hueca (blanca) y una plica, y dura dos tiempos.",
        "La redonda tiene la cabeza hueca sin plica, y dura cuatro tiempos.",
        "Cuanto más larga es la nota, más tiempo hay que mantener la tecla pulsada antes de tocar " +
          "la siguiente.",
      ],
      "Es práctico contar en voz alta así: 'uno-y-dos-y-tres-y-cuatro-y', donde cada número " +
        "corresponde a un tiempo. Una nota larga simplemente ocupa varios de estos conteos " +
        "seguidos, sin que suene nada nuevo mientras tanto.",
      { caption: "Un compás de cuatro negras: Do, Re, Mi, Fa, una nota por cada tiempo." },
      "Si tienes dudas sobre cuánto mantener una nota, cuenta los tiempos en voz alta y suelta " +
        "la tecla justo en el conteo en que debe entrar la siguiente nota.",
    ],
    practices: {
      quarters: {
        title: "Práctica 1: solo negras",
        instruction:
          "Pon el tempo entre 60 y 80 ppm. Cada clic del metrónomo es una negra: un tiempo, un clic.",
        startHint: "Inicia el metrónomo y después pulsa 'Empezar'.",
        doneText: "Ocho negras tocadas justo sobre los clics.",
      },
      halves: {
        title: "Práctica 2: notas blancas",
        instruction:
          "Ahora cada nota dura dos tiempos: mantén la tecla pulsada durante dos clics seguidos " +
          "y toca la siguiente nota justo en el tercer clic.",
        startHint: "Inicia el metrónomo y después pulsa 'Empezar'.",
        doneText: "Las blancas mantenidas correctamente.",
      },
      whole: {
        title: "Práctica 3: la nota redonda",
        instruction:
          "La primera nota dura cuatro tiempos completos: mantenla durante los cuatro clics. " +
          "Después vienen dos blancas y, otra vez, una redonda de cuatro clics.",
        startHint: "Inicia el metrónomo y después pulsa 'Empezar'.",
        doneText: "La redonda mantenida correctamente, sin confundir las duraciones.",
      },
    },
  },

  "eighths-rests": {
    title: "Las corcheas y los silencios",
    summary: "La duración de la corchea y los silencios: el silencio que también hay que contar.",
    blocks: [
      "La corchea dura la mitad que la negra: ocupa medio tiempo. Dos corcheas llenan exactamente " +
        "un tiempo, por eso es práctico contarlas como 'uno-y', donde 'uno' y 'y' son la primera " +
        "y la segunda mitad del tiempo.",
      [
        "Las corcheas se escriben con un corchete en la plica; varias seguidas se unen con una " +
          "barra común.",
        "Truco práctico: pon el metrónomo al doble de velocidad y cuenta cada clic como una corchea.",
        "El silencio es un signo que indica una pausa de la misma duración que la nota " +
          "correspondiente.",
        "El silencio de negra parece un garabato; el silencio de corchea, una pequeña bandera " +
          "con gancho.",
      ],
      "El silencio es tan importante como la nota: si te saltas un silencio y entras antes de " +
        "tiempo, el ritmo de la frase se desmorona por completo, aunque las notas en sí estén " +
        "bien tocadas.",
      { caption: "Una negra, un silencio de negra, dos corcheas y otra vez una negra." },
    ],
    practices: {
      "eighth-run": {
        title: "Práctica 1: corchea tras corchea",
        instruction:
          "Pon el tempo entre 100 y 120 y cuenta cada clic como una corchea: así cada nota cae " +
          "justo en su clic.",
        startHint: "Inicia el metrónomo y después pulsa 'Empezar'.",
        doneText: "Ocho corcheas tocadas de forma pareja, una por clic.",
      },
      "with-rests": {
        title: "Práctica 2: notas separadas por silencios",
        instruction:
          "Después de cada nota hay un silencio de negra: suelta la tecla y espera un clic en " +
          "silencio antes de tocar la siguiente nota.",
        startHint: "Inicia el metrónomo y después pulsa 'Empezar'.",
        doneText: "Silencios respetados, sin que las notas se superpongan.",
      },
      mixed: {
        title: "Práctica 3: notas y silencios mezclados",
        instruction:
          "Aquí los silencios no van después de cada nota, sino de una de cada dos: cuenta los " +
          "tiempos con atención para no entrar demasiado pronto.",
        startHint: "Inicia el metrónomo y después pulsa 'Empezar'.",
        doneText: "El patrón mezclado de notas y silencios tocado correctamente.",
      },
    },
  },

  "staff-treble": {
    title: "El pentagrama y la clave de sol",
    summary: "Las cinco líneas, los espacios entre ellas y la clave de sol como punto de referencia.",
    blocks: [
      "El pentagrama está formado por cinco líneas horizontales y cuatro espacios entre ellas. " +
        "Las líneas y los espacios se cuentan de abajo hacia arriba: la primera línea es la más " +
        "baja, la quinta es la más alta.",
      "Las líneas por sí solas no dicen nada sobre la altura del sonido: hace falta una clave que " +
        "fije el punto de referencia. La clave de sol envuelve la segunda línea desde abajo: esa " +
        "es la nota sol4.",
      [
        "En las líneas, de abajo hacia arriba: Mi, Sol, Si, Re, Fa.",
        "En los espacios, de abajo hacia arriba: Fa, La, Do, Mi.",
        "El Do central se sitúa en una línea adicional justo debajo del pentagrama, más corta " +
          "que las líneas normales.",
      ],
      { caption: "Las notas en las líneas: Mi, Sol, Si, Re, Fa." },
      { caption: "Las notas en los espacios: Fa, La, Do, Mi." },
    ],
    practices: {
      lines: {
        title: "Práctica 1: las notas en las líneas",
        instruction: "Toca en orden las cinco notas que están justo en las líneas: Mi, Sol, Si, Re, Fa.",
        doneText: "Todas las notas de las líneas tocadas en orden.",
      },
      spaces: {
        title: "Práctica 2: las notas en los espacios",
        instruction: "Toca en orden las cuatro notas de los espacios entre las líneas: Fa, La, Do, Mi.",
        doneText: "Todas las notas de los espacios tocadas en orden.",
      },
      "middle-c": {
        title: "Práctica 3: desde el Do central",
        instruction:
          "Toca cinco notas seguidas, empezando por el Do central en la línea adicional: " +
          "Do, Re, Mi, Fa, Sol.",
        doneText: "Las cinco notas desde el Do central tocadas correctamente.",
      },
    },
  },

  "read-right": {
    title: "Leer notas con la mano derecha",
    summary: "Cómo leer una melodía siguiendo el movimiento de las notas y no letra por letra.",
    blocks: [
      "Los músicos con experiencia no leen las notas letra por letra: ven el movimiento. Una nota " +
        "queda más arriba, más abajo o al mismo nivel que la anterior, y la mano encuentra la " +
        "tecla correcta por sí sola.",
      [
        "Un paso es la nota vecina: una línea más arriba o más abajo, o de una línea al espacio " +
          "contiguo.",
        "Un salto se produce saltando un grado: una nota de por medio, un movimiento más amplio " +
          "y fácil de ver.",
        "Vale la pena memorizar con precisión las notas de referencia Do, Sol y Fa: a partir de " +
          "ellas es fácil deducir las vecinas.",
      ],
      "No mires la nota que estás tocando en este momento, sino la siguiente: así los dedos " +
        "tienen tiempo de prepararse con antelación y la interpretación no se detiene con " +
        "titubeos.",
      "No busques las teclas con la vista. La mano debe recordar la posición de los dedos en el " +
        "teclado, mientras que los ojos permanecen todo el tiempo en la partitura.",
      { caption: "Do, salto a Mi, paso a Re, salto a Fa, paso a Mi, salto a Sol." },
    ],
    practices: {
      "read-1": {
        title: "Práctica 1: pasos y saltos",
        instruction:
          "Lee y toca la melodía siguiendo la partitura, prestando atención al movimiento hacia " +
          "arriba y hacia abajo.",
        doneText: "La melodía de pasos y saltos tocada correctamente.",
      },
      "read-2": {
        title: "Práctica 2: sin ayudas",
        instruction:
          "Las teclas ya no se resaltan: lee las notas por tu cuenta y tócalas en orden.",
        doneText: "Melodía tocada leyendo la partitura sin ayudas.",
      },
      "read-ode": {
        title: "Práctica 3: 'Oda a la alegría'",
        instruction:
          "Este es el comienzo del tema de Beethoven de la Novena Sinfonía. Lee y toca la frase " +
          "siguiendo la partitura.",
        doneText: "El comienzo de la 'Oda a la alegría' tocado leyendo la partitura.",
      },
    },
  },

  "staff-bass": {
    title: "La clave de fa y la lectura con la mano izquierda",
    summary: "La clave de fa para los sonidos graves y la parte de la mano izquierda.",
    blocks: [
      "La clave de fa se usa para los sonidos graves, normalmente la parte de la mano izquierda. " +
        "También fija un punto de referencia: sus dos puntos quedan a ambos lados de la cuarta " +
        "línea, y esa línea es la nota fa3.",
      [
        "En las líneas, de abajo hacia arriba: Sol, Si, Re, Fa, La.",
        "En los espacios, de abajo hacia arriba: La, Do, Mi, Sol.",
        "El Do central está en una línea adicional encima del pentagrama de la clave de fa, " +
          "justo donde termina la línea adicional de la clave de sol: es la misma nota, el punto " +
          "donde se encuentran ambas claves.",
      ],
      "En el teclado de la pantalla, la octava más grave empieza justo en do3, la misma nota que " +
        "ocupa el segundo espacio desde abajo del pentagrama en clave de fa.",
      { caption: "La escala de Do desde do3 en clave de fa: Do, Re, Mi, Fa, Sol." },
    ],
    practices: {
      "bass-names": {
        title: "Práctica 1: la escala en clave de fa",
        instruction: "Toca en orden cinco notas desde do3: Do, Re, Mi, Fa, Sol.",
        doneText: "Escala en clave de fa tocada ascendiendo.",
      },
      "bass-down": {
        title: "Práctica 2: la escala descendiendo",
        instruction: "Ahora toca las mismas cinco notas en orden inverso: Sol, Fa, Mi, Re, Do.",
        doneText: "Escala en clave de fa tocada descendiendo.",
      },
      "bass-melody": {
        title: "Práctica 3: una melodía con la mano izquierda",
        instruction: "Lee y toca una melodía corta en clave de fa sin ayudas en el teclado.",
        doneText: "Melodía en clave de fa tocada leyendo la partitura.",
      },
    },
  },

  "read-melodies": {
    title: "Melodías sencillas a partir de la partitura",
    summary: "Cómo estudiar una melodía desconocida paso a paso: desde observarla hasta tocarla a tempo.",
    blocks: [
      "No conviene tocar una melodía nueva a tempo desde el principio. Hay un orden fiable para " +
        "estudiarla que ahorra tiempo y elimina la mayoría de los errores incluso antes de que " +
        "las manos toquen las teclas.",
      [
        "Primero lee las notas con la vista, sin tocar: busca los pasos, los saltos y las " +
          "frases que se repiten.",
        "Toca la melodía muy despacio, sin metrónomo, cuidando la precisión de las notas.",
        "Enciende el metrónomo a un tempo lento y toca con un ritmo parejo.",
        "Solo después de esto aumenta el tempo poco a poco hasta el deseado.",
      ],
      "Muchas melodías se basan en la repetición: una frase suena dos veces seguidas o vuelve " +
        "más adelante con un pequeño cambio. Al notar la repetición, en realidad aprendes la " +
        "frase una sola vez y no dos.",
      "El botón 'Escuchar' reproduce la grabación del ejercicio al tempo actual del metrónomo: " +
        "úsalo para comprobar si no estás seguro de haber leído bien el ritmo.",
      { caption: "La primera frase de 'Twinkle, twinkle, little star'." },
    ],
    practices: {
      "twinkle-a": {
        title: "Práctica 1: la primera frase de 'Twinkle'",
        instruction: "Toca la primera frase de 'Twinkle, twinkle, little star' leyendo la partitura.",
        doneText: "Primera frase de 'Twinkle' tocada correctamente.",
      },
      "twinkle-b": {
        title: "Práctica 2: la segunda frase de 'Twinkle'",
        instruction: "Toca la segunda frase de la misma melodía leyendo la partitura.",
        doneText: "Segunda frase de 'Twinkle' tocada correctamente.",
      },
      "twinkle-rhythm": {
        title: "Práctica 3: la melodía completa con el metrónomo",
        instruction:
          "Pon el tempo entre 60 y 80 ppm y toca toda la melodía de 'Twinkle, twinkle, little " +
          "star' de principio a fin, cayendo justo en los clics del metrónomo.",
        startHint: "Inicia el metrónomo y después pulsa 'Empezar'.",
        doneText: "Melodía 'Twinkle, twinkle, little star' tocada entera con el metrónomo.",
      },
    },
  },
};
