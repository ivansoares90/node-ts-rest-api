# Node.js TypeScript REST API

A robust REST API built with Node.js, Express, TypeScript, and MongoDB. Features include user authentication, input validation, error handling, and more.

## Features

- TypeScript for type safety
- Express.js for routing and middleware
- MongoDB with Mongoose for data persistence
- JWT authentication
- Input validation with Joi and express-validator
- Error handling middleware
- Environment configuration
- ESLint and Prettier for code quality
- Jest for testing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/node-ts-rest-api.git
cd node-ts-rest-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration values.

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

## API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "StrongP@ss123",
  "firstName": "John",
  "lastName": "Doe"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe"
    },
    "token": "jwt_token"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "StrongP@ss123"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe"
    },
    "token": "jwt_token"
  }
}
```

### Users

#### Get All Users
```http
GET /api/users
Authorization: Bearer jwt_token
```

Response:
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "user_id",
        "email": "user@example.com",
        "firstName": "John",
        "lastName": "Doe"
      }
    ]
  }
}
```

#### Get User by ID
```http
GET /api/users/:id
Authorization: Bearer jwt_token
```

Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe"
    }
  }
}
```

#### Update User
```http
PUT /api/users/:id
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "firstName": "Jane",
      "lastName": "Smith"
    }
  }
}
```

#### Delete User
```http
DELETE /api/users/:id
Authorization: Bearer jwt_token
```

Response:
```json
{
  "success": true,
  "data": {
    "message": "User deleted successfully"
  }
}
```

## Validation Rules

### User Registration
- Email: Valid email format
- Password: Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
- First Name: 2-50 characters, letters, spaces, hyphens, and apostrophes only
- Last Name: 2-50 characters, letters, spaces, hyphens, and apostrophes only

### User Login
- Email: Valid email format
- Password: Required

### User Update
- Email: Optional, valid email format
- First Name: Optional, 2-50 characters, letters, spaces, hyphens, and apostrophes only
- Last Name: Optional, 2-50 characters, letters, spaces, hyphens, and apostrophes only

## Error Responses

All endpoints return errors in the following format:

```json
{
  "success": false,
  "error": {
    "message": "Error message",
    "code": 400
  }
}
```

Common error codes:
- 400: Bad Request (validation errors)
- 401: Unauthorized (invalid or missing token)
- 403: Forbidden (insufficient permissions)
- 404: Not Found (resource not found)
- 500: Internal Server Error

## Testing

Run tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 