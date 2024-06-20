FROM openjdk:17.0.1-jdk-slim

ARG JAR_FILE=build/libs/*SNAPSHOT.jar

WORKDIR /opt/app

EXPOSE 443

COPY ${JAR_FILE} sloy-order.jar

ENTRYPOINT ["java","-jar","sloy-order.jar"]
