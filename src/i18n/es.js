// Испанский словарь интерфейса. Полный перевод, ключи совпадают с RU (src/i18n/ru.js).

export const ES = {
  app: {
    title: "Simple Piano — cuaderno de aprendizaje",
    description: "Simple Piano — cuaderno de aprendizaje: teoría, escala de do mayor, MIDI y metrónomo en el navegador.",
    brand: "Simple Piano",
  },

  nav: {
    label: "Navegación principal",
    home: "Índice",
    scale: "Escala",
    about: "Sobre el proyecto",
  },

  theme: {
    group: "Selección de tema visual",
    light: "Claro",
    dark: "Oscuro",
    notebook: "Cuaderno",
  },

  locale: {
    group: "Selección de idioma",
  },

  workbench: {
    region: "Teclado y ajustes de sonido",
    show: "Mostrar teclado y ajustes",
    hide: "Ocultar teclado y ajustes",
    barInfo: "{bpm} {unit}",
    barInfoRunning: "{bpm} {unit} \u00b7 metrónomo en marcha",
    tempo: "Tempo, ppm",
    bpmUnit: "ppm",
    metronome: "Metrónomo",
    metronomeStop: "Detener metrónomo",
    audioLabel: "Sonido: {status}",
    audioTest: "Probar sonido",
    audioStatus: {
      running: "funcionando",
      suspended: "bloqueado por el navegador — pulsa «Probar sonido»",
      closed: "contexto cerrado",
      unsupported: "el navegador no admite Web Audio",
      error: "error al crear el contexto de audio",
      idle: "aún no se ha iniciado",
    },
    settings: "Ajustes: MIDI, timbre, sonido",
    connectMidi: "Conectar MIDI",
    refreshMidi: "Actualizar lista de dispositivos",
    device: "Dispositivo",
    deviceAria: "Selección de dispositivo MIDI",
    instrument: "Instrumento",
    instrumentAria: "Selección de timbre del instrumento",
    volume: "Volumen, %",
    volumeAria: "Nivel de volumen",
    browserMessage: "Mensaje del navegador: {error}",
    midiSound: "Sonido del sintetizador para MIDI (desactivado por defecto, para no duplicar el sonido de tu teclado)",
  },

  home: {
    kicker: "cuaderno de aprendizaje \u00b7 piano",
    title: "Curso completo: {topics} temas en {lessons} lecciones",
    subtitle:
      "El programa está dividido en seis módulos y {count} lecciones con teoría y práctica en el teclado. " +
      "Avanza en orden: cada lección se apoya en la anterior.",
    progressTitle: "Tu progreso",
    progressHint: "Lecciones completadas: <strong>{done}</strong> de {total}. El progreso se guarda solo en este navegador.",
    continueBtn: "Continuar: {title}",
    startBtn: "Empezar a aprender: {title}",
    resetProgress: "Reiniciar progreso",
    moduleProgress: "Completado {done} de {total}",
    lessonMeta: "Temas del programa: {topics} \u00b7 prácticas: {count}",
    extraTitle: "Extra",
    extraHint:
      "Un entrenador aparte de la escala de do mayor con demostración y teoría breve — apareció antes que las " +
      "lecciones y sigue disponible.",
    scaleTrainer: "Entrenador de la escala de do mayor",
    footerPrivacy: "El progreso se guarda localmente en tu navegador. No se envía nada al servidor.",
    footerRoadmap: "Programa de aprendizaje completo ({topics} temas) —",
    roadmapRu: "hoja de ruta",
    roadmapEn: "roadmap (EN)",
  },

  modules: {
    basics: { title: "Primeros pasos", summary: "Teclado, nombres de las notas, dedos y primer ritmo." },
    reading: { title: "Ritmo y notas", summary: "Duraciones, silencios, el pentagrama y lectura de ambas claves." },
    scales: {
      title: "Escalas y tonalidades",
      summary: "Do mayor a dos manos, alteraciones y otras escalas.",
    },
    harmony: {
      title: "Intervalos y acordes",
      summary: "Tono y semitono, intervalos de oído, tríadas e inversiones.",
    },
    hands: {
      title: "Dos manos y repertorio",
      summary: "Melodía con acompañamiento, lectura a primera vista, trabajo del tempo.",
    },
    mastery: {
      title: "Más profundidad",
      summary: "Menor, arpegios, ritmo complejo, dinámica, pedal y piezas.",
    },
  },

  lesson: {
    crumbHome: "Índice",
    crumbLesson: "Lección {number}",
    kicker: "{module} \u00b7 Lección {number} \u00b7 temas {topics}",
    kickerNoModule: "Lección {number} \u00b7 temas {topics}",
    done: "Lección completada",
    theoryTitle: "Teoría",
    practiceTitle: "Práctica",
    practiceHint: "Toca en el teclado MIDI o con el ratón en las teclas al final de la página. Las teclas necesarias se resaltan.",
    toContents: "Al índice",
    notFoundTitle: "Lección no encontrada",
    notFoundText: "Puede que el enlace esté desactualizado.",
    notFoundLink: "Vuelve al índice",
  },

  practice: {
    limitsSequence:
      "Solo se comprueba automáticamente el orden de las notas. Evalúa tú mismo el ritmo, las duraciones, la " +
      "dinámica y la técnica de las manos.",
    limitsRhythm:
      "Se comprueban las notas y los momentos de entrada según los clics. La retención de las teclas y el " +
      "silencio en las pausas no se comprueban. Las imprecisiones se marcan, pero no impiden terminar el " +
      "ejercicio: evalúa el contador «A tiempo» y los errores.",
    limitsChord:
      "Se comprueba el conjunto de notas dentro de un margen de 1,2 segundos — es una tolerancia para el " +
      "ejercicio, no una evaluación de simultaneidad. Toca las notas juntas; evalúa tú mismo la retención de " +
      "teclas y el trabajo de las manos.",
    start: "Empezar",
    restart: "Empezar de nuevo",
    again: "Otra vez",
    reset: "Reiniciar",
    listen: "Escuchar",
    replaySound: "Repetir sonido",
    rounds: "Vueltas:",
    step: "Paso: <strong>{index}</strong> / {total}",
    round: "Vuelta: <strong>{round}</strong> / {passes}",
    errors: "Errores: <strong>{errors}</strong>",
    inTime: "A tiempo: <strong>{count}</strong>",
  },

  task: {
    defaultStartHint: "Pulsa «Empezar» para comenzar el ejercicio.",
    defaultDoneText: "¡Ejercicio completado!",
    completeDefault: "¡Genial, ejercicio completado!",
    exploreProgress: "Teclas distintas pulsadas: {index} de {total}.",
    setRemaining: "Falta encontrar: {list}",
    chordNamed: "Acorde {title}: {list}",
    chordPlain: "Toca juntas: {list}",
    earQuestion: "Pregunta {n} de {total}: toca la segunda nota que escuchaste.",
    noteNoHints: "Nota {n} de {total}: toca según la partitura, sin pistas.",
    playNote: "Toca: {note}",
    startRhythm: "Activa el metrónomo y toca justo con los clics.",
    startChord: "Con el ratón puedes tocar las notas rápido una tras otra — también cuenta.",
    roundDone: "Vuelta {round} de {passes} completada — toca otra vez.",
    earListen: "Escucha: primero la nota de referencia, luego la segunda.",
    exploreRepeat: "Ya has pulsado esta tecla — prueba con la de al lado.",
    explorePlayed: "Suena {note}.",
    setWrong: "Esto es {note}. Busca las teclas correctas.",
    setAlready: "{note} ya está encontrada.",
    correctNote: "Correcto: {note}.",
    chordWrong: "Nota de más {note} — empezamos el acorde de nuevo.",
    chordDone: "Acorde tomado.",
    chordHold: "Sigue sosteniendo: quedan {count} nota(s).",
    earWrong: "Esto es {note}. Escucha otra vez y compárala con la nota de referencia.",
    earCorrect: "Correcto: {interval}.",
    rhythmNoMetronome: "Primero activa el metrónomo — hay que tocar siguiendo los clics.",
    rhythmBpmRange: "Pon el tempo en {min}\u2013{max} {unit}.",
    rhythmOneNote: "Un clic, una nota. Espera al siguiente clic.",
    rhythmEarly: "Pronto: sostén la nota anterior, quedan {count} tiempos.",
    rhythmLate: "Tarde: la nota debía haber entrado antes. Sigamos adelante.",
    rhythmInTime: "¡A tiempo!",
    rhythmOffBeat: "La nota es correcta, pero fuera de tiempo — escucha el clic.",
    wrongNoteNoHints: "Nota incorrecta — sonó {note}.",
    wrongNote: "Sonó {note}, pero se necesita {expected}.",
  },

  intervals: {
    0: "unísono",
    1: "segunda menor",
    2: "segunda mayor",
    3: "tercera menor",
    4: "tercera mayor",
    5: "cuarta justa",
    6: "tritono",
    7: "quinta justa",
    8: "sexta menor",
    9: "sexta mayor",
    10: "séptima menor",
    11: "séptima mayor",
    12: "octava",
  },

  scale: {
    crumbTitle: "Entrenador de escala",
    kicker: "extra \u00b7 temas 19\u201320",
    title: "Escala de do mayor, una octava",
    summary:
      "Do – Re – Mi – Fa – Sol – La – Si – Do. Toca las notas en orden con la mano elegida, en el teclado MIDI o " +
      "con el ratón en las teclas al final de la página.",
    exerciseTitle: "Ejercicio",
    handLegend: "Mano",
    handRight: "Derecha",
    handLeft: "Izquierda",
    start: "Empezar",
    reset: "Reiniciar",
    playDemo: "Reproducir demostración",
    stopDemo: "Detener demostración",
    demoHint: "La demostración toca la escala completa y resalta las teclas.",
    theoryTitle: "Teoría breve",
    theoryNavAria: "Temas de teoría",
  },

  about: {
    crumbTitle: "Sobre el proyecto",
    kicker: "sobre el proyecto",
    title: "Qué es Simple Piano",
    lead:
      "Simple Piano es un curso de piano gratuito que funciona directamente en el navegador. No hay que descargar " +
      "ni instalar nada y no hace falta registrarse: abres la página y empiezas a tocar.",
    howTitle: "Cómo funciona",
    howItems: [
      "Siempre tienes un teclado en la parte inferior de la pantalla. Puedes tocarlo con el ratón, con el dedo en el móvil o conectar un teclado MIDI real.",
      "Cada lección es una explicación breve seguida de práctica. La aplicación escucha lo que tocas y te avisa cuando la nota no es la correcta.",
      "Al lado están el metrónomo y la elección del sonido: piano de cola, piano eléctrico, órgano, cuerdas, caja de música.",
      "Las lecciones terminadas se marcan con una señal, así siempre ves dónde te quedaste.",
    ],
    whoTitle: "Para quién es",
    whoItems: [
      "Para quien empieza desde cero y quiere explicaciones claras y sin tecnicismos.",
      "Para quien estudió alguna vez y quiere repasar notas, escalas y acordes.",
      "Para quien toma clases con un profesor y busca un entrenador para practicar en casa.",
      "Para madres y padres que quieren probar la música con su hijo antes de comprar un instrumento.",
    ],
    learnTitle: "Qué vas a aprender",
    learnText:
      "El cuaderno tiene {lessons} lecciones agrupadas en {modules} módulos: desde la primera tecla que pulsas " +
      "hasta la lectura de notas, las escalas, los acordes, tocar con las dos manos y tus primeras piezas sencillas. " +
      "Las lecciones se apoyan unas en otras, así que es mejor no saltárselas.",
    needTitle: "Qué necesitas para empezar",
    needItems: [
      "Cualquier navegador moderno en un ordenador, una tableta o un móvil.",
      "Auriculares o altavoces: el sonido lo genera el propio navegador, no se descarga nada.",
      "El teclado MIDI es opcional. Sin él todo funciona igual, solo que tocarás con el ratón o con el dedo.",
      "De 15 a 20 minutos al día. La práctica corta y regular rinde más que las sesiones largas y esporádicas.",
    ],
    privacyTitle: "Privacidad y precio",
    privacyText:
      "El proyecto es gratuito, sin publicidad y sin cuentas de usuario. Tu progreso, el idioma y el tema se " +
      "guardan solo en tu navegador y no se envían a ningún sitio. A cambio: si borras los datos del navegador " +
      "o abres el sitio en otro dispositivo, el progreso empieza de nuevo.",
    startTitle: "Por dónde empezar",
    startText:
      "Abre el índice y empieza por la primera lección, que explica cómo está organizado el teclado. " +
      "Si ya conoces las notas, pasa directamente al entrenador de escalas.",
    ctaHome: "Ir a las lecciones",
    ctaScale: "Entrenador de escala",
  },

  exercise: {
    pressStart: "Pulsa «Empezar» para comenzar el ejercicio.",
    playNote: "Toca: {note} (dedo {finger} de la mano {hand})",
    handRight: "derecha",
    handLeft: "izquierda",
    started: "Ejercicio iniciado. Toca la primera nota.",
    correct: "¡Correcto! Toca la siguiente nota.",
    wrong: "Nota incorrecta (tocaste {played}, se necesita {expected}). Inténtalo de nuevo.",
    scaleComplete: "¡Escala completada!",
    finished: "Ejercicio terminado.",
    result: "Resultado: escala de do mayor completada con la mano {hand}, errores: {errors}.",
    notSaved: "(No se pudo guardar el resultado en este navegador.)",
    previousResult: "Completado antes ({date}): mano {hand}, errores: {errors}.",
  },

  midi: {
    notConnected: "El MIDI aún no está conectado.",
    unsupported: "Este navegador no admite la Web MIDI API. Prueba con Chrome, Edge u Opera actualizados en un ordenador.",
    insecure: "Web MIDI requiere un contexto seguro: abre la página mediante https:// o http://localhost.",
    connecting: "Solicitando acceso al MIDI...",
    accessError: "No se pudo acceder al MIDI: {message}.",
    requestDenied: "solicitud rechazada",
    noDevices: "No se encontraron dispositivos MIDI. Conecta el teclado y pulsa «Actualizar lista de dispositivos».",
    connected: "Conectado: {name}.",
    disconnected: "El dispositivo «{name}» se ha desconectado.",
  },

  synth: {
    unsupported: "El navegador no admite la Web Audio API.",
  },

  staff: {
    treble: "Clave de sol",
    bass: "Clave de fa",
    rest: "silencio",
  },

  piano: {
    aria: "Teclado de piano, dos octavas desde el do de la cuarta octava",
  },

  instruments: {
    piano: {
      label: "Piano",
      hint: "Timbre percutido con caída y pérdida de brillo — el más parecido a un piano acústico.",
    },
    epiano: {
      label: "Piano eléctrico",
      hint: "Timbre suave y acampanado al estilo Rhodes.",
    },
    organ: {
      label: "Órgano",
      hint: "El sonido se mantiene constante mientras la tecla está pulsada — cómodo para escuchar intervalos y acordes.",
    },
    strings: {
      label: "Cuerdas",
      hint: "Ataque suave y resonancia prolongada — bueno para trabajar el legato.",
    },
    musicbox: {
      label: "Caja de música",
      hint: "Sonido corto y brillante — se notan incluso las notas más rápidas.",
    },
    synth: {
      label: "Sintetizador simple",
      hint: "El tono puro original de la aplicación: un único oscilador triangular sin caída.",
    },
  },

  theory: {
    "notes-octaves": {
      title: "Notas y octavas",
      html:
        "<h3>Notas y octavas</h3>" +
        "<p>En música se usan siete notas básicas: do, re, mi, fa, sol, la, si. Después de si se repite do, pero " +
        "una octava más arriba — suena igual, pero más agudo. Un piano normalmente abarca más de siete octavas.</p>" +
        "<p>Para distinguir notas iguales en distintas octavas, se añade un número al nombre: do4 (a veces " +
        "llamado «do de la primera octava» o middle C) — una nota situada aproximadamente en el centro del " +
        "teclado, ideal para empezar el aprendizaje.</p>",
    },
    "sharps-flats": {
      title: "Sostenidos y bemoles",
      html:
        "<h3>Sostenidos y bemoles</h3>" +
        "<p>Las teclas negras del piano son sostenidos (\u266f, medio tono más agudo que la nota vecina) y " +
        "bemoles (medio tono más grave). Por ejemplo, la tecla negra entre do y re es do\u266f (do sostenido) o " +
        "re bemol — la misma tecla, dos nombres distintos según el contexto.</p>" +
        "<p>Entre do y el siguiente do (la octava) hay 12 semitonos: 7 teclas blancas y 5 negras. Fíjate en que " +
        "entre mi y fa, y también entre si y do, no hay teclas negras — ya son semitonos completos.</p>",
    },
    "keyboard-layout": {
      title: "El teclado del piano",
      html:
        "<h3>Cómo está organizado el teclado</h3>" +
        "<p>Las teclas negras están agrupadas de dos en dos y de tres en tres. El grupo de dos teclas negras " +
        "está entre do-re y re-mi. Justo después del grupo de dos teclas negras, a su izquierda, está la tecla " +
        "blanca do.</p>" +
        "<p>Esta es la forma más fiable de encontrar el do en cualquier teclado: busca el grupo de dos teclas " +
        "negras, y la tecla blanca a su izquierda es el do.</p>",
    },
    "c-major-scale": {
      title: "Escala de do mayor",
      html:
        "<h3>Escala de do mayor</h3>" +
        "<p>La escala de do mayor es la secuencia do, re, mi, fa, sol, la, si, do, tocada solo con las teclas " +
        "blancas. Está formada por tonos y semitonos en el orden: tono-tono-semitono-tono-tono-tono-semitono.</p>" +
        "<p>Es la escala más sencilla para empezar a aprender, porque no usa teclas negras. Prueba a tocarla en " +
        "la sección «Ejercicio» más abajo — con la mano derecha o izquierda, con la digitación correcta (números " +
        "de dedos).</p>",
    },
    "note-durations": {
      title: "Duración de las notas",
      html:
        "<h3>Duración de las notas</h3>" +
        "<p>La duración indica cuánto tiempo suena una nota. La redonda es la más larga, la blanca dura la " +
        "mitad que la redonda, la negra la mitad que la blanca, la corchea la mitad que la negra.</p>" +
        "<p>Las duraciones se cuentan unas en relación con otras, no en segundos: el tiempo concreto depende del " +
        "tempo (la velocidad) de la interpretación, que marca el metrónomo.</p>",
    },
    "metronome-tempo": {
      title: "Metrónomo y tempo",
      html:
        "<h3>Metrónomo y tempo</h3>" +
        "<p>El metrónomo marca un pulso constante a una velocidad determinada — el tempo, que se mide en " +
        "pulsaciones por minuto (ppm, beats per minute o BPM). Cuanto mayor es el número, más rápido es el " +
        "tempo.</p>" +
        "<p>Tocar con el metrónomo es útil para desarrollar un ritmo uniforme y estable, y no acelerar ni " +
        "ralentizar sin querer. Prueba a activar el metrónomo en la sección «Demostración y metrónomo» y busca " +
        "un tempo cómodo.</p>",
    },
  },
};
