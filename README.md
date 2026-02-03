# Blog API

A simple Blog REST API built with Node.js, Express, and MongoDB. It supports authentication with access/refresh tokens, user management, posts, and reviews.

## Features

- JWT-based authentication (access and refresh tokens)
- User registration, login, logout, and token refresh
- CRUD for posts
- Reviews for posts
- Role-based authorization (admin/user)
- Rate limiting and basic security headers

## Tech Stack

- Node.js, Express
- MongoDB, Mongoose
- JWT, bcrypt
- Joi validation

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB

### Installation

1. Install dependencies

npm install

2. Create an .env file in the project root and add the following:

```
MONGO_URI=your_mongodb_connection_string
JWT_ACCESS_TOKEN=your_access_secret
JWT_REFRESH_TOKEN=your_refresh_secret
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d
PORT=5000
```

3. Start the server

npm start

The API will be available at http://127.0.0.1:5000

## API Overview

Base URL: http://127.0.0.1:{PORT}

## Documentation

Open the API documentation at:
http://127.0.0.1:{PORT}

## Notes

- The first registered user becomes admin.
- Refresh tokens are stored per user agent and limited to the last 5.
