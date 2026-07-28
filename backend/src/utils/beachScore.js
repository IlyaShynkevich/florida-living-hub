/**
 * Beach Day Score — the single source of truth for beach scoring.
 * Returns a 0–100 score, a Go/Caution/Avoid label, an explanation,
 * a list of warning reasons, and a list of positive reasons.
 *
 * This does NOT guarantee beach safety. Always check official local
 * conditions before visiting.
 */
function calculateBeachScore(beach) {
  const {
    uvIndex,
    airTemperature,
    ripCurrentRisk,   // 'Low' | 'Moderate' | 'High'
    redTideStatus,    // 'None' | 'Low' | 'Medium' | 'High'
    weatherCondition, // 'Sunny' | 'Partly Cloudy' | 'Cloudy' | 'Rainy' | 'Stormy'
    windSpeed,
    parkingNotes,
  } = beach;

  const heatRisk = deriveHeatRisk(airTemperature);
  const parkingDifficulty = deriveParkingDifficulty(parkingNotes);

  let score = 100;
  const warnings = [];
  const positives = [];

  // --- Rip current (major safety factor) ---
  if (ripCurrentRisk === "High") {
    score -= 40;
    warnings.push("High rip current risk — swimming is not recommended. Check flags and stay out of the water.");
  } else if (ripCurrentRisk === "Moderate") {
    score -= 18;
    warnings.push("Moderate rip current risk — swim near a lifeguard and stay close to shore.");
  } else if (ripCurrentRisk === "Low") {
    positives.push("Low rip current risk.");
  }

  // --- Red tide (major safety factor) ---
  if (redTideStatus === "High") {
    score -= 40;
    warnings.push("High red tide — respiratory irritation likely near the water. Most people should avoid the beach area.");
  } else if (redTideStatus === "Medium") {
    score -= 22;
    warnings.push("Medium red tide detected — sensitive individuals may experience irritation. Check local advisories.");
  } else if (redTideStatus === "Low") {
    score -= 10;
    warnings.push("Low red tide levels — sensitive individuals should take precautions.");
  } else if (redTideStatus === "None") {
    positives.push("No red tide reported.");
  }

  // --- Weather ---
  if (weatherCondition === "Stormy") {
    score -= 45;
    warnings.push("Stormy conditions — do not enter the water. Lightning and strong surf are serious hazards.");
  } else if (weatherCondition === "Rainy") {
    score -= 25;
    warnings.push("Rainy conditions expected — reduced visibility and comfort.");
  } else if (weatherCondition === "Cloudy") {
    score -= 5;
  } else if (weatherCondition === "Sunny") {
    positives.push("Sunny skies.");
  } else if (weatherCondition === "Partly Cloudy") {
    positives.push("Partly cloudy — good beach weather.");
  }

  // --- UV index ---
  if (uvIndex >= 11) {
    score -= 12;
    warnings.push("Extreme UV index — SPF 50+ required. Seek shade at midday and reapply sunscreen every 90 min.");
  } else if (uvIndex >= 8) {
    score -= 6;
    warnings.push("High UV index — sunscreen and hat recommended, especially 10 am – 4 pm.");
  } else if (uvIndex !== undefined && uvIndex <= 5) {
    positives.push("Mild UV levels.");
  }

  // --- Heat risk ---
  if (heatRisk === "Extreme") {
    score -= 18;
    warnings.push("Extreme heat — stay hydrated, limit midday exposure, and take regular shade breaks.");
  } else if (heatRisk === "High") {
    score -= 8;
    warnings.push("High heat — drink water frequently and take breaks in shade.");
  } else if (heatRisk === "Low") {
    positives.push("Comfortable air temperature.");
  }

  // --- Wind speed ---
  if (windSpeed >= 25) {
    score -= 15;
    warnings.push("Strong winds — blowing sand and rough surf likely.");
  } else if (windSpeed >= 20) {
    score -= 8;
    warnings.push("Elevated wind — expect choppy water and blowing sand.");
  } else if (windSpeed >= 15) {
    score -= 4;
    warnings.push("Moderate wind — some chop in the water.");
  } else if (windSpeed !== undefined && windSpeed < 10) {
    positives.push("Light winds — calm water conditions.");
  }

  // --- Parking (convenience only — small impact) ---
  if (parkingDifficulty === "Difficult") {
    score -= 6;
    warnings.push("Parking is very limited — arrive early or use rideshare / trolley if available.");
  } else if (parkingDifficulty === "Moderate") {
    score -= 2;
  } else if (parkingDifficulty === "Easy") {
    positives.push("Parking is relatively easy to find.");
  }

  score = Math.max(0, Math.min(100, Math.round(score)));

  let label, explanation;
  if (score >= 70) {
    label = "Go";
    explanation = "Conditions look favorable for a beach day based on demo data. Confirm with official local sources before going.";
  } else if (score >= 40) {
    label = "Caution";
    explanation = "One or more factors warrant attention. Review the warnings below and check official local advisories.";
  } else {
    label = "Avoid";
    explanation = "Significant risks make this a poor candidate for a beach day. Check official local conditions before visiting.";
  }

  return { score, label, explanation, warnings, positives, parkingDifficulty };
}

/**
 * Derives a heat risk level from air temperature.
 * Florida-calibrated: 90°F+ is meaningful heat for sustained beach activity.
 */
function deriveHeatRisk(airTemperature) {
  if (airTemperature == null) return "Moderate";
  if (airTemperature >= 105) return "Extreme";
  if (airTemperature >= 98) return "High";
  if (airTemperature >= 90) return "Moderate";
  return "Low";
}

/**
 * Derives parking difficulty from free-text parking notes.
 * Conservative — defaults to Moderate when uncertain.
 */
function deriveParkingDifficulty(parkingNotes) {
  if (!parkingNotes) return "Moderate";
  const s = parkingNotes.toLowerCase();
  if (s.includes("fills fast") || s.includes("very busy") || s.includes("very limited") || s.includes("limited public parking")) {
    return "Difficult";
  }
  if (s.includes("limited") || s.includes("paid") || s.includes("can be tight") || s.includes("can still fill") || s.includes("metered")) {
    return "Moderate";
  }
  return "Easy";
}

module.exports = { calculateBeachScore, deriveHeatRisk, deriveParkingDifficulty };
