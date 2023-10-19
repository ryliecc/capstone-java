FROM openjdk:20

EXPOSE 8080

LABEL authors="ryliecc"

ADD backend/target/budgetapp.jar app.jar

CMD [ "sh", "-c", "java -jar /app.jar" ]