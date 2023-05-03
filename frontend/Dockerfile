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
# EXPOSE 3000

# Настройка команды запуска приложения в контейнере
# CMD ["npm","start"]

# Собираем приложение
RUN npm run build

# Используем легковесный образ Nginx для запуска приложения
FROM nginx:1.20.0-alpine

# Копируем файлы сборки из предыдущего этапа в Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]