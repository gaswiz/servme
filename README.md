# ServMe 🍽️

ServMe is a full-stack mobile application for restaurant reservations built using **React Native (Expo)** for the frontend and **Node.js + MariaDB** for the backend. It allows users to register, log in, browse restaurants by category (Pizza, Sushi, Fast Food), make reservations, and view their account details and booking history.

---

## 🔧 Features

### ✅ Completed
- Secure login/signup with JWT
- Admin & User roles with role-based routing
- Persistent login via AsyncStorage
- Frontend screens:
  - Home, Restaurants, Support
  - Login, SignUp, Account, Admin
  - Pizza, Sushi, Fast Food
  - Reservation
- Backend API:
  - `/api/auth`, `/api/users`
  - `/api/restaurants`, `/api/reservations`
- Database: MariaDB with connection pooling
- Token storage and redirection logic implemented

---

## 🔨 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/gaswiz/servme.git
cd servme
```

### 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
# edit your .env file with your database credentials
npm run dev
```

### 3. Frontend setup

```bash
cd ..
npm install
npx expo start
```

> ℹ️ If using a real device, replace `localhost` in `LoginScreen.js` with your IP address (e.g. `192.168.1.X`)

---

## 🧪 Testing Logins

| Email              | Password | Role   |
|-------------------|----------|--------|
| admin@gmail.com    | admin    | admin  |
| user1@gmail.com    | user1    | user   |
| user2@gmail.com    | user2    | user   |

> Passwords are hashed with bcrypt in the DB

---

## 📌 Next Tasks

1. **Unified Sign-In**  
   - Login page is first screen  
   - Admins → `AdminScreen`, Users → `HomeScreen`

2. **Live User Info in AccountScreen**  
   - Replace dummy user info with DB-driven content  
   - Show data based on logged-in JWT user

3. **Reservation System**
   - Users should see “no reservations” initially  
   - Upon booking → DB entry → reflected in account  
   - Link to reservation screen and logic

---

## 🧠 Technologies

- React Native (Expo)
- React Navigation
- AsyncStorage
- Node.js / Express
- MariaDB
- JWT Authentication
- bcrypt.js

---

## 📁 Project Structure

```
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── screens/
│   └── *.js (Home, Login, etc.)
├── App.js
└── README.md
```

---

## 👨‍💻 Author

**Konstantinos Panagiotaropoulos**  
Final Year BSc Computer Science | CN6035  Project
```

