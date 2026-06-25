const express = require("express");
const router = express.Router();
const beaches = require("../data/beaches");
const { calculateBeachScore, calculateStatus } = require("../utils/beachScore");

function enrichBeach(beach) {
  const score = calculateBeachScore(beach);
  return { ...beach, beachScore: score, status: calculateStatus(score) };
}

// GET /api/beaches
router.get("/", (req, res) => {
  try {
    const enriched = beaches.map(enrichBeach);
    res.json({ success: true, data: enriched });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to load beaches" });
  }
});

// GET /api/beaches/:id
router.get("/:id", (req, res) => {
  try {
    const beach = beaches.find((b) => b.id === req.params.id);
    if (!beach) {
      return res.status(404).json({ success: false, message: "Beach not found" });
    }
    res.json({ success: true, data: enrichBeach(beach) });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to load beach" });
  }
});

module.exports = router;
