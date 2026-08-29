require("dotenv").config();
const express = require("express");
const cors = require("cors");
const beachRoutes = require("./routes/beaches");
const utilityRoutes = require("./routes/utility");
const errorHandler = require("./middleware/errorHandler");
const weatherService = require("./services/weatherService");

const app = express();
const PORT = process.env.PORT || 3001;

// Allowed browser origins, comma-separated, via CORS_ORIGINS.
//
// In development the local Vite origin is allowed automatically, so no env var
// is needed; extra entries (e.g. a LAN IP for testing on other devices) are
// appended. In production there is NO default — CORS_ORIGINS must name the
// deployed frontend origin(s). A missing value fails loudly at boot instead of
// silently degrading into an opaque browser CORS error at request time.
const IS_PRODUCTION = process.env.NODE_ENV === "production";

const configuredOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

if (IS_PRODUCTION && configuredOrigins.length === 0) {
  throw new Error(
    "CORS_ORIGINS must be set when NODE_ENV=production: comma-separated list " +
      "of allowed frontend origins, e.g. https://florida-living-hub.example.com"
  );
}

const allowedOrigins = IS_PRODUCTION
  ? configuredOrigins
  : ["http://localhost:5173", ...configuredOrigins];

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Florida Living Hub API is running" });
});

// Health probe for the live weather pipeline. Returns 503 when the Open-Meteo
// feed is stale or unavailable so an uptime monitor catches a silent break.
app.get("/api/live-data-status", (req, res) => {
  const status = weatherService.getStatus();
  res.status(status.status === "live" ? 200 : 503).json({
    success: status.status === "live",
    data: status,
  });
});

app.use("/api/beaches", beachRoutes);
app.use("/api", utilityRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use(errorHandler);

// Kick off the first Open-Meteo fetch and the periodic refresh. Failures are
// logged with a [weather] ERROR prefix and surfaced via meta.liveData on
// /api/beaches and /api/live-data-status — they are never swallowed.
weatherService.start();

// PORT is assigned by the host in production (Render, Heroku, Fly, ...) and
// falls back to 3001 for local dev. Express binds all interfaces by default, so
// the platform health check can reach the container.
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Allowed CORS origins: ${allowedOrigins.join(", ")}`);
});
