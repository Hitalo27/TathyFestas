FROM openjdk:21
MAINTAINER Hitalo Silveira
ARG JAR_FILE=build/libs/tathyfestas-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} tathyfestas-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "tathyfestas-0.0.1-SNAPSHOT.jar"]