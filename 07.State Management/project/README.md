# Mission Control — State Management (NgRx)

Angular 19 demo application for **SoftUni Angular — State Management**. It simulates a small **space mission control** workspace: browsing missions, planning new ones, registering crew, and a protected command area. Global mission data is held in **NgRx Store** (add / delete / load actions and selectors).

---

## Quick start

Prerequisites: **Node.js** (LTS) and **npm** (or your preferred package manager).

```bash
npm install
npm start
```

Open `http://localhost:4200/`. The app redirects the home route to `/missions`.

---

## Tech stack

- Angular 19 (standalone components, routing)
- **@ngrx/store** for missions state (reducer, actions, selectors)
- Reactive Forms, template-driven forms, Angular Signals (demo page)
- Route guards (`authGuard`), resolver (`missionResolver`), HTTP client with interceptors

---

# Functional Guide

This section describes what the application is for, how users move through it, what the main features do, and how the UI is used. It matches the behaviour implemented in this repository.

## 1. Purpose of the application

**Mission Control** lets a user **review a catalogue of space missions**, **open a mission for more detail**, **create new missions** with validated data, **remove missions** from the catalogue, **register crew members** (local form demo), **explore Angular Signals** on a separate screen, and **sign in** to reach a **Command Center** that is hidden from anonymous users.

The educational goal is to show **centralised application state** for missions using **NgRx**: the mission list and create/delete flows read and update the store, while routing, forms, auth, and notifications illustrate common Angular patterns used alongside state management.

## 2. Main user flows

| Flow | What the user does | What happens |
|------|-------------------|--------------|
| **Browse missions** | Opens the app or clicks **Missions** in the nav. | Sees a grid of mission cards fed by `selectAllMissions`. Each card shows status, destination, launch info (with pipes), and crew size. |
| **View mission details** | Clicks **View Details** on a card. | Navigates to `/missions/:id`. A **route resolver** loads mission data before the detail view renders; the page shows full fields or a “not found” state. |
| **Create a mission** | Clicks **New Mission**, fills the reactive form, submits. | Valid data is dispatched as `addMission`; the new mission appears in the store and the user is sent back to `/missions`. |
| **Delete a mission** | Clicks **Delete** on a card. | `deleteMission` is dispatched; that mission is removed from the store and disappears from the grid. |
| **Register crew** | Goes to **Crew Form**, fills template-driven fields, submits. | A new crew member is appended to a **local** list on that page (not NgRx); the form resets. |
| **Signals demo** | Opens **Signals** (`/countdown`). | Uses buttons to increment, decrement, reset, or set a counter; computed values and effects run for learning/demo. |
| **Login and Command Center** | Opens **Login**, signs in; then opens **Command Center**. | Login stores a demo token/user in `localStorage` and shows a toast. **Command Center** is behind `authGuard`; unauthenticated users cannot activate that route. Logout clears session (from login or command center, depending on feature). |

## 3. Core features (explanation)

- **NgRx missions feature** — Missions live in store state (`missions` reducer). **Actions** include load, load success, add, delete, and update status. **Selectors** expose all missions, loading flag, counts, and filters by status (`active` / `planned` / `completed`). The **missions list** and **mission form** are the primary consumers of this state.
- **Mission detail route** — Uses a **resolver** to fetch the mission by `id` from the **Missions service** before activating the detail component, so the detail page either shows data or a fallback message.
- **Reactive mission form** — Validates name (length), destination, status, launch date format (`YYYY-MM-DD`), and crew size (1–20). Optional description. Submit dispatches `addMission` and navigates to the list.
- **Auth (demo)** — **AuthService** uses `BehaviorSubject` and `localStorage` for a fake JWT and user profile. **Login** triggers notifications via **NotificationService** and global **NotificationComponent**.
- **HTTP interceptors** — **Auth** and **error** interceptors are registered for `HttpClient` (ready for API calls even if much of the UI uses in-memory/store data).
- **Presentation helpers** — Custom **pipes** (e.g. mission status label, time-until launch) and **directives** (e.g. highlight on hover) enrich the missions UI without changing core state logic.
- **Lazy-loaded Command Center** — Loaded on demand to keep the initial bundle smaller; access is gated by **authGuard**.

## 4. How the user interacts with the system

- **Navigation bar (“Mission Control”)** — Primary entry: links to **Missions**, **Crew Form**, **New Mission**, **Signals**, **Command Center**, and **Login** (or the current **username** when logged in).
- **Missions page** — Read-only grid from the store; **View Details** (link), **Delete** (button). Hovering highlighted areas uses the highlight directive.
- **Mission detail page** — Read-only layout; **Back to Missions** returns to the catalogue.
- **New Mission page** — Text inputs, selects, number input, optional textarea; **Create Mission** submits when the form is valid.
- **Crew Form page** — Template-driven form; submit adds a row to the on-page list.
- **Signals page** — Buttons to change the counter and observe signal/computed behaviour.
- **Login page** — Buttons to log in (demo user) or log out; toast messages confirm actions.
- **Command Center** — Shown only when authenticated; includes logout and navigation back toward login as implemented.
- **Notifications** — Global banner (top-level) for success/info messages; can be dismissed or auto-dismisses after a timeout.
- **Unknown URLs** — Fall through to a **not found** route.

---

## Repository layout (high level)

- `src/app/store/missions/` — NgRx state: actions, reducer, selectors, initial state  
- `src/app/features/` — Route-level feature components (missions, form, details, login, etc.)  
- `src/app/guards/`, `src/app/interceptors/` — Routing and HTTP cross-cutting behaviour  
- `src/layout/nav/` — Main navigation  

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Dev server (`ng serve`) |
| `npm run build` | Production build |
| `npm test` | Unit tests (Karma/Jasmine) |

---

*SoftUni Angular — Lecture / Workshop: State Management.*
