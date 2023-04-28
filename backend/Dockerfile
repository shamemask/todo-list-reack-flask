# Базовый образ
FROM python:3.9

# Установим зависимости
RUN apt-get update -y && apt-get install -y postgresql postgresql-contrib libpq-dev nginx

# Создаем директорию приложения и перемещаемся в нее 
WORKDIR /app

# Копируем файлы приложения в контейнер
COPY . /app

# Устанавливаем Python зависимости
RUN python -m pip install --upgrade pip && pip install -r requirements.txt
   
# Запускаем PostgreSQL и создаем базу данных, пользователя и миграции
RUN service postgresql start && sleep 5 && \
    # su - postgres -c "psql -c 'CREATE DATABASE postgres'" && \
    # su - postgres -c "psql -c 'CREATE USER postgres WITH PASSWORD '\''123'\'''" && \
    # su - postgres -c "psql -c \"GRANT ALL PRIVILEGES ON DATABASE postgres TO postgres \"" && \
    su - postgres -c "psql -c 'ALTER USER postgres WITH PASSWORD '\''123'\'''" && \
    flask db init && \
    flask db migrate && \
    flask db upgrade


# Открываем порт 5000 для Nginx
EXPOSE 5000

# Запускаем Nginx и Gunicorn
CMD service postgresql start && service nginx start && gunicorn --bind 0.0.0.0:5000 wsgi:app
