# AI Evaluation & Interview Platform (MERN + Gemini)

A full-stack architecture blueprint for a professional, AI-powered technical assessment platform. Designed for bootcamp-style evaluation with adaptive difficulty, rubric-based scoring, and structured feedback.

## Tech Stack

**Frontend**
- React (Hooks)
- Axios
- Context API
- Mobile-first responsive CSS

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- Gemini API integration

## Features

- Phase-wise evaluation (Phases 1–5)
- Adaptive questioning (escalate/simplify)
- Rubric-based scoring (Understanding 20%, Technical 60%, Solution & UX 20%)
- Mock Technical Interview Mode
- Session storage in MongoDB
- Admin results dashboard

## Monorepo Structure

```
/phase-assistant
  /client
  /server
```

## Quick Start (Blueprint Scaffold)

### 1) Server

```
cd server
npm install
npm run dev
```

### 2) Client

```
cd client
npm install
npm run dev
```

## Environment

Create a .env file inside /server:

```
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_key
PORT=5000
```

## API Endpoints

- POST /api/session/start
- POST /api/session/answer
- GET  /api/session/result/:id
- GET  /api/admin/results

## Admin Results (UI)

Use the "Admin Results" button in the client header to view all stored sessions.

## Architecture Artifacts

- Backend MVC structure in /server
- React pages/components in /client
- Gemini prompt templates and adaptive logic in /server/services
- Full architecture blueprint in [docs/blueprint.md](docs/blueprint.md)

## Notes

This is a **production-grade blueprint** with full structure, schemas, routes, and prompt templates. You can extend it with auth, analytics, and deployment pipelines.
