# Use a stable Java 17 image
FROM eclipse-temurin:17-jdk-focal

WORKDIR /app

# Install Maven inside container
RUN apt-get update && \
    apt-get install -y maven && \
    rm -rf /var/lib/apt/lists/*

# Copy backend folder into container
COPY . /app

# Build Spring Boot app (skip tests for speed)
RUN mvn clean package -DskipTests

# Expose Spring Boot port
EXPOSE 8080

# Run the generated JAR
CMD ["java", "-jar", "target/jobtracker-0.0.1-SNAPSHOT.jar"]
