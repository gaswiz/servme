# ServMe – Mobile Restaurant Reservation App

**ServMe** is a mobile restaurant reservation application built using **React Native** with **Expo**. It features a simple user interface inspired by platforms like e-food, allowing users to explore restaurants by category (Pizza, Sushi, Fast Food), make reservations, and manage user and admin operations.

---

## 📁 Project Structure

```
servme/
├── assets/
│   └── images/
│       ├── Pizza/
│       ├── Sushi/
│       └── Fast/
├── screens/
│   ├── HomeScreen.js
│   ├── AccountScreen.js
│   ├── AdminScreen.js
│   ├── RestaurantsScreen.js
│   ├── PizzaScreen.js
│   ├── SushiScreen.js
│   ├── FastFoodScreen.js
│   ├── ReservationScreen.js
│   ├── SignUpScreen.js
│   └── LoginScreen.js
├── App.js
├── package.json
└── ...
```

---

## 🚀 Getting Started

Follow these steps to clone and run the project on your machine.

### 1. Clone the Repository

```bash
git clone https://github.com/gaswiz/servme.git
cd servme
```

---

### 2. Install Dependencies

Make sure you have **Node.js (>=16.x)** installed.

If you don’t have Expo CLI installed globally:

```bash
npm install -g expo-cli
```

Then, install the project dependencies:

```bash
npm install
```

---

### 3. Start the Project

Start the Expo development server:

```bash
npx expo start
```

Expo will generate a QR code you can scan with the **Expo Go** app on your phone (iOS/Android) to preview the app.

---

## 📱 Run on Device

1. Download the **Expo Go** app from the App Store or Google Play.
2. Open the Expo Go app and scan the QR code from the terminal or browser.
3. The app will load on your phone.

---

## ⚙️ Requirements

- Node.js (16.x or 18.x)
- npm
- Expo CLI (`npm install -g expo-cli`)
- Git (for version control)
- Expo Go app (on your mobile device)

---

## 🧪 Functionality Overview

- **Home Screen**: Browse pizza, sushi, and fast food categories.
- **Reservation Screen**: Reserve a spot (each restaurant has 10 slots max).
- **Account Screen**: User details and reservations.
- **Admin Screen**: Admin can view all users and reservations.
- **Login/Signup**: Placeholder screens for user authentication.

---

## 📂 Assets

Place all restaurant images inside:

```
/assets/images/Pizza/
                    pizza1.jpg ... pizza5.jpg

/assets/images/Sushi/
                    sushi1.jpg ... sushi5.jpg

/assets/images/Fast/
                    fast1.jpg ... fast5.jpg
```

> ⚠️ **Images are required for the app to render restaurant screens correctly.**

---

## 📌 Notes

- Project uses **local state only** (no backend/database yet).
- Reservation logic limits each restaurant to 10 active reservations.
- Screens are wired using **React Navigation**.
- Images are stored locally for consistency and offline support.

---

## 🛠️ Development Notes

- Designed and tested with **Expo Go on iPhone**.
- Ensure any new screen is registered in **App.js** and uses `useNavigation()` where needed.
- Use `SafeAreaView` and consistent padding for mobile UI alignment.

---

## 🧑‍💻 Contributors

- Konstantinos Panagiotaropoulos – Developer & Project Owner

---

## 📄 License

This project is for educational and demo purposes. Commercial use is not allowed without permission.
```
