function calculateBeachScore(beach) {
  let score = 10;

  // UV penalty
  if (beach.uvIndex >= 11) score -= 2;
  else if (beach.uvIndex >= 8) score -= 1;

  // Wind penalty
  if (beach.windSpeed >= 20) score -= 2;
  else if (beach.windSpeed >= 15) score -= 1;

  // Rip current penalty
  if (beach.ripCurrentRisk === "High") score -= 3;
  else if (beach.ripCurrentRisk === "Moderate") score -= 1.5;

  // Red tide penalty
  if (beach.redTideStatus === "High") score -= 3;
  else if (beach.redTideStatus === "Medium") score -= 2;
  else if (beach.redTideStatus === "Low") score -= 1;

  // Temperature bonus (ideal range 78–88)
  if (beach.airTemperature >= 78 && beach.airTemperature <= 88) score += 0.5;

  return Math.max(1, Math.min(10, Math.round(score * 10) / 10));
}

function calculateStatus(score) {
  if (score >= 7) return "Good";
  if (score >= 4) return "Be Careful";
  return "Not Recommended";
}

module.exports = { calculateBeachScore, calculateStatus };
