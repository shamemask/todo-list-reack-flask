# todo-list-reack-flask

# To-Do List приложение

Простое приложение To-Do List, представляет собой список задач с возможностью их добавления, изменения и удаления. Написано на Python с использованием фреймворка Flask.

## Запуск приложения

Для запуска приложения необходимо сначала собрать Docker-образ командой:

```
docker build -t todo-app-backend .
```

После этого можно запустить Docker-контейнер с приложением командой:

```
docker run --name backend -p 5000:5000 -d todo-app-backend
```

Приложение будет доступно на `http://localhost:5000`.

## API на бэкенде

Основная логика приложения находится на бэкенде. Приложение предоставляет следующие API:

- `GET /api/todos` - получение списка задач. Возможно использовать следующие параметры:
  - `_page` - номер страницы (по умолчанию 1);
  - `_limit` - количество задач на странице (по умолчанию 3);
  - `_sort` - поле для сортировки (по умолчанию `"id"`);
  - `_order` - порядок сортировки (`"asc"` или `"desc"`, по умолчанию `"asc"`);
- `GET /api/todos/{id}` - получение задачи по ID;
- `POST /api/todos` - добавление новой задачи. В теле запроса необходимо передать объект задачи в формате JSON:
  ```json
  {
    "name": "Имя пользователя",
    "email": "Email пользователя",
    "text": "Текст задачи"
  }
  ```
- `PUT /api/todos/{id}` - изменение задачи по ID. В теле запроса необходимо передать те поля, которые необходимо изменить. Например:
  ```json
  {
    "text": "Новый текст задачи",
    "done": true
  }
  ```
- `DELETE /api/todos/{id}` - удаление задачи по ID. Возвращает удаленную задачу в виде объекта в формате JSON.


## Запуск Frontend

1. Перейдите в папку frontend из терминала и выполните команду:

```
docker build -t todo-app-frontend .
```

2. Когда Docker завершит сборку контейнера, выполните следующую команду:

```
docker run --name frontend -p 80:80 -d todo-app-frontend
```

3. Откройте веб-браузер и перейдите по адресу `http://localhost`. Ваше приложение React.js должно быть запущено в Docker контейнере.

## Функционал приложения

- Просмотр всех задач на главной странице.
- Добавление новой задачи.
- Редактирование задачи.
- Просмотр подробной информации о задаче.
- Пагинация задач.
- Сортировка задач по имени, электронной почте и статусу (закрыто/открыто).
- Админ панель для авторизации с возможностью редактирования задач.

## API

- `GET /api/todos` - получение всех задач с пагинацией, сортировкой и поиском по имени и электронной почте.
- `GET /api/todos/:id` - получение задачи по ID.
- `POST /api/todos` - создание новой задачи.
- `PATCH /api/todos/:id` - обновление задачи по ID.
