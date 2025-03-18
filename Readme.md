# Task Management System

## Overview

This project is a **Task Management System** that allows users to register and log in using **JWT authentication**. Once logged in, users receive a token, which is required for making requests to the backend. The system provides functionality for:

- Adding and viewing agents.
- Uploading CSV files with validation.
- Automatically distributing tasks to agents.
- Storing uploaded files in **Cloudinary** for easy access.
- Maintaining a structured database schema to track agents, files, and tasks efficiently.

---

## Features

### **Authentication (JWT & Bearer Token)**

- Users can **register** and **log in** securely using **JWT authentication**.
- Upon login, a **JWT token** is issued, which must be used in requests to access protected routes.
- The backend uses **middleware** to verify the token and authenticate the user.

### **Agent Management**

- Users can **add agents** who will be assigned tasks.
- Users can also **view all added agents** (additional feature).

### **CSV Upload & Task Allocation**

- Users can upload **CSV files** containing task data.
- The system **validates** the CSV file before processing.
- After uploading, tasks are **automatically assigned** to available agents.
- Users can view the **uploaded CSV files** via **Cloudinary storage**.
- Cloudinary ensures that all uploaded files are accessible anytime.

### **Database Structure**

- Uses **MongoDB** for efficient data storage.
- The **user schema** tracks all created agents and uploaded files.
- The **task schema** is linked to both users and agents for better task management.
- Tasks are stored separately and reference the assigned agent and user, making them **manageable and easy to track**.

### **Error Handling & Validation**

- Proper **input validation** ensures that only correct data is processed.
- **Error handling** is implemented to prevent system crashes and provide meaningful error messages.
- Ensures smooth **handling of CSV files** and invalid inputs.

### **User Interface (UI)**

- A well-designed and **user-friendly interface** using **React.js / Next.js**.
- Allows easy navigation between features.

---

## Technologies Used

- **Backend:** Node.js, Express.js
- **Frontend:** React.js / Next.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token) & Bearer Token
- **Storage:** Cloudinary (for uploaded CSV files)
- **CSV Parsing:** `csv-parser` / `xlsx`
- **Validation & Error Handling:** Express Middleware

---

## Setup & Installation

### **1. Clone the Repository**

```sh
git clone https://github.com/Rudresh1604/Task-Management-System/
cd task-management
```

### **2. Install Dependencies**

#### **Backend**

```sh
cd Backend
npm install
```

#### **Frontend**

```sh
cd Frontend
npm install
```

### **3. Configure Environment Variables**

Create a `.env` file in the Backend directory and add the following configuration:

```env
PORT=5000
MONGO_URL=mongodb+srv://Rudresh:ChTNqsBlJQmAoF1H@cluster0.uzfvame.mongodb.net/Task
SESSION_KEY=Rud9021
JWT_KEY = secret
CLOUDINARY_NAME=dlrkmnr7f
CLOUDINARY_API_KEY=172786718917656
CLOUDINARY_API_SECRET=pkyyEhiu6J-3ns9YSSG1nb1wKY4
```

Create a `.env` file in the Frontend directory and add the following configuration:

```env
VITE_BACKEND_PORT=5000
VITE_BACKEND_URL=http://localhost:5000

```

### **4. Run the Application**

#### **Start Backend**

```sh
cd Backend
nodemon index
```

#### **Start Frontend**

```sh
cd Frontend
npm run dev
```

### **5. API Endpoints**

| Method | Endpoint             | Description              |
| ------ | -------------------- | ------------------------ |
| POST   | `/api/auth/register` | Register a new user      |
| POST   | `/api/auth/login`    | User login & receive JWT |
| POST   | `/api/agents`        | Add a new agent          |
| GET    | `/api/agents`        | View all agents          |
| POST   | `/api/upload-csv`    | Upload a CSV file        |
| GET    | `/api/tasks`         | View allocated tasks     |

---

## Future Improvements

- **Advanced Analytics:** Provide insights on task distribution and agent performance.
- **Role-Based Access Control (RBAC):** Implement different permission levels.
- **Notifications System:** Alert users when tasks are assigned.

---

## Conclusion

This **Task Management System** provides a seamless experience for managing agents, tasks, and file uploads using JWT authentication, Cloudinary storage, and MongoDB. It ensures **secure authentication**, **automated task assignment**, and **efficient data tracking**.


