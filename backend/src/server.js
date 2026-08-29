require("dotenv").config();
const express = require("express");
const cors = require("cors");
const beachRoutes = require("./routes/beaches");
const utilityRoutes = require("./routes/utility");
const errorHandler = require("./middleware/errorHandler");
const weatherService = require("./services/weatherService");

const app = express();
const PORT = process.env.PORT || 3001;

// Always allow the default local dev origin; add more (e.g. a LAN IP for
// testing on other devices) via a comma-separated CORS_ORIGINS env var.
const defaultOrigins = ["http://localhost:5173"];
const extraOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(cors({ origin: [...defaultOrigins, ...extraOrigins] }));
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
