
````md
# ServMe - Installation Guide

This guide will walk you through the process of setting up and running the **ServMe** application on your local machine. ServMe is a full-stack restaurant reservation app built with **React Native (Expo)** for the frontend and **Node.js with MariaDB** for the backend.

---

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

1. **Node.js (v18+ recommended)**: [Download Node.js](https://nodejs.org/)
2. **Expo CLI**: Required for running the React Native frontend.
   ```bash
   npm install -g expo-cli
````

3. **MariaDB**: Local database required. [Download MariaDB](https://mariadb.org/)
4. **ngrok**: Used to expose your local backend to the frontend. [Download ngrok](https://ngrok.com/download)
5. **Git**: Required to clone the repository.

---

## Step-by-Step Setup

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

#### Configure Environment Variables

The `.env` file is already included. You just need to update it:

```env
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=servme
JWT_SECRET=yourcustomsecret123
```

#### Import Database (Optional)

```bash
mysql -u root -p servme < ../database_backup/servme_backup.sql
```

#### Start the Backend Server

```bash
npm run dev
```

---

### 3. ngrok Setup

#### If this is your first time using ngrok:

1. Create a free account at [https://ngrok.com/](https://ngrok.com/)
2. Log in and copy your **Auth Token** from: [https://dashboard.ngrok.com/get-started/setup](https://dashboard.ngrok.com/get-started/setup)
3. In your terminal, run:

   ```bash
   ngrok config add-authtoken <your-token-here>
   ```

#### Then expose your backend:

```bash
npx ngrok http 3001
```

Copy the generated HTTPS URL (e.g., `https://abc123.ngrok-free.app`) and update your `.env` file in the root directory:

```env
BASE_URL=https://abc123.ngrok-free.app
```

> Every time you restart ngrok, you must update this URL.

---

### 4. Postman API Testing (Optional but Recommended)

The `postman/` folder includes:

* `ServMe_CN6035_API_Full_Collection.json`
* `ServMe_Environment.json`

To use:

1. Open Postman
2. Import both files
3. Select the **ServMe Environment**
4. Update `BASE_URL` to match your current ngrok URL
5. Run `Login (Kostas)` or `Login (Admin)` to authenticate
6. Token, userId, and role will be saved to the environment automatically

> All documentation and FAQs for the API endpoints are built into the Postman collection itself.

---

### 5. Frontend Setup

```bash
cd ..
npm install
```

Start the Expo project:

```bash
npx expo start
```

* Scan the QR code with **Expo Go**
* Or press `a` (Android), `i` (iOS) to launch on emulator

---

## Login Test Users

| Email                                       | Password | Role  |
| ------------------------------------------- | -------- | ----- |
| [kostas@gmail.com](mailto:kostas@gmail.com) | user1    | user  |
| [john@gmail.com](mailto:john@gmail.com)     | admin1   | admin |

> No reservations are preloaded. You can add them manually via the app or Postman.

---

## Project Structure

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

## FAQ

### 1. How do I set up MariaDB?

```sql
CREATE DATABASE servme;
```

### 2. How do I regenerate my ngrok URL?

```bash
npx ngrok http 3001
```

### 3. How do I clear login session data?

```js
await AsyncStorage.clear();
```

### 4. Can I test without using the mobile app?

Yes. Use Postman to test all endpoints directly.

### 5. Why does Postman return 401 or 403?

You may be missing or using the wrong token. Log in again and ensure Authorization header is set.

---

## Contact

* GitHub: [gaswiz/servme](https://github.com/gaswiz/servme)
* Author: Konstantinos Panagiotaropoulos, Final Year BSc Computer Science — CN6035 Project

```

Let me know if you'd like me to commit this file now.
```
