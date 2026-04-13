# FitStream Project Structure

This app combines two product areas in one place:

- `Fitness`: workouts, activity tracking, progress, goals
- `Media`: songs, playlists, player controls during workouts

The goal is to keep them connected, so the user can work out and control music without switching apps.

## Recommended Top-Level Structure

```text
fitstream/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── validations/
│   │   ├── seed/
│   │   ├── app.js
│   │   └── server.js
│   ├── tests/
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── store/
│   │   ├── styles/
│   │   ├── types/
│   │   └── utils/
│   ├── package.json
│   └── README.md
├── shared/
│   ├── constants/
│   ├── schemas/
│   └── types/
├── docs/
│   ├── api.md
│   ├── database.md
│   ├── features.md
│   └── user-flows.md
└── PROJECT_STRUCTURE.md
```

## What Each Top-Level Folder Means

### `backend/`

This is the server side.

It handles:

- login and signup
- saving user data
- workouts and activity records
- playlists and song metadata
- business logic
- database connection

Think of backend as: "the brain and storage manager of the app."

### `frontend/`

This is the user interface.

It handles:

- screens the user sees
- buttons, forms, cards, player controls
- workout dashboard
- music player UI
- progress charts

Think of frontend as: "the face of the app."

### `shared/`

This folder stores things used in both frontend and backend.

Examples:

- common constants
- shared validation schemas
- shared types

Think of shared as: "reusable rules both sides agree on."

### `docs/`

This folder stores project documentation.

Examples:

- API explanation
- database design
- feature plan
- user flow diagrams

Think of docs as: "the instruction manual for the project."

## Recommended Backend Structure

```text
backend/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── env.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── workoutController.js
│   │   ├── activityController.js
│   │   ├── playlistController.js
│   │   ├── mediaController.js
│   │   └── progressController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── validateRequest.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Workout.js
│   │   ├── WorkoutSession.js
│   │   ├── ActivityLog.js
│   │   ├── Song.js
│   │   ├── Playlist.js
│   │   └── ProgressStat.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── workoutRoutes.js
│   │   ├── activityRoutes.js
│   │   ├── playlistRoutes.js
│   │   ├── mediaRoutes.js
│   │   └── progressRoutes.js
│   ├── services/
│   │   ├── authService.js
│   │   ├── workoutService.js
│   │   ├── mediaService.js
│   │   └── recommendationService.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   ├── calculateCalories.js
│   │   └── formatResponse.js
│   ├── validations/
│   │   ├── authValidation.js
│   │   ├── workoutValidation.js
│   │   └── playlistValidation.js
│   ├── seed/
│   │   ├── workouts.seed.js
│   │   └── songs.seed.js
│   ├── app.js
│   └── server.js
├── tests/
│   ├── auth.test.js
│   ├── workout.test.js
│   └── playlist.test.js
├── .env
├── .env.example
├── package.json
└── README.md
```

## Backend File Meanings

### `src/config/`

Configuration files.

- `db.js`: connects your app to MongoDB
- `env.js`: reads environment variables like `PORT`, `MONGO_URI`, `JWT_SECRET`

Meaning:
Configuration is setup code that tells the app how to run in different environments.

### `src/controllers/`

Controllers receive the request and return the response.

Examples:

- user sends `POST /api/auth/login`
- route sends request to `authController.js`
- controller checks input and calls other logic
- controller returns JSON response

Meaning:
Controller = "what happens when this API is called?"

### `src/middleware/`

Middleware runs in the middle of request processing.

Examples:

- check if user is logged in
- catch errors
- validate request body

Meaning:
Middleware = "security and checks before the main logic runs."

### `src/models/`

Models define database shapes.

Examples:

- what fields a `User` has
- what a `WorkoutSession` stores
- what a `Song` record looks like

Meaning:
Model = "blueprint for data stored in MongoDB."

### `src/routes/`

Routes connect API URLs to controllers.

Examples:

- `/api/auth/login`
- `/api/workouts`
- `/api/playlists`

Meaning:
Route = "which file handles this URL?"

### `src/services/`

Services hold business logic that should stay separate from request handling.

Examples:

- recommend songs for cardio
- calculate workout streak
- create a full workout session record

Meaning:
Service = "the real work or decision-making logic."

This separation keeps controllers small and clean.

### `src/utils/`

Utility helpers used in many places.

Examples:

- token generator
- calorie calculator
- response formatter

Meaning:
Utility = "small helper functions reused across the app."

### `src/validations/`

Input checking rules.

Examples:

- email must be valid
- password must be at least 6 characters
- workout duration must be a number

Meaning:
Validation = "checking user input before saving or processing it."

### `src/seed/`

Starter data scripts.

Examples:

- sample workouts
- sample songs
- demo playlists

Meaning:
Seed data = "pre-filled records so the app is not empty during development."

### `src/app.js`

Sets up the Express app.

Usually includes:

- `express.json()`
- `cors()`
- route registration
- error middleware

Meaning:
`app.js` builds the app, but does not start listening yet.

### `src/server.js`

Starts the server.

Usually includes:

- database connection
- `app.listen(...)`

Meaning:
`server.js` is the actual entry point that runs your backend.

## Recommended Frontend Structure

```text
frontend/
├── public/
│   ├── images/
│   ├── icons/
│   └── sample-audio/
├── src/
│   ├── app/
│   │   ├── App.jsx
│   │   └── providers.jsx
│   ├── assets/
│   │   ├── fonts/
│   │   └── illustrations/
│   ├── components/
│   │   ├── common/
│   │   ├── fitness/
│   │   └── media/
│   ├── features/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── workouts/
│   │   ├── activity/
│   │   ├── player/
│   │   └── playlists/
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── usePlayer.js
│   │   └── useWorkouts.js
│   ├── layouts/
│   │   ├── MainLayout.jsx
│   │   └── AuthLayout.jsx
│   ├── lib/
│   │   ├── axios.js
│   │   └── queryClient.js
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── WorkoutPage.jsx
│   │   ├── ActivityPage.jsx
│   │   ├── PlayerPage.jsx
│   │   └── ProfilePage.jsx
│   ├── routes/
│   │   ├── AppRoutes.jsx
│   │   └── ProtectedRoute.jsx
│   ├── services/
│   │   ├── authApi.js
│   │   ├── workoutApi.js
│   │   ├── activityApi.js
│   │   └── playlistApi.js
│   ├── store/
│   │   ├── authStore.js
│   │   └── playerStore.js
│   ├── styles/
│   │   ├── globals.css
│   │   └── theme.css
│   ├── types/
│   │   └── index.js
│   └── utils/
│       ├── formatTime.js
│       └── formatDuration.js
├── package.json
└── README.md
```

## Frontend File Meanings

### `public/`

Static files that are served directly.

Examples:

- images
- icons
- sample song files

Meaning:
Files here are not processed much by the app. They are just available to load.

### `src/app/`

Main frontend app setup.

- `App.jsx`: root component
- `providers.jsx`: wraps the app with global providers like router, state, theme

Meaning:
This is the startup zone of the frontend.

### `src/assets/`

Design assets used inside the app.

Examples:

- fonts
- illustrations
- background graphics

Meaning:
Assets = "visual resources used by the interface."

### `src/components/`

Reusable UI pieces.

Examples:

- buttons
- navbar
- workout card
- music player controls

Meaning:
Component = "a reusable building block of the screen."

### `src/features/`

App modules grouped by business feature.

Examples:

- `auth/`
- `workouts/`
- `player/`

Meaning:
Feature folders keep related code together instead of scattering it everywhere.

This is one of the best ways to organize growing apps.

### `src/hooks/`

Reusable custom React logic.

Examples:

- `useAuth.js`
- `usePlayer.js`

Meaning:
Hook = "shared behavior for components."

If many screens need the same logic, a hook helps avoid repeating code.

### `src/layouts/`

Common page wrappers.

Examples:

- a layout for logged-in screens
- a layout for login/register screens

Meaning:
Layout = "shared page structure."

### `src/lib/`

Third-party setup and low-level app infrastructure.

Examples:

- API client
- data-fetching client

Meaning:
`lib` is where app-wide technical wiring lives.

### `src/pages/`

Screen-level components.

Examples:

- dashboard page
- player page
- profile page

Meaning:
Page = "a full screen the user navigates to."

### `src/routes/`

Frontend route definitions.

Examples:

- which URL shows which page
- protected pages requiring login

Meaning:
This controls navigation in the frontend.

### `src/services/`

Functions that call backend APIs.

Examples:

- login request
- fetch workouts
- create playlist

Meaning:
Service = "how frontend talks to backend."

### `src/store/`

Global state.

Examples:

- logged-in user data
- current playing song
- playback queue

Meaning:
Store = "shared app memory."

### `src/styles/`

Global CSS and theme settings.

Examples:

- colors
- spacing
- typography

Meaning:
This is where the app's visual system lives.

### `src/types/`

Type definitions or data shape references.

Even in plain JavaScript, this folder can document object structures.

Meaning:
Types = "what shape the data should have."

### `src/utils/`

Frontend helper functions.

Examples:

- format song time
- convert seconds to minutes

Meaning:
Same idea as backend utils: reusable helpers.

## Feature-to-Folder Mapping

### Fitness Features

- workout plans -> `backend/models/Workout.js`, `backend/controllers/workoutController.js`, `frontend/features/workouts/`
- activity tracking -> `backend/models/ActivityLog.js`, `frontend/features/activity/`
- progress charts -> `backend/models/ProgressStat.js`, `frontend/features/dashboard/`
- session tracking -> `backend/models/WorkoutSession.js`

### Media Features

- songs -> `backend/models/Song.js`
- playlists -> `backend/models/Playlist.js`, `frontend/features/playlists/`
- player controls -> `frontend/features/player/`, `frontend/store/playerStore.js`
- workout music recommendation -> `backend/services/recommendationService.js`

## Simple Real-Life Flow

Here is how files work together when a user starts a workout:

1. User clicks "Start Workout" on the frontend.
2. A page or component calls a frontend service like `workoutApi.js`.
3. The frontend sends a request to backend route `/api/workouts/start`.
4. The route passes control to `workoutController.js`.
5. The controller may call `workoutService.js`.
6. The service stores data using `WorkoutSession.js`.
7. Backend returns JSON response.
8. Frontend updates the UI and opens the media player.
9. `playerStore.js` keeps track of the current song and playback state.

This is the full app chain:

`UI -> frontend service -> backend route -> controller -> service -> model -> database`

## What "Model", "Controller", "Route", "Service" Mean in Simple Words

- `Model`: what data looks like
- `Route`: which URL goes where
- `Controller`: handles request and response
- `Service`: contains main business logic
- `Middleware`: checks or filters requests before main logic
- `Store`: shared frontend state
- `Hook`: reusable frontend behavior
- `Layout`: common page wrapper
- `Utility`: helper function used in many places

## Suggested First Build Order

Do not build everything at once. Build in this order:

1. `Auth`
2. `User profile`
3. `Workout model + routes`
4. `Workout session tracking`
5. `Song + playlist model`
6. `Frontend dashboard`
7. `Media player UI`
8. `Connect workout and music together`
9. `Progress and analytics`

## How Your Current Backend Fits

Right now your backend already has the start of:

- `authController.js`
- `authRoutes.js`
- `User.js`
- `server.js`

That means you already began:

- models
- controllers
- routes
- server bootstrapping

The next cleanup step later will be to move your backend into:

```text
backend/
└── src/
    ├── controllers/
    ├── models/
    ├── routes/
    └── server.js
```

This is not required immediately, but it will make the project easier to scale.

## Best Mental Model

If you ever feel confused, remember:

- frontend shows things
- backend manages things
- database stores things
- routes direct things
- controllers handle things
- services decide things
- models describe things

That one sentence will help a lot while building.
