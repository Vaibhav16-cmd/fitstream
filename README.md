# FitStream

FitStream is a combined fitness and media web app built with:

- `backend`: Node.js, Express, MongoDB
- `frontend`: React, Vite, Zustand

## Current product scope

- user registration and login
- workout browsing and session tracking
- seeded playlists and song recommendations
- player with persistent footer controls
- daily activity logging
- dashboard summaries and profile view

## Local run

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Environment variables

### Backend

Copy `backend/.env.example` and set:

- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `CLIENT_URL`

### Frontend

Copy `frontend/.env.example` and set:

- `VITE_API_URL`

## Test and build

### Backend tests

```bash
cd backend
npm test
```

### Frontend production build

```bash
cd frontend
npm run build
```
