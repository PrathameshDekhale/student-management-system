# Student Management System

## Overview

A Full Stack Student Management System built using React.js, Node.js, Express.js, Prisma ORM, and SQLite.

The application allows users to manage students and their marks through a clean user interface and REST APIs.

---

## Features

### Student Management

* Create Student
* View Students
* Update Student
* Delete Student

### Marks Management

* Add Marks for Students
* View Student Marks

### Additional Features

* Search Students
* Pagination API
* Pagination UI
* Responsive Bootstrap Interface

---

## Tech Stack Used

### Frontend

* React.js
* Axios
* Bootstrap
* Vite

### Backend

* Node.js
* Express.js

### Database

* Prisma ORM
* SQLite

### Tools

* Git
* GitHub
* Postman

---

## Architecture Explanation

The application follows a three-layer architecture:

### Frontend Layer

React.js handles the user interface and communicates with backend APIs using Axios.

### Backend Layer

Express.js exposes REST APIs for student and marks management.

### Database Layer

Prisma ORM handles database operations and manages relationships between Student and Mark entities.

### Data Flow

React Frontend
↓
Express REST APIs
↓
Prisma ORM
↓
SQLite Database

---

## Database Design

### Student Table

| Field | Type    |
| ----- | ------- |
| id    | Integer |
| name  | String  |
| email | String  |
| age   | Integer |

### Mark Table

| Field     | Type    |
| --------- | ------- |
| id        | Integer |
| subject   | String  |
| score     | Integer |
| studentId | Integer |

Relationship:

One Student can have Multiple Marks.

Student (1) → (Many) Marks

---

## API Endpoints

### Student APIs

GET /api/students

GET /api/students/:id

POST /api/students

PUT /api/students/:id

DELETE /api/students/:id

### Marks APIs

POST /api/marks

### Pagination

GET /api/students?page=1&limit=5

---

## Setup Instructions

### Clone Repository

git clone https://github.com/PrathameshDekhale/student-management-system.git

---

### Backend Setup

cd backend

npm install

npx prisma generate

npx prisma migrate dev

npm run dev

Backend runs on:

http://localhost:5000

---

### Frontend Setup

cd frontend

npm install

npm run dev

Frontend runs on:

http://localhost:5173

---

## Assumptions Made

* SQLite was used for quick local development and testing.
* Prisma ORM was used to simplify database access and migrations.
* Pagination size defaults to 5 records per page.
* Authentication and authorization were considered out of scope for this assignment.
* The application focuses on demonstrating CRUD operations, database design, pagination, and frontend-backend integration.

---

## Author

Prathamesh Dhekale
