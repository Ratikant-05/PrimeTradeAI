# Project Name

A full-stack application demonstrating **user authentication and authorization** using **JWT**, **bcrypt**, and admin functionality with proper validations.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [User Flow](#user-flow)
- [API Endpoints](#api-endpoints)
- [Validations](#validations)
- [Admin Functionality](#admin-functionality)
- [License](#license)

---

## Features
- User registration with **hashed passwords** using **bcrypt**
- Login with **JWT authentication**
- Role-based access (Admin / User)
- Secure token storage and verification
- Input validation for all user requests

---

## Tech Stack
- **Backend:** Node.js, Express
- **Database:** MongoDB / Mongoose
- **Authentication:** JWT (jsonwebtoken)
- **Password Security:** bcrypt
- **Frontend:** (React)

---

## Installation

Clone the repository:

```bash
git clone <"https://github.com/Ratikant-05/PrimeTradeAI">
cd Project/Backend

Install Dependencies
npm install

Set environment variables in .env:

MONGODB_URI=mongodb://localhost:27017/PrimeTrade
PORT=4444
ACCESS_TOKEN_KEY ='nmjhjiopffggghhjewnsk'
ACCESS_TOKEN_EXPIRY="24h"
REFRESH_TOKEN_KEY ='nmjhjiopffewfewfgvcewevq'
REFRESH_TOKEN_EXPIRY="10 days"

Start the server:
npm run dev

Project/
├─ Backend/
│  ├─ config/
│  │  ├─ db.js
│  ├─ Controllers/
│  │  ├─ authController.js
│  ├─ Models/
│  │  ├─ userModel.js
│  ├─ Routes/
│  │  ├─ authRoutes.js
│  └─ index.js
├─ Frontend/
│  └─ ...

---

## USER FLOW
User Registration

User sends POST /signup with name, email, password
Password is hashed using bcrypt
User is saved in the database

User Login
User sends POST /login with email and password
Password is compared using bcrypt.compare
On success, a JWT token is generated and sent in response
Token is stored on the client (localStorage, cookie, etc.)

Authentication
Client sends JWT in request headers (Authorization: Bearer <token>)
Server verifies the token using jsonwebtoken

If valid, user is granted access
Role-based Authorization
Admin routes are protected
Only users with role admin can access specific endpoints