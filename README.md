# Florida Living Hub

A Gulf Coast beach-day planner that helps locals and visitors choose the right Florida beach based on conditions, safety factors, UV, parking, and practical local tips. Also includes an early utility cost estimator for people exploring Florida living costs.

> **Gulf Coast Beta** — currently covering 17 Gulf Coast beaches across Sarasota, Manatee, Charlotte, Lee, Collier, and Pinellas counties.

---

## Features

### Beach Planner
- **Beach Finder** — browse 17 Gulf Coast beaches grouped by region with filters
- **Beach Conditions** — per-beach demo conditions: air/water temp, wind speed, UV index, rip current risk, red tide status
- **Beach Day Score** — 0–100 score calculated from safety and comfort factors
- **Safety Status** — Good / Be Careful / Not Recommended per beach
- **Best Time To Go** — recommended visit window based on UV and heat (demo logic)
- **Parking & Access** — parking difficulty rating, arrival tip, and directions per beach
- **Nearby Food & Activities** — curated suggestions with auto-detected icons
- **Safety Disclaimer** — visible demo data label and official advisory reminder on all condition pages

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
- Node.js 18+
- npm

### Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### Start the app

Open two terminals:

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

## Pages & Navigation

| Route             | Page                    |
|-------------------|-------------------------|
| `/`               | Home                    |
| `/beach-finder`   | Beach Finder (main)     |
| `/beaches`        | All Beach Conditions    |
| `/beaches/:id`    | Beach Detail            |
| `/calculator`     | Utility Cost Calculator |
| `/about`          | About & Roadmap         |

Desktop navbar: **Home | Beach Finder [Beta] | Utility Calculator | About | Roadmap**

---

## API Routes

| Method | Route                   | Description              |
|--------|-------------------------|--------------------------|
| GET    | `/api/beaches`          | All beaches with scores  |
| GET    | `/api/beaches/:id`      | Single beach details     |
| POST   | `/api/utility-estimate` | Monthly utility estimate |

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
        │   ├── BeachCard/
        │   ├── BeachFinderCard/
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
        │   ├── BeachConditionsPage
        │   ├── BeachDetailPage
        │   ├── UtilityCalculatorPage
        │   └── AboutPage
        ├── hooks/          useFetch.js
        ├── utils/          beachDayScore.js, bestTimeToGo.js
        └── styles/         global.css
```

---

## Data Notice

All beach condition data and utility estimates are **demo/mock data** for MVP demonstration purposes only. No live APIs are connected. Do not use for real safety decisions — always check official local sources and posted beach flags before swimming.

---

## Roadmap

### Beach Planner — Coming Soon
- Live weather and NOAA data replacing demo conditions
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
