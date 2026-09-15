# Как помочь проекту / Contributing

[English version below](#contributing-english)

## Что нужно для работы

Все зависимости ставятся внутри Docker, `npm install` на хосте не нужен.

```bash
git clone https://github.com/foxzi/simplepiano.git
cd simplepiano
docker compose up -d
```

Приложение поднимется на `http://127.0.0.1:5174/`.
Остановить: `docker compose down`.

## Перед отправкой изменений

Обязательно прогоните тесты и сборку:

```bash
docker compose run --rm app sh -c 'npm test && npm run build'
```

`npm test` проверяет данные уроков, полноту словарей на трёх языках и
регрессии звука. Сборка должна проходить без предупреждений.

## Правила

- Один коммит — одна задача. Сообщения на английском, в стиле
  Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `test:`).
- Не добавляйте код «на будущее»: пишите только то, что нужно текущей
  задаче, держитесь принципа KISS.
- Новые строки интерфейса добавляйте сразу во все три словаря:
  `src/i18n/ru.js`, `src/i18n/en.js`, `src/i18n/es.js`.
- Новые уроки описывайте в `src/constants/lessons/` вместе с переводами
  в `src/constants/lessons/i18n/`.
- Документация — в каталоге `docs/`, на русском и английском.
- Внешние зависимости времени выполнения не добавляются: кроме Vue,
  приложение обходится своими силами.

## Сообщения об ошибках

В issue укажите браузер и его версию, операционную систему, модель
MIDI-клавиатуры (если проблема связана с MIDI) и шаги воспроизведения.

---

# Contributing (English)

## Getting started

All dependencies are installed inside Docker, so `npm install` on the host
is not required.

```bash
git clone https://github.com/foxzi/simplepiano.git
cd simplepiano
docker compose up -d
```

The app is served at `http://127.0.0.1:5174/`.
Stop it with `docker compose down`.

## Before you submit

Always run the tests and the production build:

```bash
docker compose run --rm app sh -c 'npm test && npm run build'
```

`npm test` validates lesson data, dictionary coverage across the three
languages and the audio regressions. The build must finish without
warnings.

## Rules

- One commit, one change. Write messages in English following
  Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `test:`).
- Do not add code for hypothetical future needs: keep it KISS and scoped
  to the task at hand.
- Every new interface string goes into all three dictionaries:
  `src/i18n/ru.js`, `src/i18n/en.js`, `src/i18n/es.js`.
- New lessons live in `src/constants/lessons/` with translations in
  `src/constants/lessons/i18n/`.
- Documentation belongs in `docs/`, in both Russian and English.
- No new runtime dependencies: apart from Vue the app stands on its own.

## Reporting bugs

In the issue, state the browser and its version, the operating system,
the MIDI keyboard model when the problem involves MIDI, and the steps to
reproduce.
