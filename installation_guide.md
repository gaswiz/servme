# ServMe - Installation Guide

This guide provides a comprehensive walkthrough for setting up and running the **ServMe** full-stack restaurant reservation system. It uses **React Native (Expo)** for the frontend and **Node.js with MariaDB** for the backend. The app is designed with a mobile-first approach and is best tested using Expo Go and Postman.

---

##  Prerequisites

Before starting, make sure the following are installed:

- **Node.js (v18+)**: https://nodejs.org/
- **Expo CLI** (React Native toolchain)
  ```bash
  npm install -g expo-cli
  ```
- **MariaDB**: https://mariadb.org/
- **ngrok**: For exposing the backend server.
  - Download: https://ngrok.com/download
- **Git**: To clone the repository.
- **Postman** (recommended): https://www.postman.com/

---

##  Step-by-Step Setup

### 1. Clone the Repository

```bash
cd ~/Desktop
git clone git@github.com:gaswiz/servme.git
cd servme
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

#### Configure Environment

Edit the `.env` file:

```env
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=servme
JWT_SECRET=yourcustomsecret123
```

#### Import Sample Database

```bash
mysql -u root -p servme < ../database_backup/servme_backup.sql
```

#### Start the Server

```bash
npm run dev
```

> Server runs on `http://localhost:3001`

---

### 3. First-Time ngrok Setup

#### Only if you’ve never used ngrok before:

1. Create account at https://ngrok.com/
2. Copy your token from https://dashboard.ngrok.com/get-started/setup
3. Run in terminal:

```bash
ngrok config add-authtoken <your_token>
```

#### Then run:

```bash
npx ngrok http 3001
```

Copy the HTTPS URL and place it in the `.env` file in root:

```env
BASE_URL=https://your-ngrok-url.ngrok-free.app
```

---

### 4. Postman API Testing (Recommended)

The `/postman` folder contains:

- `ServMe_CN6035_API_Full_Collection.json`
- `ServMe_Environment.json`

#### Steps:

1. Open Postman
2. Import both files
3. Select `ServMe Environment` from dropdown
4. Replace `BASE_URL` in environment with current ngrok URL
5. Authenticate using `Login (Kostas)` or `Login (Admin)`
6. All tokens are automatically stored

> Each folder in Postman includes a README with usage details and sample responses.

---

### 5. Frontend Setup (Expo)

```bash
cd ..
npm install
```

```bash
npx expo start
```

- Scan QR code with **Expo Go**
- Or press `a` (Android) or `i` (iOS)

---

##  Login Test Users

| Email            | Password | Role   |
|------------------|----------|--------|
| kostas@gmail.com | user1    | user   |
| john@gmail.com   | admin1   | admin  |

> These are preloaded into the database. No reservations exist initially.

---

##  Project Structure

```
servme/
├── backend/
├── database_backup/
├── postman/
│   ├── ServMe_CN6035_API_Full_Collection.json
│   ├── ServMe_Environment.json
│   └── README.md
├── assets/images/
├── components/
├── screens/
├── App.js
├── .env
├── package.json
└── installation_guide.md
```

---

##  FAQ

### Q1: How do I create the database manually?

```sql
CREATE DATABASE servme;
```

### Q2: Why does Postman return 401 or 403?

You may be missing a valid token. Run login request again.

### Q3: How do I regenerate a new ngrok link?

```bash
npx ngrok http 3001
```

### Q4: How do I reset login session on device?

```js
await AsyncStorage.clear();
```

---

##  Contact

- GitHub: [https://github.com/gaswiz/servme](https://github.com/gaswiz/servme)
- Author: Konstantinos Panagiotaropoulos — Final Year BSc Computer Science (CN6035)
