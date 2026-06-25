# Florida Living Hub

A web platform that helps residents, tourists, and newcomers in Florida quickly check beach conditions, weather, local safety alerts, and basic living cost estimates.

## Features

- Beach conditions for 6 popular Florida beaches (Siesta Key, Clearwater, Miami Beach, Daytona, Fort Lauderdale, Cocoa Beach)
- Dynamic Beach Score (1–10) calculated from UV index, wind, rip current risk, and red tide status
- Safety status per beach: Good / Be Careful / Not Recommended
- Individual beach detail pages with recommended actions and local tips
- Monthly utility cost estimator for Tampa, Miami, Orlando, Sarasota, and Jacksonville

## Tech Stack

| Layer    | Technology              |
|----------|-------------------------|
| Frontend | React 18 + Vite         |
| Routing  | React Router v6         |
| Styling  | CSS Modules             |
| Backend  | Node.js + Express       |
| Data     | Mock JSON (swap-ready)  |

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

## API Routes

| Method | Route                    | Description               |
|--------|--------------------------|---------------------------|
| GET    | `/api/beaches`           | All beaches with scores   |
| GET    | `/api/beaches/:id`       | Single beach details      |
| POST   | `/api/utility-estimate`  | Monthly utility estimate  |

### POST `/api/utility-estimate` body

```json
{
  "city": "Tampa",
  "apartmentSize": "2 Bedroom",
  "numberOfPeople": 2,
  "internetNeeded": true
}
```

## Project Structure

```
Florida Living Hub/
├── backend/
│   └── src/
│       ├── server.js
│       ├── data/          beaches.js, utilityRates.js
│       ├── routes/        beaches.js, utility.js
│       ├── middleware/    errorHandler.js
│       └── utils/         beachScore.js
└── frontend/
    └── src/
        ├── App.jsx
        ├── components/    Navbar, Footer, BeachCard, BeachDetails,
        │                  StatusBadge, BeachScore, FeatureCard,
        │                  UtilityCalculator, LoadingState, ErrorState
        ├── pages/         Home, BeachConditions, BeachDetail,
        │                  UtilityCalculator, About
        ├── hooks/         useFetch.js
        └── styles/        global.css
```

## Beach Score Logic

Starts at 10, deductions applied:

| Factor               | Deduction          |
|----------------------|--------------------|
| UV ≥ 11              | −2                 |
| UV 8–10              | −1                 |
| Wind ≥ 20 mph        | −2                 |
| Wind 15–19 mph       | −1                 |
| Rip Current: High    | −3                 |
| Rip Current: Moderate| −1.5               |
| Red Tide: High       | −3                 |
| Red Tide: Medium     | −2                 |
| Red Tide: Low        | −1                 |
| Air temp 78–88°F     | +0.5               |

Score ≥ 7 → **Good** | Score 4–6.9 → **Be Careful** | Score < 4 → **Not Recommended**

## Future Improvements

- Real-time weather API (OpenWeatherMap / NWS)
- NOAA red tide and rip current feeds
- Hurricane preparation tracker
- Interactive beach map
- User accounts with saved favorite beaches
- Local dining and activity guides
- Push notifications for safety alerts

## Screenshots

_Add screenshots here after running the app._

## Notes

All beach condition data and utility estimates are mock data for MVP demonstration purposes only. Do not use for real safety decisions.
