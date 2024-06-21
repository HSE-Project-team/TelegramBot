FROM python:3.10

# Create app directory
WORKDIR /payment_docker

# Install app dependencies
COPY payment/payment_requirements.txt ./

RUN pip install -r payment_requirements.txt

# Bundle app source
COPY payment /payment_docker

EXPOSE 8080
CMD [ "python", "main.py" ]