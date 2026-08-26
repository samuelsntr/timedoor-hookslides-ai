# HookSlides AI frontend

The HookSlides AI frontend is built with React, TypeScript, and Vite.

## Prerequisites

- Node.js 20 or newer
- npm
- Backend running at `http://localhost:3000` for API features

## Setup

From the repository root:

```bash
cd frontend/user
npm install
```

## Run the development server

```bash
cd frontend/user
npm run dev
```

Open the URL displayed by Vite, usually <http://localhost:5173>.

Run the backend in a separate terminal:

```bash
cd server
npm install
cp .env.example .env
npm run migrate
npm run dev
```

## Available commands

```bash
npm run dev      # Start the development server with HMR
npm run build    # Type-check and create a production build
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

## Production build

```bash
cd frontend/user
npm run build
```

The build output is generated in `frontend/user/dist`.
