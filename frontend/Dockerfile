# Базовый образ
FROM node:20

# Создание директории приложения
WORKDIR /app

# Копирование файлов проекта в контейнер
COPY . .

# Установка зависимостей
RUN npm install npm@9.6.5
RUN npm install react-devtools@4.27.4
RUN npm install

# Открытие порта для доступа к приложению
EXPOSE 3000

# Настройка команды запуска приложения в контейнере

CMD ["npm","start"]