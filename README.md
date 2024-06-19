# SloyBot

## Overview

Course project about [Telegram Bot](https://t.me/WebAppFotTestBot) with web app peronal for Sloy Cafe. 
The bot includes the ability to create an order by a certain time, pay for them online, track the status and view the order history.
The bot is integrated with the Sloy Cafe's CRM system and the YooKassa payment system.

## Project Structure and Architecture
The project consists of a front-end built with JavaScript and CSS, and a back-end developed using Java with Spring and a PostgreSQL database. 
It includes a swagger specification to generate the blank server.

### Front-end:
Front-end includes the Telegram web app, which provides the high quality user interface for the bot.  //TODO Ilya

### Back-end:
Back-end consists of a Java REST API built using the Spring framework. The API includes the following components:

Controller: Handles incoming requests from the front-end and delegates the logic to the appropriate service.

Service: Implements the business logic, such as creating orders, processing payments, and retrieving order history.

Repository: Interacts with the PostgreSQL database to store and retrieve data. 

The back-end includes integrations with the iiko CRM system and the YooKassa payment system.

## Installation and Setup
### For user:
Just click on a link [SloyBot](https://t.me/WebAppFotTestBot)

### Front-end:

//TODO Ilya

### Back-end:

1. Clone the repository.
   
2. Create JAR File of project.
  
3. Create a Docker image of the server:
```
docker build -t sloy-order:latest .
```
4. Transfer the Docker image to your host, for example, using Docker Hub:
```
docker tag sloy-order YOURNAME/sloy-order
docker push YOURNAME/sloy-order
docker pull YOURNAME/sloy-order
```
5. Create and run a PostgreSQL database Docker container on the host:
```
docker run --name postgres -e POSTGRES_PASSWORD=1234 -p 5432:5432 -d postgres
```
6. Run the Server Docker container on the host:
```
docker run -t -i -d -p 80:80 YOURNAME/sloy-order
```
7. Set up a domain and SSL certificate for the server, so that telegram can send requests to the server.
