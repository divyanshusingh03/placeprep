# PlacePrep – Campus Placement Preparation Portal

PlacePrep is a web-based campus placement preparation portal designed to help students access placement-related information and prepare for recruitment opportunities.

The application is being developed using the MERN stack (MongoDB, Express.js, React.js, and Node.js).

## Project Objectives

- Provide students with a centralized platform for placement-related information.
- Simplify student registration and login.
- Support role-based access for students and administrators.
- Organize placement opportunities and preparation resources in one place.

## Technology Stack

### Frontend
- React.js
- HTML5
- CSS3
- JavaScript
- Vite

### Backend
- Node.js
- Express.js
- REST APIs

### Database
- MongoDB
- Mongoose

### Authentication and Security
- JSON Web Tokens (JWT)
- bcrypt for password hashing
- Role-based authorization

### Development Tools
- Git and GitHub
- Visual Studio Code
- Postman
- MongoDB Compass

## Project Structure

```text
PlacePrep/
├── Backend/
├── Frontend/
├── .gitignore
└── README.md
```

- `Backend/` – Server-side application and REST API implementation.
- `Frontend/` – React-based client-side application.
- `.gitignore` – Specifies files and folders excluded from Git tracking.
- `README.md` – Main project documentation.

## Backend Setup

### Prerequisites

Make sure the following are installed:

- Node.js
- npm
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/divyanshusingh03/placeprep.git
   ```

2. Navigate to the backend directory:

   ```bash
   cd PlacePrep/Backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the `Backend` directory and configure the following variables:

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_secret
   JWT_EXPIRES_IN=1h
   ```

   Replace the placeholder values with your actual configuration. Never commit your `.env` file.

5. Start the development server:

   ```bash
   npm run dev
   ```

The backend API will run on the configured port.

## Authentication API Endpoints

Base URL: `http://localhost:5000`

### 1. Register User

- **Method:** POST
- **Endpoint:** `/api/auth/register`
- **Description:** Registers a new student account.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response:** `201 Created`

Returns a success message and JWT token.

### 2. Login User

- **Method:** POST
- **Endpoint:** `/api/auth/login`
- **Description:** Authenticates an existing user.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response:** `200 OK`

Returns a success message and JWT token.

### Authentication Notes

- Passwords are hashed using bcrypt before storage.
- JWTs are generated after successful registration and login.
- Protected routes require a Bearer token in the Authorization header.
- Role-based authorization distinguishes student and admin access.