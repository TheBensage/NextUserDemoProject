# User App

A lightweight **Next.js 16 + React 19** project for managing users.  
Uses **Drizzle ORM** with **SQLite** for database management, **TailwindCSS** for styling, and **Vitest + Testing Library** for testing.

This project demonstrates a modern, minimal approach to building CRUD apps with type safety and testability.

---

## 🛠 Setup

### Clone & Install

`git clone https://github.com/TheBensage/NextUserDemoProject.git`
`cd NextUserDemoProject`
`npm install`

### Database Setup (SQLite + Drizzle)

#### Initialize database:

- `npx drizzle-kit generate:sqlite`
- Run migrations `npx drizzle-kit migrate:sqlite`

The database file is stored at ./db.sqlite by default.

## ⚡ Available Commands

- `npm run dev` Run development server
- `npm run build` Build project
- `npm run start` Start production server
- `npm run lint` Run ESLint checks
- `npm run test` Run all tests (Vitest + Happy DOM)
- `npm run test:watch` Run tests in watch mode

## 🧩 APIs

All API routes follow the Next.js App Router / API route pattern:

- POST /api/users – Add a new user
- GET /api/users – Get all users
- GET /api/users/:id – Get user by ID

All APIs use Drizzle ORM for type-safe queries and SQLite for persistence.

## 🖥 Components

- AddUserModal – Modal form to add a user with validation.
- UserList – Displays a list of users; handles empty and loading states.

Components are fully tested with Vitest + Testing Library.

## 📄 Pages

- / – Main page: Add user modal + User list
- /users/[id] – User detail page (dynamic routing example)

Pages use Next.js “app router” and React client components.

## 🧪 Tests

Testing is done with Vitest + @testing-library/react + Happy DOM.

Mock Next.js useRouter with `vi.fn()` for navigation.

Tests cover rendering, user interactions, form validation, and router navigation.

### Run tests:

`npm run test` or `npm run test:watch`

## 💡 Approach & Justification

- Next.js + React 19: Modern React features and server/client rendering.
- Drizzle + SQLite: Minimal, type-safe ORM for local development.
- TailwindCSS: Rapid, responsive styling without heavy CSS.
- Vitest + Testing Library: Lightweight, fast, integrates with Vite.
- Client-first components: Easier to test and decouples UI logic from backend.
- Type safety ensures fewer runtime errors.

The combination of SQLite + Drizzle makes local dev fast and simple, while Vitest ensures UI reliability before deploying.
