# ServMe - Installation Guide

This guide will walk you through the process of setting up and running the **ServMe** application on your local machine. ServMe is a full-stack restaurant reservation app built with **React Native (Expo)** for the frontend and **Node.js with MariaDB** for the backend.

---

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

1. **Node.js (v18+ recommended)**: [Download Node.js](https://nodejs.org/)
2. **Expo CLI**: This is required for building and running the React Native frontend.
   - To install Expo CLI, open your terminal and run:
     ```bash
     npm install -g expo-cli
     ```
3. **MariaDB**: Download and install from [mariadb.org](https://mariadb.org/).
4. **ngrok**: Required to expose your local backend to the mobile app. [Download ngrok](https://ngrok.com/download).
5. **Git**: Required for cloning the repository.

---

## Step-by-Step Setup

### 1. Clone the Repository

Navigate to your **Desktop/servme** directory:

```bash
cd ~/Desktop
git clone git@github.com:gaswiz/servme.git
cd servme
````

---

### 2. Backend Setup

```bash
cd Desktop/servme/backend
```

Install dependencies:

```bash
npm install
```

The `.env` file is already present. Update it with your local database values:

```env
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=servme
JWT_SECRET=yourcustomsecret123
```

(Optional) Import the backup SQL:

```bash
mysql -u root -p servme < ../database_backup/servme_backup.sql
```

Start the backend:

```bash
npm run dev
```

---

### 3. Ngrok Setup

Expose your backend for mobile access:

```bash
npx ngrok http 3001
```

Copy the HTTPS forwarding address and update your project root `.env`:

```env
BASE_URL=https://abc123.ngrok-free.app
```

> Each time you restart ngrok, this URL changes.

---

### 4. Postman API Testing (Optional but Recommended)

The `postman/` folder includes:

* `ServMe_CN6035_API_Full_Collection.json`
* `ServMe_Environment.json`

To use:

1. Open **Postman**
2. Import both files
3. Select the **ServMe Environment** in the top-right
4. Update `BASE_URL` in the environment to match your ngrok URL
5. Run `Login (Kostas)` or `Login (Admin)` to authenticate
6. All tokens and IDs will be auto-saved to the environment

> All endpoints (auth, users, restaurants, reservations) are pre-documented inside Postman with usage instructions and expected responses.

---

### 5. Frontend Setup

```bash
cd ..
npm install
```

Start the app:

```bash
npx expo start
```

Scan the QR code with **Expo Go** or run on an emulator (`a` or `i`).

---

## Login Test Users

| Email                                       | Password | Role  |
| ------------------------------------------- | -------- | ----- |
| [kostas@gmail.com](mailto:kostas@gmail.com) | user1    | user  |
| [john@gmail.com](mailto:john@gmail.com)     | admin1   | admin |

> No reservations are preloaded. Create one manually.

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
├── README.md
└── installation_guide.md
```

---

## FAQ

### 1. How do I set up MariaDB?

Install via [official website](https://mariadb.org/), then run:

```sql
CREATE DATABASE servme;
```

### 2. How do I generate a new ngrok URL?

```bash
npx ngrok http 3001
```

### 3. How do I clear my session/token?

```js
await AsyncStorage.clear();
```

### 4. Is this production-ready?

No. This setup is for **development and academic testing** only.

---

## Contact

* GitHub: [gaswiz/servme](https://github.com/gaswiz/servme)
* Author: Konstantinos Panagiotaropoulos, Final Year BSc Computer Science — CN6035 Project

