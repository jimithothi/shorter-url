# URL Shortener API

A RESTful API for shortening URLs with user authentication, analytics tracking, and rate limiting.

## Features

- Generate unique short URLs for long URLs
- User authentication (register/login)
- URL analytics tracking
- Rate limiting to prevent abuse
- Input validation
- MongoDB database integration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd url-shortener
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/url-shortener
JWT_SECRET=your-secret-key
NODE_ENV=development
```

4. Build the TypeScript code:
```bash
npm run build
```

5. Start the server:
```bash
npm start
```

For development with hot-reload:
```bash
npm run dev
```

## API Endpoints

### Authentication

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### URL Management

#### Create Short URL
```
POST /api/urls
Authorization: Bearer <token>
Content-Type: application/json

{
  "originalUrl": "https://example.com/very/long/url"
}
```

#### Get All URLs
```
GET /api/urls
Authorization: Bearer <token>
```

#### Get URL Analytics
```
GET /api/urls/:shortUrl/analytics
Authorization: Bearer <token>
```

#### Redirect to Original URL
```
GET /api/urls/:shortUrl
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 409: Conflict
- 500: Internal Server Error

## Rate Limiting

The API implements rate limiting to prevent abuse:
- 100 requests per 15 minutes per IP address

## Security

- Passwords are hashed using bcrypt
- JWT authentication
- Input validation
- Rate limiting
- CORS enabled

## Development

To run tests:
```bash
npm test
```

## License

MIT 