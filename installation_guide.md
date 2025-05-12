Yes, you can use **Markdown files** with embedded code blocks to demonstrate commands and their expected output. However, for executing code directly from the terminal within the file, there's no native file format that directly supports running terminal commands and displaying outputs. That said, **Markdown** with **syntax highlighting** is a great option for providing the **command execution instructions** along with **expected outputs**.

Here’s how you can structure it in a Markdown format with syntax highlighting for commands and outputs:

### Example with Markdown for "installation\_guide.md":

````markdown
# ServMe - Installation Guide

This guide will walk you through the process of setting up and running the ServMe application on your local machine. ServMe is a full-stack restaurant reservation app built with React Native (Expo), Node.js, and MariaDB.

---

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

1. **Node.js (v18+ recommended)**: [Download Node.js](https://nodejs.org/)
2. **Expo CLI**: This is required for building and running the React Native frontend.
   - To install Expo CLI, open your terminal and run the following:
     ```bash
     npm install -g expo-cli
     ```
3. **MariaDB**: Make sure MariaDB is installed locally. You can download it from [MariaDB website](https://mariadb.org/).
4. **ngrok**: This is required for tunneling local servers to public URLs. [Install ngrok](https://ngrok.com/download) and make sure it's in your system's PATH.
5. **Git**: Ensure Git is installed on your system for cloning the repository.

---

## Step-by-Step Setup

### 1. Clone the Repository

Navigate to your desired project directory and clone the repository:

```bash
cd ~/Desktop/College
git clone git@github.com:gaswiz/servme.git
cd servme
````

### 2. Backend Setup

#### Navigate to the backend directory:

```bash
cd backend
```

#### Install backend dependencies:

```bash
npm install
```

#### Create a `.env` file:

```bash
cp .env.example .env
```

Open the `.env` file and update it with your database credentials and JWT secret:

```env
PORT=3001
DB_HOST=localhost               # Host for MariaDB (use 'localhost' for local setups)
DB_USER=root                    # Your MariaDB username
DB_PASSWORD=your_mariadb_password  # Your MariaDB password
DB_NAME=servme_db                # Database name
JWT_SECRET=yourcustomsecret123   # Set a strong JWT secret key for token signing
```

#### Import Database Schema (Optional)

If you're provided with a database backup, you can import it into MariaDB:

```bash
mysql -u root -p servme_db < ../database_backup/servme_backup.sql
```

#### Start the Backend Server

Now you can start your backend server:

```bash
npm run dev
```

The backend server will run on `http://localhost:3001`

---

### 3. Ngrok Setup for Public URL

To access your local backend from your mobile app or other devices, you need to use ngrok to generate a public URL:

1. Open a new terminal window and run the following command to start ngrok on port 3001:

   ```bash
   npx ngrok http 3001
   ```

2. ngrok will generate a public URL (e.g., `https://abc123.ngrok-free.app`). Copy this URL.

3. Update the `.env` file in the root of the project with the new ngrok URL:

```env
BASE_URL=https://abc123.ngrok-free.app  # Replace with the ngrok URL
```

> **Note**: Every time ngrok is restarted, it will generate a new URL. You will need to update the `BASE_URL` in the `.env` file accordingly.

---

### 4. Frontend Setup

#### Install frontend dependencies:

Navigate to the project root directory and install the frontend dependencies:

```bash
cd ..
npm install
```

#### Start the Expo project:

Run the following command to start the frontend project:

```bash
npx expo start
```

* This will open Expo's developer tools in your browser.
* If you have the **Expo Go app** installed on your phone, scan the QR code to run the app on your device.
* Alternatively, you can press `a` to launch it on an Android emulator or `i` for iOS (if you have Xcode installed).

---

## Development Notes

* **Mobile-first**: This project is primarily designed for mobile devices. While it works on the web (`expo start --web`), it may have issues with session handling and caching.
* **API URL (`BASE_URL`)**: The API URL used for all backend requests is stored in the `.env` file. Make sure to update it to the correct value, especially when using ngrok for testing.

````

### How to Use It:
- **Commands** are shown in code blocks with **`bash`** for terminal commands.
- **Expected Outputs**: You can add the expected output below the code blocks if necessary. For example, after running `npx ngrok http 3001`, the output would look like:
  ```bash
  ngrok by @inconshreveable
  
  Session Status                online
  Session Expires               2 hours, 59 minutes
  Version                       2.3.35
  Region                        United States (us)
  Web Interface                 http://127.0.0.1:4040
  Forwarding                    http://abc123.ngrok-free.app -> http://localhost:3001
````

### Limitations:

* **Execution within Files**: There is no direct support for executing terminal commands inside a `txt` or `md` file. However, this markdown format can guide a user on the steps to run commands with clear instructions and expected outputs.

---

This way, anyone reading the **`installation_guide.md`** can follow the steps to install, configure, and run the app with clear instructions. They will also know what outputs to expect, and how to troubleshoot any potential issues.

Let me know if you need help with anything else!
