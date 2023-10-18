FROM openjdk:20

EXPOSE 8080

LABEL authors="ryliecc"

ADD backend/target/backend-0.0.1-SNAPSHOT.jar app.jar

CMD [ "sh", "-c", "java -jar /app.jar" ]