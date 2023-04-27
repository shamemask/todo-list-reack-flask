# Базовый образ
FROM python:3.9

# Установим зависимости
RUN apt-get update -y && apt-get install -y postgresql postgresql-contrib libpq-dev nginx
RUN service postgresql start -q && sleep 50


# Создаем директорию приложения и перемещаемся в нее 
WORKDIR /app

# Копируем файлы приложения в контейнер
COPY . /app

# Устанавливаем Python зависимости
RUN python -m pip install --upgrade pip && pip install -r requirements.txt
   
# Создаем базу данных, таблицы и миграции
RUN service postgresql start -q && sleep 50 && \
    su - postgres -c "psql -c 'CREATE DATABASE postgres'" && \
    su - postgres -c "psql -c \"CREATE USER postgres WITH PASSWORD '123'\"" && \
    su - postgres -c "psql -c \"GRANT ALL PRIVILEGES ON DATABASE postgres TO postgres \"" && \
    flask db init && \
    flask db migrate && \
    flask db upgrade 


# Открываем порт 80 для Nginx
EXPOSE 80

# Запускаем Nginx и Gunicorn
CMD service nginx start && gunicorn --bind 0.0.0.0:5000 wsgi:app