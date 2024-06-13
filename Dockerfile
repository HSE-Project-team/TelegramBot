FROM python:3.10

# Create app directory
WORKDIR /Bot_docker

# Install app dependencies
COPY Bot/requirements.txt ./

RUN pip install -r requirements.txt

# Bundle app source
COPY Bot /Bot_docker

EXPOSE 8080
CMD [ "python", "main.py" ]