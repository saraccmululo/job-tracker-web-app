# Use stable Java 17 image
FROM eclipse-temurin:17-jdk-focal

WORKDIR /app

# Install Maven inside container
RUN apt-get update && \
    apt-get install -y maven && \
    rm -rf /var/lib/apt/lists/*

# Copy only backend folder into container
COPY backend/ /app

# Build Spring Boot app (skip tests)
RUN mvn clean package -DskipTests

# Expose Spring Boot port
EXPOSE 8080

# Run the generated JAR
CMD ["java", "-jar", "target/jobtracker-0.0.1-SNAPSHOT.jar"]


