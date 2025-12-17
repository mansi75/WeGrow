# ================= FRONTEND BUILD (React + Vite) =================
FROM node:20-alpine AS frontend-build

# Work inside /frontend (matches your repo structure)
WORKDIR /frontend

# 1. Copy only package files first to leverage Docker cache
COPY frontend/package*.json ./

# 2. Install deps (includes devDependencies so vite is available)
RUN npm ci --include=dev || npm install --include=dev

# 3. Copy the rest of the frontend source
COPY frontend/ .

# 4. API base (optional – Render can inject this)
ARG VITE_API_BASE
ENV VITE_API_BASE=${VITE_API_BASE}

# 5. Build static bundle
RUN npm run build


# ================= BACKEND BUILD (Spring Boot) =================
FROM maven:3.9-eclipse-temurin-17 AS backend-build

WORKDIR /app

# 1. Copy pom and download deps
COPY backend/pom.xml .
RUN mvn -q -DskipTests dependency:go-offline

# 2. Copy rest of backend and build jar
COPY backend/ .
RUN mvn -q -DskipTests package


# ================= RUNTIME IMAGE =================
# ================= RUNTIME IMAGE =================
FROM eclipse-temurin:17-jre-jammy
# or, alternatively:
# FROM eclipse-temurin:17-jre
# or:
# FROM openjdk:17-jdk-slim


WORKDIR /app

# 1. Copy backend jar
COPY --from=backend-build /app/target/*.jar app.jar

# 2. Copy built frontend files into /app/static
COPY --from=frontend-build /frontend/dist /app/static/

EXPOSE 10000

ENV JAVA_OPTS=""

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
