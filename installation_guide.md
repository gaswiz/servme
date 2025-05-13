ServMe - Installation Guide

This guide will walk you through the process of setting up and running the ServMe application on your local machine. ServMe is a full-stack restaurant reservation app built with React Native (Expo) for the frontend and Node.js with MariaDB for the backend.

------------------------------------------------------------

Prerequisites

Before you begin, make sure you have the following installed:

1. Node.js (v18+ recommended): https://nodejs.org/
2. Expo CLI: Required for running the frontend.
   Command to install:
   npm install -g expo-cli
3. MariaDB: Local database. Download from https://mariadb.org/
4. ngrok: Used to expose your local backend to the mobile app.
   Download from https://ngrok.com/download
5. Git: For cloning the repository.

------------------------------------------------------------

Step-by-Step Setup

1. Clone the Repository

cd ~/Desktop
git clone git@github.com:gaswiz/servme.git
cd servme

------------------------------------------------------------

2. Backend Setup

cd backend
npm install

Update the .env file:

PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=servme
JWT_SECRET=yourcustomsecret123

Import database (optional):

mysql -u root -p servme < ../database_backup/servme_backup.sql

Start the backend:

npm run dev

------------------------------------------------------------

3. ngrok Setup

If this is your first time using ngrok:

- Create an account: https://ngrok.com/
- Log in and get your auth token: https://dashboard.ngrok.com/get-started/setup
- Run this in terminal:

ngrok config add-authtoken <your-token>

Then start ngrok:

npx ngrok http 3001

Copy the generated HTTPS URL and update your .env in root:

BASE_URL=https://your-ngrok-url.ngrok-free.app

Note: You must update this each time ngrok restarts.

------------------------------------------------------------

4. Postman API Testing (Optional but Recommended)

Inside the postman/ folder:

- ServMe_CN6035_API_Full_Collection.json
- ServMe_Environment.json

Steps:

1. Open Postman
2. Import both files
3. Select ServMe Environment (top right)
4. Update BASE_URL to match ngrok
5. Run Login (Kostas) or Login (Admin)
6. token, userId, and role will be saved to the environment

All Postman documentation and FAQ is inside the collection folders.

------------------------------------------------------------

5. Frontend Setup

cd ..
npm install

Start Expo:

npx expo start

Use Expo Go to scan the QR code, or press:
- a (Android)
- i (iOS)

------------------------------------------------------------

Login Test Users

Email: kostas@gmail.com
Password: user1
Role: user

Email: john@gmail.com
Password: admin1
Role: admin

Note: These users are pre-created. No reservations are stored by default — you can add one manually.

------------------------------------------------------------

Project Structure

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

------------------------------------------------------------

FAQ

Q1. How do I create the database?
A: Run this in MariaDB:
CREATE DATABASE servme;

Q2. How do I regenerate the ngrok link?
A: Run:
npx ngrok http 3001

Q3. How do I clear my session/token?
A: Use:
await AsyncStorage.clear();

Q4. Can I test the API without using the app?
A: Yes, use Postman. All endpoints are documented.

Q5. Why do I get 401/403 in Postman?
A: You may be using an expired or missing token. Run login again and check Authorization.

------------------------------------------------------------

Contact

GitHub: https://github.com/gaswiz/servme
Author: Konstantinos Panagiotaropoulos (CN6035 Final Year Project)
