# PrimeTrade - MERN Stack Project

A comprehensive Note-Taking Application built with the MERN stack (MongoDB, Express, React, Node.js). This project implements secure user authentication, role-based access control, and complete CRUD operations for notes.

## 🌟 Key Features

- **User Authentication**: Secure Login and Registration using JWT and Bcrypt.
- **Role-Based Access Control (RBAC)**:
  - **User**: Manage personal notes (Create, Read, Update, Delete).
  - **Admin**: Access to a specialized dashboard to monitor all users.
- **Notes Management**: Dynamic note creation with titles and content.
- **Security**:
  - Helmet for security headers.
  - Express-Mongo-Sanitize to prevent NoSQL injection.
  - XSS-Clean for sanitizing user input.
  - HPP for HTTP Parameter Pollution protection.
- **API Documentation**: Integrated Swagger UI for easy endpoint testing.

## 🛠️ Technology Stack

| Layer        | Technology                  |
| ------------ | --------------------------- |
| **Frontend** | React.js, Vite, Vanilla CSS |
| **Backend**  | Node.js, Express.js         |
| **Database** | MongoDB (Mongoose ODM)      |
| **Auth**     | JWT (JSON Web Tokens)       |
| **Docs**     | Swagger / YAML              |

---

## 🚀 Setup & Installation

### 1. Prerequisites

- Node.js installed on your machine.
- A MongoDB database (Local or Atlas).

### 2. Backend Setup

1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Environment Configuration:
   - Locate `.env.sample` in the `backend` folder.
   - Create a new file named `.env`.
   - Copy the contents from `.env.sample` and fill in your credentials:
     ```env
     PORT=5000
     NODE_ENV=development
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     JWT_EXPIRE=30d
     ```
4. Start the server:
   ```bash
   npm run dev
   ```
   The backend will start on [http://localhost:5000](http://localhost:5000).

### 3. Frontend Setup

1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at [http://localhost:5173](http://localhost:5173).

---

## 🔗 API Reference

Documentation is available at: `http://localhost:5000/api-docs`

| Method | Endpoint                | Description          | Auth Required |
| ------ | ----------------------- | -------------------- | ------------- |
| POST   | `/api/v1/auth/register` | Register new user    | No            |
| POST   | `/api/v1/auth/login`    | Login user           | No            |
| GET    | `/api/v1/notes`         | Get all user's notes | Yes           |
| POST   | `/api/v1/notes`         | Create a note        | Yes           |
| GET    | `/api/v1/users`         | Get all users        | Yes (Admin)   |

---

## 📂 Project Structure

```text
primetrade/
├── backend/            # Express API
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routers/
│   │   └── middlewares/
│   └── docs/           # Swagger config
└── frontend/           # React App
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── context/
```
