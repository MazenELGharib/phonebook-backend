# Phonebook Fullstack App

This is a fullstack phonebook application with the frontend build included and served by the backend.

## Live Deployment

- Fullstack app deployed on Render:  https://phonebook-backend-7593.onrender.com 
- Opening the URL shows the frontend app immediately.

## Features

- Add, update, and delete contacts
- Filter contacts by name
- Automatic updates of frontend after changes
- Notifications for successful actions or errors

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/persons` | GET | Returns all persons in the phonebook |
| `/api/persons/:id` | GET | Returns a single person by ID |
| `/api/persons/:id` | PUT | Updates a person’s number |
| `/api/persons/:id` | DELETE | Deletes a person |
| `/` | GET | Serves the frontend build (`dist/index.html`) |

## Local Development

1. Clone the repo:
```bash
git clone https://github.com/MazenELGharib/phonebook-backend.git

2.Install dependencies:
yarn install

3.Run in development mode:
yarn dev
- Backend runs on http://localhost:3001

## Notes

- Frontend build is located in the dist folder inside this repo.
- Relative API paths are used (e.g., /api/persons), no need for separate frontend URL.
- Free Render instances may spin down after inactivity; the first request may take a few seconds.
