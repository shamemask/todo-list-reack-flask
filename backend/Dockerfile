# Базовый образ
FROM python:3.9

# Создание директории приложения
WORKDIR /app

# Копирование файлов проекта в контейнер
COPY . .

# Обновление pip
RUN python -m pip install --upgrade pip

# Установка зависимостей
RUN pip install -r requirements.txt

# Открытие порта для взаимодействия с клиентским приложением
EXPOSE 5000

# Настройка команды запуска приложения в контейнере

CMD ["flask", "run"]