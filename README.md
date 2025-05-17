# TextUtils

A full-stack React + Node.js application for text transformation and storage with JWT authentication.

## Features
- User registration & login with hashed passwords
- JWT-based protected API routes
- Text transformation utilities (uppercase, lowercase, copy)
- User-specific CRUD operations for saved texts
- Responsive UI with modern gradient styling (Tailwind CSS)
- Input validation and security best practices

## Tech Stack
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Helmet, express-rate-limit
- **Frontend:** React, Vite, Tailwind CSS

## Setup

1. Clone the repo:
   ```bash
   git clone <repo-url>
   cd TextUtils
   ```

2. Create a `.env` in `backend/`:
   ```dotenv
   JWT_SECRET=your_jwt_secret
   MONGODB_URI=mongodb://localhost:27017/textutils
   PORT=5000
   ```

3. Install dependencies and run:
   ```bash
   # Backend
   cd backend
   npm install
   npm run dev

   # Frontend (in a new terminal)
   cd frontend
   npm install
   npm run dev
   ```

4. Open the app at [http://localhost:3000](http://localhost:3000)

## API Endpoints

- `POST /api/register` — Register a new user
- `POST /api/login` — Log in, returns JWT
- `GET /api/texts` — Get all saved texts (protected)
- `POST /api/texts` — Create a new text (protected)
- `PUT /api/texts/:id` — Update a text by ID (protected)
- `DELETE /api/texts/:id` — Delete a text by ID (protected)

## Security & Validation
- Passwords hashed with bcrypt
- JWT authentication middleware protects API routes
- Input validation with `express-validator`
- HTTP headers hardened by Helmet
- Rate limiting on API routes

## Project Structure
```
backend/
  ├─ middleware/auth.js   JWT auth
  ├─ models/User.js       User schema
  ├─ models/Text.js       Text schema
  ├─ routes/auth.js       Auth endpoints
  ├─ routes/texts.js      Text CRUD endpoints
  └─ server.js            App entry
frontend/
  ├─ src/App.jsx          Main component
  ├─ src/components/      UI components
  ├─ src/api/texts.js     API calls
  └─ tailwind.config.js   Styling config
```

## License
MIT
