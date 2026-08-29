# Florida Living Hub

A Gulf Coast beach-day planner that helps locals and visitors choose the right Florida beach based on conditions, safety factors, UV, parking, and practical local tips. Also includes an early utility cost estimator for people exploring Florida living costs.

> **Gulf Coast Beta** — currently covering 17 Gulf Coast beaches across Sarasota, Manatee, Charlotte, Lee, Collier, and Pinellas counties.

---

## Features

### Beach Planner
- **Beach Finder** — browse 17 Gulf Coast beaches grouped by region with filters
- **Beach Conditions** — per-beach air temperature, water temperature, wind speed, UV index and weather condition are **live from [Open-Meteo](https://open-meteo.com)**, refreshed server-side every ~20 minutes; rip current risk and red tide status remain **demo/mock data**
- **Beach Day Score** — 0–100 score calculated from safety and comfort factors
- **Safety Status** — Go / Caution / Avoid per beach, derived from the same score
- **Best Time To Go** — recommended visit window based on live UV and heat
- **Parking & Access** — parking difficulty rating, arrival tip, and directions per beach
- **Nearby Food & Activities** — curated suggestions with auto-detected icons
- **Safety Disclaimer** — visible live-vs-demo provenance label, live-feed health indicator, and official advisory reminder on all condition pages

### Utility Calculator
- Rough monthly estimate for electricity, water, and internet costs
- Covers Tampa, Miami, Orlando, Sarasota, and Jacksonville
- Demo estimates — not live utility rates

---

## Tech Stack

| Layer    | Technology             |
|----------|------------------------|
| Frontend | React 18 + Vite        |
| Routing  | React Router v6        |
| Styling  | CSS Modules            |
| Backend  | Node.js + Express      |
| Data     | Mock JSON (swap-ready) |

---

## Setup & Running

### Prerequisites
- Node.js 20+ (pinned via `engines` in both `package.json` files)
- npm
- No `.env` files required **for local dev** — the backend defaults to port 3001 and allows `http://localhost:5173`, and the frontend proxies `/api` through Vite. **Production is different:** both services need environment variables set on the hosting platform — see [Deployment](#deployment).
  An optional root `.env` with `PEXELS_API_KEY` is only used by a one-off local script for sourcing beach photos, not by the app itself.

### 1. Clone the repo

```bash
git clone <repo-url>
cd "Florida Living Hub"
```

### 2. Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend (open a new terminal or go back to root first)
cd ../frontend
npm install
```

### 3. Start the app

**Start backend first** — the frontend proxies `/api` calls to `localhost:3001`.

```bash
# Terminal 1 — backend (port 3001)
cd backend
npm run dev

# Terminal 2 — frontend (port 5173)
cd frontend
npm run dev
```

Then open **http://localhost:5173** in your browser.

---

## Deployment

Deployed as two separate services:

| Part     | Host   | Root directory | Build           | Serve           |
|----------|--------|----------------|-----------------|-----------------|
| Backend  | Render | `backend`      | `npm ci`        | `npm start`     |
| Frontend | Vercel | `frontend`     | `npm run build` | static `dist/`  |

The backend is described by [`render.yaml`](render.yaml) at the repo root, so Render can provision it as a blueprint rather than by hand. Render assigns `PORT` automatically — the server reads it and falls back to 3001 locally.

### Required environment variables

Set these on the hosting platform, not in a committed file. Both files are documented in full — with formats and examples — in [`backend/.env.example`](backend/.env.example) and [`frontend/.env.example`](frontend/.env.example).

| Variable            | Service  | Required | Notes                                                                  |
|---------------------|----------|----------|------------------------------------------------------------------------|
| `NODE_ENV`          | Backend  | Yes      | Set to `production`. Disables the automatic localhost CORS allowance.   |
| `CORS_ORIGINS`      | Backend  | Yes      | Comma-separated allowed frontend origins, e.g. the Vercel URL.         |
| `VITE_API_BASE_URL` | Frontend | Yes      | Public origin of the Render backend, no trailing slash.                |
| `WEATHER_*`         | Backend  | No       | Open-Meteo refresh/timeout/retry tuning. Defaults are fine.            |

Two things worth knowing:

- **`CORS_ORIGINS` has no production default.** With `NODE_ENV=production` the server throws at startup if it is empty, rather than booting and failing later as an opaque browser CORS error. A deploy that fails here means the variable is missing.
- **`VITE_API_BASE_URL` is baked into the bundle at build time**, not read at runtime. Changing it needs a rebuild, not just a restart.

### Health checks

Point platform health checks and uptime monitors at `/`, which returns 200 unconditionally. Do **not** use `/api/live-data-status` — it returns 503 by design when the weather feed goes stale, which would make the platform restart an otherwise healthy server.

---

## Pages & Navigation

| Route             | Page                              |
|-------------------|------------------------------------|
| `/`               | Home                               |
| `/beach-finder`   | Beach Finder (main)                |
| `/beaches`        | Redirects to `/beach-finder`       |
| `/beaches/:id`    | Beach Detail                       |
| `/calculator`     | Utility Cost Calculator            |
| `/about`          | About & Roadmap                    |

Desktop navbar (>760px): **Home | Beach Finder [Beta] | Utility Calculator | About | Roadmap**

Mobile bottom nav (≤760px): **Home | Beaches | Utility | About | Roadmap**

---

## API Routes

| Method | Route                    | Description                              |
|--------|--------------------------|------------------------------------------|
| GET    | `/api/beaches`           | All beaches with live conditions + scores |
| GET    | `/api/beaches/:id`       | Single beach details                     |
| GET    | `/api/live-data-status`  | Health of the Open-Meteo live feed       |
| POST   | `/api/utility-estimate`  | Monthly utility estimate                 |

### GET `/api/live-data-status`

Health check for the live weather pipeline. Returns **200** while the feed is healthy and **503** when it is `stale` or `unavailable`, so an uptime monitor catches a silent break without polling `/api/beaches`.

```json
{
  "success": true,
  "data": {
    "status": "live",
    "source": "Open-Meteo",
    "licence": "Open-Meteo free tier (non-commercial use)",
    "fetchedAt": "2026-08-29T08:36:34.821Z",
    "lastSuccessAt": "2026-08-29T08:36:34.821Z",
    "ageMinutes": 0,
    "refreshIntervalMinutes": 20,
    "liveFields": ["airTemperature", "waterTemperature", "windSpeed", "uvIndex", "weatherCondition"],
    "demoFields": ["ripCurrentRisk", "redTideStatus"],
    "error": null
  }
}
```

The same block is returned as `meta.liveData` on `/api/beaches` and `/api/beaches/:id`. When a refresh fails, `status` becomes `stale` (cached values retained, never passed off as fresh) or `unavailable`, and `error` carries the underlying message.

### POST `/api/utility-estimate` body

```json
{
  "city": "Tampa",
  "apartmentSize": "2 Bedroom",
  "numberOfPeople": 2,
  "internetNeeded": true
}
```

---

## Beach Day Score Logic

Score starts at 100. Deductions applied per factor:

| Factor                  | Deduction |
|-------------------------|-----------|
| Rip Current: High       | −40       |
| Rip Current: Moderate   | −18       |
| Red Tide: High          | −40       |
| Red Tide: Medium        | −22       |
| Red Tide: Low           | −10       |
| Weather: Stormy         | −45       |
| Weather: Rainy          | −25       |
| Weather: Cloudy         | −5        |
| UV ≥ 11 (Extreme)       | −12       |
| UV 8–10 (High)          | −6        |
| Heat Risk: Extreme      | −18       |
| Heat Risk: High         | −8        |
| Wind ≥ 25 mph           | −15       |
| Wind 20–24 mph          | −8        |
| Wind 15–19 mph          | −4        |
| Parking: Difficult      | −6        |
| Parking: Moderate       | −2        |

**Score ≥ 70 → Go | Score 40–69 → Caution | Score < 40 → Avoid**

Heat risk is derived from air temperature (≥ 105°F Extreme, ≥ 98°F High, ≥ 90°F Moderate).
Parking difficulty is derived from parking notes text.

---

## Project Structure

```
Florida Living Hub/
├── backend/
│   └── src/
│       ├── server.js
│       ├── data/           beaches.js, utilityRates.js
│       ├── routes/         beaches.js, utility.js
│       ├── middleware/     errorHandler.js
│       └── utils/          beachScore.js
└── frontend/
    └── src/
        ├── App.jsx
        ├── components/
        │   ├── Navbar/
        │   ├── BottomNav/
        │   ├── Footer/
        │   ├── ScrollToTop/
        │   ├── BeachFlipCard/
        │   ├── BeachDetails/
        │   ├── BeachScore/
        │   ├── StatusBadge/
        │   ├── SafetyDisclaimer/
        │   ├── BestTimeToGo/
        │   ├── NearbySection/
        │   ├── FeatureCard/
        │   ├── UtilityCalculator/
        │   ├── LoadingState/
        │   └── ErrorState/
        ├── pages/
        │   ├── HomePage
        │   ├── BeachFinderPage
        │   ├── BeachDetailPage
        │   ├── UtilityCalculatorPage
        │   └── AboutPage
        ├── hooks/          useFetch.js
        ├── utils/          bestTimeToGo.js
        └── styles/         global.css
```

---

## Data Notice

Beach **weather is live**. Air temperature, water temperature, wind speed, UV index and weather condition are fetched server-side from the [Open-Meteo](https://open-meteo.com) forecast and marine APIs and refreshed every 20 minutes (configurable via `WEATHER_REFRESH_MINUTES`). All 17 beaches are covered by two batched requests per refresh — roughly 144 calls/day.

> **Licensing:** the Open-Meteo free tier is **non-commercial only** and limited to about 10,000 calls/day. A paid Open-Meteo plan (or an equivalent licensed provider) is required before any commercial launch.

**Rip current risk, red tide status and all utility estimates are still demo/mock data** and are not connected to any feed.

If the Open-Meteo pipeline fails it is never silently replaced with defaults. The failure is logged with a `[weather] ERROR` prefix, exposed in `meta.liveData` on `/api/beaches`, returned as HTTP 503 from `/api/live-data-status`, and shown in the in-app disclaimer banner. Missing values render as `—`, never as estimates.

Do not use any of this for real safety decisions — always check official local sources and posted beach flags before swimming.

---

## Roadmap

### Beach Planner — Coming Soon
- NOAA rip current and red tide feeds replacing the last demo condition fields
- Interactive Gulf Coast beach map
- East Coast and South Florida regions
- Crowd and parking condition indicators

### Florida Living Platform — Planned Later
- Restaurants and local guides
- Hotels and vacation rentals
- Moving to Florida guides
- Hurricane preparation checklist
- Flood zone and insurance basics
- New resident checklist
