FROM eclipse-temurin:17-jre-alpine

WORKDIR /tathyfestas

# Copia todo o conteúdo do diretório atual (onde está seu Dockerfile) para o diretório de trabalho no contêiner
COPY . .

# Compila e empacota o aplicativo Spring Boot usando Gradle, excluindo testes
RUN apt-get update && apt-get install -y dos2unix
RUN dos2unix gradlew


# Comando para iniciar a aplicação Spring Boot
CMD ["java", "-jar", "build/libs/tathyfestas-01.01.1-SNAPSHOT.jar"]

# Expõe a porta 8080, que é comumente usada por aplicativos Spring Boot
EXPOSE 8080