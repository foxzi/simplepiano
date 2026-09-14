# Simple Piano

Simple Piano — учебная тетрадь для изучения основ фортепиано.
Работает целиком в браузере, без бэкенда.

[English version below](#simple-piano-english)

## Что внутри

- 32 урока и 86 практических заданий, покрывающих 48 тем программы:
  от посадки за инструментом до интервалов, аккордов и игры двумя руками.
- Экранная клавиатура с поддержкой MIDI-клавиатур и синтезаторов
  через Web MIDI, плюс ввод мышью и с клавиатуры компьютера.
- Тренажёр гаммы до мажор в одну октаву и справочник теории.
- Звук на Web Audio: тембры задаются пресетами аддитивного синтеза,
  сэмплы не используются.
- Три темы оформления: светлая, тёмная и «тетрадь».
- Три языка: русский, английский и испанский — переводятся и интерфейс,
  и все уроки, и названия нот (До / C / Do).
- Прогресс уроков, выбранная тема, язык и настройки хранятся в `localStorage`.

Стек: Vue 3 + Vite. Зависимостей времени выполнения, кроме Vue, нет.

## Запуск

Все зависимости ставятся внутри Docker, `npm install` на хосте не нужен.

Режим разработки с горячей перезагрузкой:

```bash
docker compose up -d
```

Приложение будет доступно на `http://127.0.0.1:5174/`.
Остановить: `docker compose down`.

Продакшн-сборка в каталог `dist/`:

```bash
docker compose run --rm app npm run build
```

Однофайловая офлайн-сборка:

```bash
docker compose run --rm app npm run build:offline
```

Результат — `dist-offline/simple-piano.html` (около 564 КБ). Этот файл
открывается двойным кликом из файлового менеджера, без веб-сервера и без
интернета: код, стили и шрифты вшиты внутрь HTML.

Web MIDI работает в Chrome и других браузерах на Chromium; в Firefox и
Safari он недоступен независимо от способа запуска.

## Документация

- [Русская документация](docs/ru/README.md),
  [мультиязычность](docs/ru/I18N.md) и
  [дорожная карта](docs/ru/ROADMAP.md)
- [English documentation](docs/en/README.md),
  [localization](docs/en/I18N.md) and
  [roadmap](docs/en/ROADMAP.md)

---

# Simple Piano (English)

Simple Piano is a web app for learning piano basics.
Runs entirely in the browser, with no backend.

## What is inside

- 32 lessons and 86 practice tasks covering the 48 topics of the
  curriculum, from sitting at the instrument to intervals, chords and
  playing with both hands.
- On-screen keyboard with support for MIDI keyboards and synthesizers
  over Web MIDI, plus mouse and computer keyboard input.
- A one-octave C major scale trainer and a theory reference.
- Web Audio sound: timbres are defined by additive synthesis presets,
  no samples are used.
- Three themes: light, dark and notebook.
- Three languages: Russian, English and Spanish — the interface, every
  lesson and the note names (До / C / Do) are all translated.
- Lesson progress, selected theme, language and settings are kept in `localStorage`.

Stack: Vue 3 + Vite. Vue is the only runtime dependency.

## Running

All dependencies are installed inside Docker, so `npm install` on the host
is not required.

Development server with hot reload:

```bash
docker compose up -d
```

The app is served at `http://127.0.0.1:5174/`.
Stop it with `docker compose down`.

Production build into `dist/`:

```bash
docker compose run --rm app npm run build
```

Single file offline build:

```bash
docker compose run --rm app npm run build:offline
```

The result is `dist-offline/simple-piano.html` (about 564 KB). Open it by
double-clicking in a file manager: no web server and no internet access
are needed, since code, styles and fonts are inlined into the HTML.

Web MIDI works in Chrome and other Chromium based browsers; Firefox and
Safari do not support it regardless of how the app is started.

## Documentation

- [English documentation](docs/en/README.md),
  [localization](docs/en/I18N.md) and
  [roadmap](docs/en/ROADMAP.md)
- [Русская документация](docs/ru/README.md),
  [мультиязычность](docs/ru/I18N.md) и
  [дорожная карта](docs/ru/ROADMAP.md)
