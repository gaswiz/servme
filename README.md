# ServMe 🍽️

ServMe is a full-stack mobile application for restaurant reservations built using **React Native (Expo)** for the frontend and **Node.js + MariaDB** for the backend. It allows users to register, log in, browse restaurants by category (Pizza, Sushi, Fast Food), make reservations, and view their account details and booking history.

---

## 🔧 Features

### ✅ Completed
- Secure login/signup with JWT and live input validation
- Admin & User roles with role-based routing
- Persistent login via AsyncStorage
- Frontend screens:
  - Home, Restaurants, Support
  - Login, SignUp, Account, Admin
  - Pizza, Sushi, Fast Food
  - Reservation (with DB-based availability logic)
- Live reservation availability per restaurant (max 10)
- Availability logic synced across categories and restaurants
- Backend API:
  - `/api/auth`, `/api/users`
  - `/api/restaurants`, `/api/reservations`
- Database: MariaDB with Sequelize ORM
- Token storage, protected routes, and redirection logic implemented

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

> ℹ️ If using a real device, replace `localhost` in `BASE_URL` inside all screens (e.g. `192.168.1.X`)

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

1. **Reservation Management Enhancements**  
   - Add ability to cancel reservations  
   - Admin view: show list of reservations per restaurant

2. **Email Confirmations (optional)**  
   - On reservation success, trigger confirmation email

3. **Polish the UI**  
   - Add better icons, restaurant ratings, dynamic hero sections  
   - Improve the animations between screens

4. **Bug Fixes / QA**  
   - Final cross-platform testing (iOS/Android)
   - Fix any overflow/scrolling issues

5. **Submission Readiness**
   - Create video demo
   - Include ERD and system diagrams in the repo

---

## 🧠 Technologies

- React Native (Expo)
- React Navigation
- AsyncStorage
- Node.js / Express
- MariaDB
- Sequelize ORM
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
├── frontend/
│   ├── components/
│   │   └── Auth/, Restaurant/, Home/, Reservation/
│   ├── assets/images/
│   └── App.js
├── README.md
```

---

## 👨‍💻 Author

**Konstantinos Panagiotaropoulos**  
Final Year BSc Computer Science | CN6035 Project
