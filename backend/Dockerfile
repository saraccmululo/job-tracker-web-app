# Use valid Java 17 image
FROM eclipse-temurin:17-jdk-focal

WORKDIR /app

# Copy backend folder contents
COPY . /app

# Build the project (skip tests for faster deployment)
RUN ./mvnw clean package -DskipTests

# Expose Spring Boot port
EXPOSE 8080

# Run the generated JAR
CMD ["java", "-jar", "target/jobtracker-0.0.1-SNAPSHOT.jar"]
