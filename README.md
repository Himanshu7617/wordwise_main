# WordWise

## Overview

WordWise is a comprehensive platform designed to help users learn German vocabulary in a fun and interactive way. It consists of a web application and a Chrome extension that work together to provide seamless vocabulary learning experiences. The platform allows users to track their word history, learn new words from real web pages, and revise using flashcards.

- **Live Website:** [https://www.wordwise.foo/](https://www.wordwise.foo/)
- **Chrome Extension:** Converts English words on web pages to German, helping users learn in context.
- **User Accounts:** Sign up to save your word history and access personalized features.
- **Flashcards & Dashboard:** Review and revise learned words.

---

## Features

### Website
- User registration and login
- Personalized dashboard to track learned words
- Flashcards for revision
- Profile management
- Modern, animated UI

### Chrome Extension
- Replaces English words on any webpage with their German translations
- Stores learned words in local storage and syncs with backend
- Popup UI for quick word learning and account linking
- Uses AI (Google Gemini) for translations and examples

---

## Project Structure
wordwise_extension_main/ ├── wordwise_extension/ │ ├── extension_backend/ # Node.js backend for extension (Express, Firebase, Gemini AI) │ └── extension_frontend/ # Chrome extension frontend (TypeScript, Webpack, Tailwind) ├── wordwise_website/ │ ├── backend/ # Cloudflare Worker backend (Hono, Prisma, JWT) │ └── frontend/ # React web app (Vite, Tailwind, Material UI)


---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm
- Chrome browser (for extension)

---

## 1. Setting Up the Website

### Backend (Cloudflare Worker)

```powershell
cd wordwise_website/backend
npm install
npm run dev   # Start local development server
npm run deploy   # Deploy to Cloudflare

Configure environment variables in Wrangler config (wrangler.jsonc).
Prisma is used for database access. See prisma/schema.prisma for models.
Frontend (React)

cd wordwise_website/frontend
npm install
npm run dev   # Start local dev server

Access the site at http://localhost:5173 (default Vite port).

2. Setting Up the Chrome Extension
Extension Frontend

cd wordwise_extension/extension_frontend
npm install
npm run build   # Build extension files

Load the extension_frontend/static folder as an unpacked extension in Chrome.
The extension popup allows you to sign in and learn new words.
Extension Backen

cd wordwise_extension/extension_backend
npm install
npm start   # Start backend server (default port 3000)

Configure your Firebase credentials in serviceAccountKey.json.
Set your Gemini AI API key in a .env file.
3. Connecting Everything
The extension communicates with the backend to fetch random German words and their English translations.
User authentication is handled via JWT tokens.
Learned words are stored in the backend and synced to the website dashboard.

Development Notes
Tech Stack:
Website Backend: Cloudflare Worker, Hono, Prisma, JWT
Website Frontend: React, Vite, Tailwind, Material UI
Extension Backend: Node.js, Express, Firebase, Gemini AI
Extension Frontend: TypeScript, Webpack, Tailwind
Database:
Prisma schema for users and words
AI Integration:
Google Gemini API for translations and examples
Useful Links
Live Website
Chrome Extension (manual install)
Project Repository


Contributing
Pull requests and suggestions are welcome! Please open an issue to discuss changes or improvements.

License
This project is licensed under the ISC License.