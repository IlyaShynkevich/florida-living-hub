/**
 * Derives a heat risk level from air temperature.
 * Florida-calibrated: 90°F+ is meaningful heat for sustained beach activity.
 */
function deriveHeatRisk(airTemperature) {
  if (airTemperature == null) return 'Moderate'
  if (airTemperature >= 105) return 'Extreme'
  if (airTemperature >= 98)  return 'High'
  if (airTemperature >= 90)  return 'Moderate'
  return 'Low'
}

/**
 * Decision-support only. Returns a recommended time window for a beach visit
 * based on UV, heat, and weather. Uses demo data — not live conditions.
 */
export function calcBestTimeToGo({ uvIndex, airTemperature, weatherCondition }) {
  const heatRisk = deriveHeatRisk(airTemperature)

  if (weatherCondition === 'Stormy') {
    return {
      window: 'Not recommended today',
      reason: 'Stormy conditions are forecast. Lightning and strong surf make beach visits unsafe at any hour.',
      tip: 'Check the forecast again before heading out — Florida storms can clear quickly.',
      severity: 'avoid',
    }
  }

  if (weatherCondition === 'Rainy') {
    return {
      window: 'Check for clearing',
      reason: 'Rainy conditions are expected. If rain clears, late afternoon may offer a usable window.',
      tip: 'Monitor local weather updates before going. Afternoon clearing is common in Florida.',
      severity: 'caution',
    }
  }

  const extremeUV  = uvIndex >= 11
  const highUV     = uvIndex >= 8
  const extremeHeat = heatRisk === 'Extreme'
  const highHeat    = heatRisk === 'High'

  if (extremeUV || (highUV && extremeHeat)) {
    return {
      window: 'Early morning (before 10 am)',
      reason: `UV is ${extremeUV ? 'extreme' : 'very high'} and heat builds fast. Before 10 am offers the best combination of manageable UV and cooler temperatures.`,
      tip: 'Apply SPF 50+ before leaving home. Bring water and a shade umbrella. Avoid the beach between 10 am and 4 pm.',
      severity: 'caution',
    }
  }

  if (highUV && highHeat) {
    return {
      window: 'Morning or late afternoon',
      reason: 'UV is high and temperatures are elevated. Midday (10 am – 4 pm) has the most intense sun and heat combined.',
      tip: 'If going midday, bring SPF 50+, a wide-brim hat, shade cover, and extra water. Take regular breaks.',
      severity: 'caution',
    }
  }

  if (highUV) {
    return {
      window: 'Morning or late afternoon',
      reason: 'UV index is high — sun exposure is most intense between 10 am and 4 pm.',
      tip: 'Bring SPF 50+, a hat, and sunglasses. If going midday, seek shade and reapply sunscreen every 90 minutes.',
      severity: 'mild-caution',
    }
  }

  if (highHeat || extremeHeat) {
    return {
      window: 'Morning or evening',
      reason: 'Heat builds significantly through the day. Mornings are cooler and more comfortable for extended beach time.',
      tip: 'Stay well hydrated. If visiting in the afternoon, plan frequent shade breaks and bring extra water.',
      severity: 'mild-caution',
    }
  }

  return {
    window: 'Anytime today',
    reason: 'Conditions are comfortable throughout the day.',
    tip: 'UV is still present in Florida even on mild days — sunscreen is always a good call.',
    severity: 'good',
  }
}
