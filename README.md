# Habit Tracker API

A backend API built using **Node.js** and **MongoDB** to manage user authentication, habit management, daily reminders, and admin functionality. This API follows the **MVC** architecture and implements **JWT-based authentication**.

---

## Table of Contents

1. [Features](#features)
2. [Technologies](#technologies)
3. [Project Structure](#project-structure)
4. [Setup Instructions](#setup-instructions)
5. [Environment Variables](#environment-variables)
6. [API Routes](#api-routes)
    - [Authentication](#authentication)
    - [Habit Management](#habit-management)
    - [Admin Controls](#admin-controls)
7. [Cron Job](#cron-job)
8. [Running the Project](#running-the-project)
9. [Postman Collection](#postman-collection)
10. [Deployment](#deployment)
11. [License](#license)

---

## Features

- **User Authentication**: Secure login and registration using JWT tokens.
- **Habit Management**: Users can create, update, view, and delete habits. Habit data includes streaks, daily progress, and frequency settings.
- **Reminders**: A cron job is set up to send daily reminders to users with pending habits.
- **Admin Controls**: Admins can view all users, habit stats, and create habit templates that users can adopt.
- **Role-Based Access Control**: Role-based authorization with user and admin roles.
  
---

## Technologies

- **Node.js**: JavaScript runtime environment for server-side code.
- **Express.js**: Web framework for building the RESTful API.
- **MongoDB**: NoSQL database for storing user and habit data.
- **Mongoose**: ODM for MongoDB for data modeling.
- **JWT (JSON Web Tokens)**: For user authentication and authorization.
- **bcrypt.js**: For hashing passwords.
- **node-cron**: For scheduling recurring tasks (habit reminders).
- **dotenv**: For loading environment variables.

---

## Project Structure

```
/backend-api
├── /config            # Database connection
├── /controllers       # Handles business logic for various routes
├── /models            # Mongoose models for MongoDB collections
├── /routes            # Route definitions for different resources
├── /middleware        # Authentication and authorization logic
├── /cron              # Cron job for sending habit reminders
├── /utils             # Utility functions like notification service
├── .env               # Environment variables
├── index.js          # Main server entry point
└── package.json       # Project dependencies and scripts
```

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/habit-tracker-api.git
cd habit-tracker-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following variables:

```
DB_URI=mongodb://localhost:27017/habit-tracker
JWT_SECRET=yourSecretKeyHere
PORT=5000
```

### 4. Start the Development Server

Make sure you have **nodemon** installed globally for development:

```bash
npm install -g nodemon
```

Then, run the server using:

```bash
nodemon index.js
```

The API will now be running on `http://localhost:5000`.

---

## Environment Variables

The following environment variables need to be configured in a `.env` file:

| Variable      | Description                                          |
| ------------- | ---------------------------------------------------- |
| `DB_URI`      | The MongoDB connection URI                           |
| `JWT_SECRET`  | Secret key for signing JWT tokens                    |
| `PORT`        | The port on which the server will run (default: 5000)|

---

## API Routes

### 1. Authentication

#### `POST /api/auth/register`

- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "yourPassword"
  }
  ```
- **Response**: `201 Created`
  ```json
  {
    "message": "User registered successfully"
  }
  ```

#### `POST /api/auth/login`

- **Description**: Login with email and password.
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "yourPassword"
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "token": "your.jwt.token"
  }
  ```

---

### 2. Habit Management

#### `GET /api/habits`

- **Description**: Get all habits of the logged-in user.
- **Authorization**: Bearer Token required in `Authorization` header.
- **Response**: `200 OK`
  ```json
  [
    {
      "_id": "habitId",
      "name": "Workout",
      "description": "Daily exercise",
      "frequency": "daily",
      "streak": 5,
      "userId": "userId"
    }
  ]
  ```

#### `POST /api/habits`

- **Description**: Create a new habit for the logged-in user.
- **Request Body**:
  ```json
  {
    "name": "Workout",
    "description": "Daily exercise",
    "frequency": "daily"
  }
  ```
- **Response**: `201 Created`
  ```json
  {
    "_id": "habitId",
    "name": "Workout",
    "description": "Daily exercise",
    "frequency": "daily",
    "streak": 0,
    "userId": "userId"
  }
  ```

#### `PUT /api/habits/:id`

- **Description**: Update a habit by its ID.
- **Request Body** (example for updating streak):
  ```json
  {
    "streak": 6
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "_id": "habitId",
    "name": "Workout",
    "streak": 6,
    "userId": "userId"
  }
  ```

#### `DELETE /api/habits/:id`

- **Description**: Delete a habit by its ID.
- **Response**: `200 OK`
  ```json
  {
    "message": "Habit deleted successfully"
  }
  ```

---

### 3. Admin Controls

#### `GET /api/admin/users`

- **Description**: Get a list of all users (Admin only).
- **Authorization**: Bearer Token required in `Authorization` header.
- **Response**: `200 OK`
  ```json
  [
    {
      "_id": "userId",
      "username": "john_doe",
      "email": "john@example.com",
      "role": "user"
    }
  ]
  ```

#### `POST /api/admin/habit-template`

- **Description**: Create a habit template that users can adopt (Admin only).
- **Request Body**:
  ```json
  {
    "name": "Meditation",
    "description": "Daily 10-minute meditation",
    "frequency": "daily"
  }
  ```
- **Response**: `201 Created`
  ```json
  {
    "_id": "templateId",
    "name": "Meditation",
    "description": "Daily 10-minute meditation",
    "frequency": "daily"
  }
  ```

---

## Cron Job

The **reminder system** uses `node-cron` to send daily reminders to users about pending habits. The cron job runs at 9 AM every day:

```javascript
cron.schedule('0 9 * * *', async () => {
    // Logic to send reminders
});
```

This cron job is automatically triggered when the server is running.

---

## Running the Project

### Development Mode

To run the project in development mode with automatic restart upon changes, use:

```bash
nodemon index.js
```

---

## Postman

- Make sure to include the JWT token in the `Authorization` header for authenticated routes.