# ServMe - Restaurant Reservation System

## Overview
ServMe is a restaurant reservation system built with Node.js, Express, MariaDB, and JWT-based authentication. The application allows users to create and manage reservations for restaurants and perform login with hashed passwords.

## Setup

### Prerequisites
1. Node.js (v16.x or above)
2. MariaDB (v10.x or above)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd servme
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following environment variables:

   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_db_password
   DB_NAME=servme
   JWT_SECRET=your_jwt_secret_key
   ```

4. Create and configure your MariaDB database:

   ```sql
   CREATE DATABASE servme;
   ```

5. Create necessary tables (`users`, `restaurants`, `reservations`), and seed your database with test data.

   Example SQL for creating the `users` table:
   ```sql
   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(100),
     surname VARCHAR(100),
     email VARCHAR(100) UNIQUE,
     phone VARCHAR(20),
     password VARCHAR(255),
     role ENUM('user', 'admin') DEFAULT 'user',
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

### Running the Application

1. Start your MariaDB service if it's not running:

   ```bash
   sudo service mysql start
   ```

2. Start the server:

   ```bash
   npm run dev
   ```

   This will start the server at `http://localhost:3001` (or another port if specified).

### Testing the Authentication

You can use Postman or any API testing tool to test the login functionality:

- **POST** `http://localhost:3001/api/auth/login`
- **Request Body** (JSON):
   ```json
   {
     "email": "admin@gmail.com",
     "password": "admin"
   }
   ```

### API Endpoints

- **POST** `/api/auth/login` - User login (returns JWT token on successful login)
- **GET** `/api/restaurants` - List all restaurants
- **POST** `/api/restaurants` - Create a new restaurant (admin only)
- **GET** `/api/reservations` - List all reservations (admin only)
- **POST** `/api/reservations` - Create a new reservation (user)
  
### Middleware

- **protect**: Protects routes and checks if the user is authenticated by verifying the JWT token in the request header.
- **adminOnly**: Ensures only admins can access certain routes like creating a restaurant or viewing all reservations.

## Database Schema

### Users Table

| Field        | Type            | Description                 |
|--------------|-----------------|-----------------------------|
| id           | INT             | Auto-incremented user ID    |
| name         | VARCHAR(100)     | User's first name           |
| surname      | VARCHAR(100)     | User's last name            |
| email        | VARCHAR(100)     | Unique email for login      |
| phone        | VARCHAR(20)      | User's phone number         |
| password     | VARCHAR(255)     | Hashed password             |
| role         | ENUM('user', 'admin') | User role (default: 'user') |
| created_at   | TIMESTAMP        | Date and time of account creation |

### Restaurants Table

| Field        | Type            | Description                 |
|--------------|-----------------|-----------------------------|
| id           | INT             | Auto-incremented restaurant ID |
| name         | VARCHAR(100)     | Restaurant name             |
| description  | TEXT            | Restaurant description      |
| image        | VARCHAR(255)     | URL to restaurant's image   |

### Reservations Table

| Field        | Type            | Description                 |
|--------------|-----------------|-----------------------------|
| id           | INT             | Auto-incremented reservation ID |
| user_id      | INT             | User who made the reservation |
| restaurant_id| INT             | Restaurant being reserved   |
| date         | DATE            | Date of reservation         |
| time         | TIME            | Time of reservation         |

## Notes

- Passwords are hashed using `bcryptjs` for security.
- JWT tokens are used for authentication, with a default expiration of 30 days.
- The database connection is made via the MariaDB pool, and environment variables are loaded using `dotenv`.

## Troubleshooting

- If you encounter the "User not found" issue, check the database connection and make sure the user exists.
- Ensure you are sending the correct headers for authorization when making requests that require login.

## License

This project is licensed under the MIT License.

```
