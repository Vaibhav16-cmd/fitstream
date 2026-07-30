# Deployment Notes

## Backend deployment

- deploy the backend as a Node.js service
- set environment variables from `backend/.env.example`
- make sure `CLIENT_URL` points to the deployed frontend origin
- make sure MongoDB is reachable from the deployment provider

## Frontend deployment

- deploy the frontend as a static React/Vite build
- set `VITE_API_URL` to the backend base URL
- run `npm run build` before publishing

## Suggested platforms

- frontend: Vercel or Netlify
- backend: Render, Railway, or a Node VPS
- database: MongoDB Atlas

## Final pre-deploy checklist

- confirm login/register works
- confirm `/workouts` loads seeded workouts
- confirm workout start and completion works while logged in
- confirm `/player` plays seeded tracks
- confirm `/activity` saves logs
- confirm frontend build passes
- confirm backend tests pass
