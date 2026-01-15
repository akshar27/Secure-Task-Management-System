# Task Manager – Full Stack Assignment

This project is a full-stack Task Management application built as part of a technical assessment.

It includes:
- A **NestJS backend** with JWT authentication and role-based access
- An **Angular standalone frontend** that consumes secured APIs
- An **Nx monorepo** setup for scalable project structure

---

## 🚀 Tech Stack

**Frontend**
- Angular (Standalone Components)
- HttpClient
- JWT-based authentication

**Backend**
- NestJS
- JWT Auth
- In-memory user store (documented below)

**Tooling**
- Nx Monorepo
- TypeScript

---

## 🔐 Authentication

The backend uses **JWT authentication**.

### Test Users (in-memory for assessment)
| Role  | Email              | Password |
|------|--------------------|----------|
| ADMIN | admin@test.com     | password |
| VIEWER | viewer@test.com   | password |

> Note: Users are stored in-memory to keep the assignment focused and self-contained.

---

## 🧠 Key Design Decisions

- **JWT-based auth** with role included in token payload
- **In-memory users** instead of DB to simplify setup
- **Angular standalone components** for modern architecture
- **CORS enabled** explicitly for frontend-backend communication
- Clear separation of concerns between services and controllers

---

## ▶️ Running the Project

### Backend
```bash
npx nx serve api
