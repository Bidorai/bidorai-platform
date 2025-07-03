# Bidovio Platform

A real-time party tray catering platform with live bidding, inspired by ezCater.com.

## Tech Stack
- **Backend:** Node.js, Express, TypeScript, Socket.IO, PostgreSQL, Redis
- **Frontend:** Next.js (App Router), React, Tailwind CSS
- **Dev Tools:** Docker, Docker Compose, Jest, ESLint

## Monorepo Structure
```
Bidovio-Platform/
  backend/      # Express API
  frontend/     # Next.js apps (customer, restaurant, admin)
  database/     # SQL schema/init scripts
  docker-compose.yml
```

## Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js 20.x (for local dev)

### Setup
1. Clone the repo
2. Copy `.env.example` to `.env` in backend and frontend as needed
3. Run `docker-compose up --build`
4. Backend: `cd backend && npm install`
5. Frontend: `cd frontend && npm install`

### Useful Commands
- `docker-compose up` – Start Postgres, Redis, and backend
- `cd backend && npm run dev` – Start backend in dev mode
- `cd frontend/customer && npm run dev` – Start customer app

---

See each subfolder for more details. 