FROM python:3.10

# Create app directory
WORKDIR /payment_docker

# Install app dependencies
COPY Payment ./
RUN pip install -r payment_requirements.txt

# Bundle app source
COPY Payment /payment_docker

# Устанавливаем переменную окружения для Flask, чтобы он слушал на всех интерфейсах
ENV FLASK_APP=main.py
ENV FLASK_RUN_HOST=0.0.0.0

# Это необходимо для правильного запуска Flask приложения в Docker контейнере
EXPOSE 5000

# Команда для запуска Flask приложения
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
