# Use official Java 17 image
FROM openjdk:17-jdk-slim

# Set working directory inside container
WORKDIR /app

# Copy the backend folder into the container
COPY . /app

# Build the Spring Boot app (skip tests for faster build)
RUN ./mvnw clean package -DskipTests

# Expose the port your app runs on
EXPOSE 8080

# Run the app using the generated JAR
CMD ["java", "-jar", "target/jobtracker-0.0.1-SNAPSHOT.jar"]
