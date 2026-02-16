FROM eclipse-temurin:17-jdk-focal

WORKDIR /app

# Install Maven
RUN apt-get update && \
    apt-get install -y maven && \
    rm -rf /var/lib/apt/lists/*

# Copy ONLY backend folder into container
COPY backend /app

# Build backend
RUN mvn clean package -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "target/jobtracker-0.0.1-SNAPSHOT.jar"]



