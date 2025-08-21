# Food Lens — Frontend (React + TypeScript + Vite)

Food Lens is a full-stack application: a React + TypeScript + Vite frontend talking to a Java Spring Boot backend. Search a dish and instantly see a concise description, ingredients, and potential benefits.

Note: This is a demo project. If the backend is on a free tier, cold starts can make the first request take 30–60 seconds.

## Links
- Live project: https://food-lens-frontend.onrender.com/
- Backend repository: https://github.com/arun-357/food-lens-backend
- Frontend stack: React 19, TypeScript 5, Vite 7, Tailwind CSS 4, Axios, React Markdown, Lucide icons

## Features
- Search foods by name and view:
  - Description
  - Ingredients
  - Benefits
- Authentication (register/login) with JWT
- Usage history (per authenticated user)
- Light/Dark mode (auto-detected, toggleable)
- Robust image handling:
  - Local placeholder image for demo
  - Fallback image if remote URLs expire (24h links)

## Quick Start
Prerequisites: Node.js 20+, npm

1. Install dependencies
```bash
npm ci
```

2. Configure environment
Create a file named `.env` in the project root:
```bash
# Base URL of the backend API (Spring Boot service)
VITE_API_URL=https://your-api.onrender.com
```

3. Run locally
```bash
npm run dev
```
The app runs on http://localhost:5173 by default.

4. Build and preview
```bash
npm run build
npm run preview
```

## Deployment (Render — Static Site)
- Build Command: `npm ci && npm run build`
- Publish Directory: `dist`
- Environment Variables:
  - `VITE_API_URL=https://your-api.onrender.com`
- SPA Rewrites (Settings → Redirects/Rewrites):
  - Source: `/*` → Destination: `/index.html` (Action: Rewrite)

If you see CORS errors, allow your frontend origin on the backend (see Backend Integration below).

## Backend Integration
The frontend expects these endpoints from the backend (see `src/contexts/AuthContext.tsx` and `src/components/SearchBar.tsx`):
- `POST /auth/login` → returns `{ accessToken: string }`
- `POST /auth/register`
- `GET /food/search?name=<query>` → returns
  ```ts
  interface FoodData {
    id?: number;
    name: string;
    description: string | null;
    ingredients: string;
    benefits: string;
    imageUrl: string; // may be a temporary URL
  }
  ```
The base URL is read from `import.meta.env.VITE_API_URL`.

CORS: Configure the Spring Boot backend to allow your Render static-site origin, and return `Access-Control-Allow-Origin` with that exact origin. If using cookies, also set `Access-Control-Allow-Credentials: true` and cookie attributes `SameSite=None; Secure`. This project uses JWT via `Authorization: Bearer <token>`.

## Project Structure
```
├─ public/
├─ src/
│  ├─ components/
│  │  ├─ SearchBar.tsx          # Search UI with loading spinner
│  │  ├─ FoodDisplay.tsx        # Renders markdown and resilient image (fallback)
│  │  ├─ LoginModal.tsx         # Login with loading state
│  │  ├─ RegisterModal.tsx      # Register with loading state
│  │  ├─ HistoryModal.tsx       # Usage history
│  │  ├─ ErrorModal.tsx         # Error toast/modal
│  │  └─ SuccessModal.tsx       # Success feedback
│  ├─ contexts/
│  │  └─ AuthContext.tsx        # Axios baseURL, JWT handling, usage counter
│  ├─ assets/                   # Placeholder/fallback images
│  ├─ App.tsx                   # Layout, theme, placeholder view (demo)
│  └─ main.tsx
├─ vite.config.ts
├─ tailwind.config.ts
└─ package.json
```

## Configuration
- Environment variables
  - `VITE_API_URL` (required): Backend API base URL.
- The app auto-detects dark mode and includes a toggle.

## Scripts
- `npm run dev` — start dev server
- `npm run build` — type-check and build for production
- `npm run preview` — preview production build
- `npm run lint` — lint the codebase

## Notes on Images
- The placeholder demo image is bundled locally and never expires.
- For real results, remote image URLs may expire in ~24 hours; `FoodDisplay` swaps to a local fallback when a 404/error occurs.

## License
This repository has no explicit license. Add one if you intend others to use it.
