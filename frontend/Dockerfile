# Базовый образ
FROM node:20

# Создание директории приложения
WORKDIR /app

# Копирование файлов проекта в контейнер
COPY . .
 
RUN npm install -g npm@9.6.5
RUN npm install -g react-devtools@4.27.4
# Установка зависимостей
RUN npm install
# RUN npm install -g npm@9.6.5
# RUN npm i axios@^0.21.1
# RUN npm i -g react@^17.0.1
# RUN npm i -g react-dom@^17.0.1
# RUN npm i -g react-redux@^7.2.2
# RUN npm i -g react-router-dom@^5.2.0
# RUN npm i -g react-scripts@^5.0.1
# RUN npm i -g redux@^4.0.5
# RUN npm i -g redux-thunk@^2.3.0
# RUN npm i -g web-vitals@^3.3.1
   
# RUN npm install react-scripts@^5.0.1 -g


# Открытие порта для доступа к приложению
# RUN npm run build
EXPOSE 3000

# Настройка команды запуска приложения в контейнере

CMD ["npm","start"]