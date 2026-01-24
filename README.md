# 🧠 Mental Wellbeing Application

A full-stack mental wellbeing web application designed to help users manage stress, reflect on their thoughts, and feel connected through a supportive community.

The application provides tools such as journaling, breathing exercises, sleep stories, and an anonymous community space to support emotional and mental health in a safe and user-friendly way.

---

## ✨ Features

- 📝 **Personal Journal**
  - Write and store personal journal entries
  - Helps users reflect on thoughts and emotions privately

- 🌬 **Breathing Exercises**
  - Guided breathing techniques for relaxation and stress relief
  - Easy-to-use and calming interface

- 😴 **Sleep Stories**
  - Relaxing stories designed to help users unwind and improve sleep

- 👥 **Community Section**
  - Post thoughts anonymously
  - Read and engage with posts from other users in a supportive environment

- 🔐 **Secure Backend**
  - RESTful APIs built using Spring Boot
  - Data stored securely in PostgreSQL

---

## 🛠 Tech Stack

### Frontend
- React
- JavaScript
- HTML5
- CSS3

### Backend
- Java
- Spring Boot
- Spring Data JPA
- REST APIs

### Database
- PostgreSQL

---

## 🏗 Architecture Overview

- React frontend communicates with the backend via REST APIs
- Spring Boot backend handles business logic and data persistence
- PostgreSQL is used for storing user data, journal entries, and community posts

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Java 17 or higher
- Node.js and npm
- PostgreSQL
- Maven

---

## 🔧 Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git

2. Navigate to the backend directory:
   ```bash
   cd backend


3. Configure the database in application.properties:

 ```bash
 src/main/resources/application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/your_db_name
spring.datasource.username=your_username
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect





