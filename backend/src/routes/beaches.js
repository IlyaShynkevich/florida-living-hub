const express = require("express");
const router = express.Router();
const beaches = require("../data/beaches");
const { calculateBeachScore } = require("../utils/beachScore");
const weatherService = require("../services/weatherService");

const LIVE_FIELDS = [
  "airTemperature",
  "waterTemperature",
  "windSpeed",
  "uvIndex",
  "weatherCondition",
];

/**
 * Merges live Open-Meteo conditions into a static beach record and scores it.
 *
 * Missing live values stay null — they are never replaced with a default or a
 * previous demo number. Whatever is missing is reported on the beach itself via
 * `dataStatus` / `liveDataError` / `liveDataIssues`, and again at the top level
 * in `meta.liveData`.
 */
function enrichBeach(beach) {
  const live = weatherService.getConditions(beach.id);

  const conditions = {};
  for (const field of LIVE_FIELDS) {
    conditions[field] = live ? live[field] : null;
  }

  const merged = { ...beach, ...conditions };
  const {
    score,
    label,
    explanation,
    warnings,
    positives,
    parkingDifficulty,
    heatRisk,
    missingLiveInputs,
  } = calculateBeachScore(merged);

  const missingFields = LIVE_FIELDS.filter((f) => conditions[f] === null);

  let dataStatus;
  let liveDataError = null;
  if (!live) {
    dataStatus = "unavailable";
    liveDataError = "Live weather data could not be retrieved from Open-Meteo.";
  } else if (missingFields.length > 0) {
    dataStatus = "degraded";
    liveDataError = `Open-Meteo did not return: ${missingFields.join(", ")}.`;
  } else {
    // Weather is live; rip current / red tide are still demo.
    dataStatus = "live-weather";
  }

  return {
    ...merged,
    dataStatus,
    liveDataError,
    liveDataIssues: live ? live.issues : [],
    conditionsObservedAt: live ? live.observedAt : null,
    beachScore: score,
    status: label,
    parkingDifficulty,
    heatRisk,
    recommendation: { score, label, explanation, warnings, positives, missingLiveInputs },
  };
}

// GET /api/beaches
router.get("/", async (req, res, next) => {
  try {
    // Waits only for the very first refresh attempt after boot; afterwards this
    // resolves immediately and the cached snapshot is served.
    await weatherService.ensureReady();
    const enriched = beaches.map(enrichBeach);
    res.json({
      success: true,
      data: enriched,
      meta: { liveData: weatherService.getStatus() },
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/beaches/:id
router.get("/:id", async (req, res, next) => {
  try {
    await weatherService.ensureReady();
    const beach = beaches.find((b) => b.id === req.params.id);
    if (!beach) {
      return res.status(404).json({ success: false, message: "Beach not found" });
    }
    res.json({
      success: true,
      data: enrichBeach(beach),
      meta: { liveData: weatherService.getStatus() },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
