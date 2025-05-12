# ServMe

ServMe is a full-stack restaurant reservation system built with a mobile-first approach using **React Native (Expo)** for the frontend and **Node.js with MariaDB** for the backend. The application allows users to register, log in, explore restaurant categories, book reservations based on real-time availability, and view their booking history. Admin users have access to user and reservation management tools.

This system is built primarily for mobile devices (iOS/Android) and optimized for use through the **Expo Go** app. While it runs on web (via `expo start --web`), browser environments may experience cache/session limitations and are not the primary target.

---

## Features

### User Functionality
- JWT-based secure authentication (login/register)
- Persistent session storage with AsyncStorage
- Role-based routing for users and admins
- Explore restaurants by category: Pizza, Sushi, Fast Food
- View restaurant details and make reservations
- Account screen with user info and reservation history

### Admin Functionality
- Admin dashboard to view all users
- Access to full reservation listing

### Backend API
- `/api/auth` – Login and registration
- `/api/users` – User info retrieval
- `/api/restaurants` – Restaurant CRUD
- `/api/reservations` – Make and manage reservations

---

## Technologies Used

- React Native (Expo)
- Node.js / Express
- MariaDB
- Sequelize ORM
- React Navigation
- AsyncStorage
- JWT for authentication
- bcrypt.js for password hashing

---

## Installation & Setup Guide

> This guide assumes you're starting on a fresh machine (Mac or Windows) and cloning the project into `~/Desktop/College/servme`.

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
  ```bash
  npm install -g expo-cli
  ```
- [MariaDB](https://mariadb.org/) installed locally
- A GitHub SSH key configured if cloning via SSH (e.g., `gas-mac`)

---

## Step-by-Step Setup

### 2. Clone the Repository
```bash
cd ~/Desktop/College
git clone git@github.com:gaswiz/servme.git
cd servme
```

---

### 3. Backend Setup

#### Navigate to the backend directory:
```bash
cd backend
```

#### Install dependencies:
```bash
npm install
```

#### Create a `.env` file:
```bash
cp .env.example .env
```
Edit the `.env` file and set the following values:
```env
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mariadb_password
DB_NAME=servme_db
JWT_SECRET=yourcustomsecret123
```

#### Import the Database Schema (Optional)
If a backup is provided:
```bash
mysql -u root -p servme_db < ../database_backup/servme_backup.sql
```

#### Start the backend server:
```bash
npm run dev
```

The backend will now run at `http://localhost:3001`

---

### 4. Ngrok for Public URL (for mobile access)

In a separate terminal window:
```bash
npx ngrok http 3001
```

Copy the HTTPS URL generated (e.g., `https://abc123.ngrok-free.app`) and place it in your root `.env` file:
```
BASE_URL=https://abc123.ngrok-free.app
```

> You must restart Expo after modifying `.env`.

---

### 5. Frontend Setup

#### Navigate back to project root:
```bash
cd ..
```

#### Install frontend dependencies:
```bash
npm install
```

#### Run Expo project:
```bash
npx expo start
```

> You must have the Expo Go app installed on your iPhone or Android device. Scan the QR code shown in the terminal or browser to launch the app.

---

## Development Notes

- Project is optimized for **mobile** use. Web (`expo start --web`) works but may experience session issues.
- All API requests dynamically read `BASE_URL` from `.env` using:
  ```js
  import { BASE_URL } from '@env';
  ```
- `AsyncStorage` is used to store token, userId, and role.
- On web, a mock `storage.js` handles AsyncStorage in-memory only — browser refresh clears it.
- Ensure your firewall or antivirus does not block ngrok or port 3001.

---

## Login Test Users

| Email            | Password | Role   |
|------------------|----------|--------|
| admin@gmail.com  | admin    | admin  |
| user1@gmail.com  | user1    | user   |
| user2@gmail.com  | user2    | user   |

> Passwords are securely hashed in the database.

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
├── database_backup/
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
- GitHub: [gaswiz/servme](https://github.com/gaswiz/servme)
- Author: **Konstantinos Panagiotaropoulos**, Final Year BSc Computer Science — CN6035 Project