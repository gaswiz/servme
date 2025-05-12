# ServMe - Full-Stack Restaurant Reservation App

ServMe is a full-stack restaurant reservation system built with a **mobile-first approach** using **React Native (Expo)** for the frontend and **Node.js with MariaDB** for the backend. The application enables users to register, log in, explore restaurant categories, book reservations based on real-time availability, and view their booking history. Admin users can manage users and reservations.

This application is optimized primarily for **iOS/Android** mobile devices using the **Expo Go** app. While it runs on web (via `expo start --web`), browser environments may experience **cache/session limitations** and are not the primary target.

---

## Features

### User Functionality
- **Secure Authentication**: JWT-based login and registration
- **Role-based Routing**: Separate access for users and admins
- **Persistent Session**: Stored with `AsyncStorage` for login state
- **Restaurant Categories**: Browse by Pizza, Sushi, Fast Food
- **Reservation System**: Book, manage, and view reservations
- **Account Info**: User info and reservation history displayed

### Admin Functionality
- **Admin Dashboard**: View and manage all users and reservations
- **Full Reservation Management**: Complete reservation listing access

### Backend API Endpoints
- `/api/auth`: Authentication (login/register)
- `/api/users`: User data access
- `/api/restaurants`: Restaurant management (CRUD)
- `/api/reservations`: Create and manage reservations

---

## Technologies Used

- **Frontend**: React Native (Expo)
- **Backend**: Node.js / Express
- **Database**: MariaDB
- **ORM**: Sequelize
- **Authentication**: JWT
- **Password Hashing**: bcrypt.js

---

## Installation Guide

For step-by-step instructions to set up and run the ServMe app, refer to the **[Installation Guide](installation_guide.md)**. It covers all the necessary steps including:

- **Prerequisites**: Tools you need to install (Node.js, Expo CLI, MariaDB, etc.)
- **Backend Setup**: Install and configure the backend, database, and environment variables
- **Frontend Setup**: Install frontend dependencies and run the Expo app
- **Ngrok Setup**: Make the local backend accessible for mobile testing

---

## Project Structure

```

servme/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
├── assets/images/
│   └── Pizza/, Sushi/, Fast/
├── components/
│   └── Auth/, Restaurants/, Home/, Reservation/
├── database\_backup/
├── screens/
│   └── HomeScreen.js, LoginScreen.js, AccountScreen.js, etc.
├── storage.js
├── App.js
├── .env
├── package.json
└── README.md

```

---

## Contact

For issues, suggestions, or contributions:
- **GitHub**: [ServMe Repo](https://github.com/gaswiz/servme)
- **Author**: **Konstantinos Panagiotaropoulos**, Final Year BSc Computer Science — CN6035 Project
```


