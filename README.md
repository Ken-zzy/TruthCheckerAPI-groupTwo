## TruthChecker API
This is the backend API for the TruthChecker project — a fact-checking platform built with Node.js, Express, and TypeScript.

It provides RESTful API endpoints for managing:

- Users

- Claims

- Fact-check reports

- Translation of claims

- Authentication & Authorization

# Tech Stack
- Node.js

- Express.js

- TypeScript

- JWT (Authentication)

- Swagger (API Documentation)

- dotenv (Environment Variables)

# Installation Guide

1. Install Dependencies
Run the following commands to install all required packages.

## Core Packages:
# Command	Purpose

- npm install express	Installs Express.js (Node.js web framework)
- npm install cors	Allows cross-origin requests (CORS)
- npm install helmet	Secures HTTP headers (prevents common attacks)
- npm install express-rate-limit	Limits repeated requests from the same IP to prevent abuse
- npm install morgan	HTTP request logger middleware
- npm install dotenv	Loads environment variables from .env file
- npm install jsonwebtoken	For creating and verifying JWT tokens (Authentication)
- npm install swagger-jsdoc	Allows writing Swagger API docs directly in code comments

## Dev Dependencies (TypeScript & Types Support)
# Command	Purpose

- npm install --save-dev typescript	Installs TypeScript compiler
- npm install --save-dev @types/node	Provides Node.js types
- npm install --save-dev @types/express	Provides Express.js types
- npm install --save-dev @types/cors	Provides CORS types
- npm install --save-dev @types/express-rate-limit	Provides types for rate-limit
- npm install --save-dev @types/morgan	Provides types for Morgan logger
- npm install --save-dev @types/jsonwebtoken	Provides types for JWT
- npm install --save-dev @types/swagger-jsdoc	Provides types for Swagger-jsdoc
- Check Installed Swagger-jsdoc Version: 
    npm list swagger-jsdoc
Shows the installed version of swagger-jsdoc.

## Running The Project
# Compile TypeScript

npx tsc - Start the server

npm run dev - (Or node dist/index.js if in production)

## Project Structure

src/
│
├── controllers/       # All controller logic
├── routes/            # API Routes
├── middlewares/       # Custom middlewares
├── utils/             # Utility functions (error handler, JWT helper)
├── models/            # Data models or types
├── config/            # Configuration files
├── docs/              # Swagger API docs
└── index.ts          # App entry point

## Environment Variables (.env)

PORT=5000
JWT_SECRET=your_secret_key

## API Documentation

Swagger documentation available at:
http://localhost:5000/api-docs

## Available Scripts

Command	Purpose
npm run dev - Runs the app in development mode using ts-node-dev
npx tsc - Compiles TypeScript code to JavaScript
npm start - Runs the compiled JavaScript code
## Author

TruthChecker API — Group Two
Backend Team 💻