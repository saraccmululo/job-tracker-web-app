# Use a stable Java 17 image
FROM eclipse-temurin:17-jdk-focal

WORKDIR /app

# Copy backend folder into container
COPY . /app

# Make Maven wrapper executable
RUN chmod +x mvnw

# Build the Spring Boot app (skip tests for speed)
RUN ./mvnw clean package -DskipTests

# Expose Spring Boot port
EXPOSE 8080

# Run the generated JAR
CMD ["java", "-jar", "target/jobtracker-0.0.1-SNAPSHOT.jar"]
