# Базовый образ
FROM python:3.9

# Установим зависимости
RUN apt-get update -y && apt-get install -y postgresql postgresql-contrib libpq-dev

# Создаем директорию приложения и перемещаемся в нее 
WORKDIR /app

# Копируем файлы приложения в контейнер
COPY . /app

# Устанавливаем Python зависимости
RUN python -m pip install --upgrade pip && pip install -r requirements.txt

# Создаем пользователя, базу данных и выполняем миграции
RUN service postgresql start &&\
    su - postgres -c "psql -tAc \"SELECT 1 FROM pg_roles WHERE rolname='postgres'\" | grep -q 1 || createuser --superuser postgres && echo \"ALTER USER postgres PASSWORD '123';\" | psql" &&\
    su - postgres -c "psql -lqt | cut -d \| -f 1 | grep -wq postgres || createdb postgres" &&\
    python manage.py db init && \
    python manage.py db migrate && \
    python manage.py db upgrade && \
    python manage.py seed_db


# Копируем файлы WSGI и Gunicorn в контейнер
COPY app app
COPY wsgi.py wsgi.py

# Открываем порт 5000 для приложения
EXPOSE 5000

# Запускаем приложение с WSGI
CMD ["python", "wsgi.py"]