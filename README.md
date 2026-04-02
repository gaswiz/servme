# ServMe - Restaurant Reservation System

> A modern, full-stack restaurant reservation platform built with React Native and Node.js, designed for seamless mobile dining reservations.

[![JavaScript](https://img.shields.io/badge/JavaScript-98.9%25-F7DF1E?style=flat-square&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![TypeScript](https://img.shields.io/badge/TypeScript-1.1%25-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React%20Native-Expo-61DAFB?style=flat-square&logo=react)](https://reactnative.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Architecture](#project-architecture)
- [API Documentation](#api-documentation)
- [Installation Guide](#installation-guide)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [Contact](#contact)

## 📱 Overview

**ServMe** is a comprehensive restaurant reservation system that bridges the gap between diners and restaurants. The platform enables users to effortlessly explore dining options, book tables in real-time, and manage their reservations, while providing restaurant administrators with powerful tools to manage inventory and customer relationships.

### Target Platform
- **Primary**: iOS/Android mobile devices via **Expo Go**
- **Secondary**: Web browsers (via `expo start --web`)

## ✨ Key Features

### 👥 User Features
| Feature | Description |
|---------|-------------|
| **Secure Authentication** | JWT-based login and registration with bcrypt password hashing |
| **Role-Based Access** | Separate interfaces and permissions for customers and administrators |
| **Session Persistence** | AsyncStorage-powered login state persistence across sessions |
| **Restaurant Discovery** | Browse restaurants by category (Pizza, Sushi, Fast Food, etc.) |
| **Smart Reservations** | Book tables with real-time availability checking |
| **Booking Management** | View, edit, and cancel reservations with full history tracking |
| **User Profile** | Manage account information and view reservation history |

### 🛠️ Admin Features
| Feature | Description |
|---------|-------------|
| **Admin Dashboard** | Comprehensive overview of users and reservations |
| **User Management** | View and manage customer accounts |
| **Reservation Control** | Full access to all reservations with filtering options |
| **Restaurant Management** | Create, update, and manage restaurant listings |

### 🔌 REST API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/auth/register` | POST | User registration |
| `/api/auth/login` | POST | User authentication |
| `/api/users/:id` | GET | Retrieve user profile |
| `/api/users/:id` | PUT | Update user information |
| `/api/restaurants` | GET | Fetch all restaurants |
| `/api/restaurants/:id` | GET | Get restaurant details |
| `/api/restaurants` | POST | Create restaurant (Admin) |
| `/api/reservations` | POST | Create reservation |
| `/api/reservations/:id` | GET | Get reservation details |
| `/api/reservations` | GET | List user reservations |

## 🛠️ Tech Stack

### Frontend
- **Framework**: React Native (Expo)
- **Language**: JavaScript (98.9%) + TypeScript (1.1%)
- **State Management**: React Hooks
- **Storage**: AsyncStorage (persistent session management)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: JavaScript/TypeScript
- **API Format**: RESTful
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcrypt.js

### Database
- **DBMS**: MariaDB
- **ORM**: Sequelize
- **Connection Pooling**: Built-in via Sequelize

### Development & Testing
- **API Testing**: Postman (included collection)
- **Mobile Testing**: Expo Go
- **Local Tunneling**: Ngrok (for mobile backend access)

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- Expo CLI
- MariaDB
- Git

### 1. Clone Repository
```bash
git clone https://github.com/gaswiz/servme.git
cd servme
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file with database credentials
# DATABASE_URL=mysql://user:password@localhost:3306/servme
# JWT_SECRET=your_jwt_secret_key

npm start
```

### 3. Frontend Setup
```bash
npm install

# Start Expo development server
npx expo start

# For iOS/Android: Use Expo Go app to scan QR code
# For Web: Press 'w' in the terminal
```

### 4. Ngrok Setup (for mobile testing)
```bash
ngrok http 5000
# Update API_BASE_URL in frontend with ngrok URL
```

For detailed setup instructions, see [Installation Guide](installation_guide.md).

## 🏗️ Project Architecture

```
servme/
├── backend/                          # Node.js Express server
│   ├── config/                      # Database configuration
│   ├── controllers/                 # Request handlers
│   ├── middleware/                  # Custom middleware (auth, etc.)
│   ├── models/                      # Sequelize ORM models
│   ├── routes/                      # API route definitions
│   ├── server.js                    # Express app setup
│   └── .env                         # Environment variables
│
├── components/                      # React Native components
│   ├── Auth/                        # Login & registration components
│   ├── Restaurants/                 # Restaurant listing components
│   ├── Home/                        # Home screen components
│   └── Reservation/                 # Reservation booking components
│
├── screens/                         # Screen containers
│   ├── HomeScreen.js
│   ├── LoginScreen.js
│   ├── RestaurantScreen.js
│   ├── ReservationScreen.js
│   └── AccountScreen.js
│
├── assets/
│   └── images/                      # Restaurant category images
│       ├── Pizza/
│       ├── Sushi/
│       └── FastFood/
│
├── database_backup/                 # Database backups
├── postman/                         # API testing collection
│   ├── ServMe_CN6035_API_Full_Collection.json
│   ├── ServMe_Environment.json
│   └── README.md
│
├── storage.js                       # AsyncStorage utilities
├── App.js                           # Root application component
├── app.json                         # Expo configuration
├── package.json                     # Dependencies
└── README.md                        # This file
```

## 📊 Database Schema

### Core Tables
- **users** - Customer and admin accounts
- **restaurants** - Restaurant information
- **reservations** - Booking records with timestamps
- **categories** - Restaurant categories (Pizza, Sushi, etc.)

## 🔐 Security Features

- **JWT Authentication**: Stateless, token-based authentication
- **Password Hashing**: bcrypt.js with salt rounds
- **Role-Based Authorization**: Admin vs User access control
- **Environment Variables**: Sensitive data protection (.env)
- **Session Management**: Secure AsyncStorage on mobile

## 📚 API Testing

A comprehensive Postman collection is included in the `postman/` folder:
- **ServMe_CN6035_API_Full_Collection.json** - Complete API endpoint documentation
- **ServMe_Environment.json** - Pre-configured environment variables
- Test all endpoints independently of the frontend application

Import these files into Postman to quickly test all API functionality.

## 📖 Documentation

- [Installation Guide](installation_guide.md) - Step-by-step setup instructions
- [Postman Collection README](postman/README.md) - API endpoint details
- Backend API documentation available via Postman collection

## 🚦 Getting Help

### Common Issues

**Mobile app can't connect to backend?**
- Ensure Ngrok tunnel is active and API_BASE_URL is updated
- Check firewall settings
- Verify backend server is running

**Database connection errors?**
- Verify MariaDB is running
- Check .env DATABASE_URL configuration
- Ensure database exists and credentials are correct

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Konstantinos Panagiotaropoulos**  
Final Year BSc Computer Science — CN6035 Project  
[GitHub](https://github.com/gaswiz) | [Repository](https://github.com/gaswiz/servme)

---

<div align="center">

**Made with ❤️ for better dining experiences**

</div>
