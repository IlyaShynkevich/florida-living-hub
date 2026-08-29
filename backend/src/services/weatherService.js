/**
 * Live weather service — Open-Meteo.
 *
 * Pulls real conditions for every beach in ../data/beaches.js:
 *   - air temperature, wind speed, UV index, weather code  (api.open-meteo.com/v1/forecast)
 *   - sea surface temperature                              (marine-api.open-meteo.com/v1/marine)
 *
 * Both endpoints accept comma-separated coordinate lists, so a full refresh of
 * all 17 beaches costs exactly 2 HTTP calls. At the default 60-minute interval
 * that is ~48 calls/day.
 *
 * ---------------------------------------------------------------------------
 * LICENSING / COMMERCIAL USE
 * Open-Meteo's free tier is NON-COMMERCIAL ONLY and rate-limited to roughly
 * 10,000 API calls per day. This project sits far under that ceiling, but
 * before any real commercial launch a paid Open-Meteo plan (or an equivalent
 * licensed weather provider) is REQUIRED. See https://open-meteo.com/en/pricing
 * ---------------------------------------------------------------------------
 *
 * ERROR POLICY — deliberately loud, no silent fallbacks.
 * Every failure (network error, timeout, non-200, malformed payload, missing or
 * non-numeric field, unknown weather code) is logged to the console with a
 * `[weather]` tag AND recorded in module state, which is surfaced to API clients
 * via the `meta.liveData` block on /api/beaches. Stale cached values are never
 * served as if they were fresh: when a refresh fails the previous snapshot is
 * kept but reported as `stale` with the underlying error attached. Beaches whose
 * live data could not be resolved get null condition values and a
 * `liveDataError` — never a made-up default.
 */

const beaches = require("../data/beaches");

const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
const MARINE_URL = "https://marine-api.open-meteo.com/v1/marine";

const REFRESH_MINUTES = Number(process.env.WEATHER_REFRESH_MINUTES || 60);
const REQUEST_TIMEOUT_MS = Number(process.env.WEATHER_TIMEOUT_MS || 15000);
// After a failure, retry sooner than the normal cadence so a transient blip
// does not leave the app on stale data for a full refresh interval.
const RETRY_MINUTES = Number(process.env.WEATHER_RETRY_MINUTES || 2);
// Past this age the cached snapshot is reported as "stale" rather than "live".
//
// Deliberately a FIXED 90 minutes, not a multiple of REFRESH_MINUTES. Deriving
// it from the refresh interval meant that slowing refreshes down silently
// widened the outage-detection window too — raising REFRESH_MINUTES from 20 to
// 60 pushed this from 60 minutes to 180, so up to three hours of stale weather
// would still have been reported as live. How often we poll and how long we are
// willing to serve an unrefreshed snapshot are separate decisions, so they are
// now separate constants: tuning the former no longer moves the latter.
//
// 90 minutes leaves room for one missed hourly refresh plus retries before the
// feed is called stale. If REFRESH_MINUTES is ever raised above 90, refreshes
// would age out before the next one lands — see the guard below.
const STALE_AFTER_MINUTES = 90;
const STALE_AFTER_MS = STALE_AFTER_MINUTES * 60 * 1000;

if (REFRESH_MINUTES >= STALE_AFTER_MINUTES) {
  throw new Error(
    `WEATHER_REFRESH_MINUTES (${REFRESH_MINUTES}) must be below the ${STALE_AFTER_MINUTES}-minute ` +
      `staleness threshold, otherwise every snapshot is reported stale before the next refresh lands`
  );
}

// --- module state -----------------------------------------------------------

/** @type {Map<string, object>|null} beachId -> live conditions */
let snapshot = null;
let fetchedAt = null;
let lastError = null; // { message, at, consecutiveFailures }
let lastSuccessAt = null;
let consecutiveFailures = 0;
let refreshTimer = null;
let retryTimer = null;
let readyPromise = null;
let inFlight = null;

// --- logging ----------------------------------------------------------------

function logError(message, detail) {
  console.error(`[weather] ERROR ${message}${detail ? ` :: ${detail}` : ""}`);
}

function logWarn(message) {
  console.warn(`[weather] WARN ${message}`);
}

function logInfo(message) {
  console.log(`[weather] ${message}`);
}

// --- helpers ----------------------------------------------------------------

/**
 * WMO weather code -> the vocabulary calculateBeachScore() understands.
 * Returns null for codes we do not recognise so the caller can flag it
 * rather than silently guessing "Sunny".
 */
function weatherCodeToCondition(code) {
  if (code === 0 || code === 1) return "Sunny";
  if (code === 2) return "Partly Cloudy";
  if (code === 3 || code === 45 || code === 48) return "Cloudy";
  if (
    (code >= 51 && code <= 67) ||
    (code >= 71 && code <= 77) ||
    (code >= 80 && code <= 86)
  ) {
    return "Rainy";
  }
  if (code >= 95 && code <= 99) return "Stormy";
  return null;
}

async function fetchJson(url, source) {
  let res;
  try {
    res = await fetch(url, { signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
  } catch (err) {
    const kind =
      err.name === "TimeoutError" || err.name === "AbortError"
        ? `timed out after ${REQUEST_TIMEOUT_MS}ms`
        : `request failed (${err.name}: ${err.message})`;
    throw new Error(`${source} ${kind}`);
  }

  if (!res.ok) {
    let body;
    try {
      body = (await res.text()).slice(0, 300);
    } catch {
      body = "<unreadable body>";
    }
    throw new Error(`${source} returned HTTP ${res.status} ${res.statusText} :: ${body}`);
  }

  let json;
  try {
    json = await res.json();
  } catch (err) {
    throw new Error(`${source} returned a non-JSON body (${err.message})`);
  }

  // With comma-separated coordinates Open-Meteo returns an array, one entry per
  // location, in request order. Anything else means our request shape changed or
  // the upstream contract did — neither is something to paper over.
  if (!Array.isArray(json)) {
    const detail =
      json && json.error
        ? `an API error: ${json.reason}`
        : "an object, expected an array of locations";
    throw new Error(`${source} returned ${detail}`);
  }
  if (json.length !== beaches.length) {
    throw new Error(`${source} returned ${json.length} locations, expected ${beaches.length}`);
  }
  return json;
}

/** Pulls a finite number out of an Open-Meteo `current` block, or records why it could not. */
function readNumber(current, field, beachId, issues) {
  const value = current ? current[field] : undefined;
  if (typeof value !== "number" || !Number.isFinite(value)) {
    issues.push(`${field} missing or non-numeric (got ${JSON.stringify(value)})`);
    logWarn(
      `${beachId}: ${field} missing or non-numeric in Open-Meteo response (got ${JSON.stringify(value)})`
    );
    return null;
  }
  return value;
}

function buildUrl(base, params) {
  const qs = new URLSearchParams({
    latitude: beaches.map((b) => b.latitude).join(","),
    longitude: beaches.map((b) => b.longitude).join(","),
    temperature_unit: "fahrenheit",
    timezone: "America/New_York",
    ...params,
  });
  return `${base}?${qs.toString()}`;
}

// --- the refresh ------------------------------------------------------------

async function refreshNow() {
  const startedAt = Date.now();

  const forecastUrl = buildUrl(FORECAST_URL, {
    current: "temperature_2m,wind_speed_10m,uv_index,weather_code",
    wind_speed_unit: "mph",
  });
  const marineUrl = buildUrl(MARINE_URL, {
    current: "sea_surface_temperature",
  });

  // Both endpoints must succeed. A partial refresh would mean quietly mixing
  // fresh air data with an old sea temperature — exactly the kind of invisible
  // drift this service exists to prevent.
  const [forecast, marine] = await Promise.all([
    fetchJson(forecastUrl, "Open-Meteo forecast API"),
    fetchJson(marineUrl, "Open-Meteo marine API"),
  ]);

  const next = new Map();
  let beachesWithIssues = 0;

  beaches.forEach((beach, i) => {
    const issues = [];
    const fCurrent = forecast[i] && forecast[i].current;
    const mCurrent = marine[i] && marine[i].current;

    if (!fCurrent) {
      issues.push("forecast API returned no `current` block for this location");
      logWarn(`${beach.id}: forecast API returned no 'current' block`);
    }
    if (!mCurrent) {
      issues.push("marine API returned no `current` block for this location");
      logWarn(`${beach.id}: marine API returned no 'current' block`);
    }

    const airTemperature = readNumber(fCurrent, "temperature_2m", beach.id, issues);
    const windSpeed = readNumber(fCurrent, "wind_speed_10m", beach.id, issues);
    const uvIndex = readNumber(fCurrent, "uv_index", beach.id, issues);
    const weatherCode = readNumber(fCurrent, "weather_code", beach.id, issues);
    const waterTemperature = readNumber(mCurrent, "sea_surface_temperature", beach.id, issues);

    let weatherCondition = null;
    if (weatherCode !== null) {
      weatherCondition = weatherCodeToCondition(weatherCode);
      if (weatherCondition === null) {
        issues.push(`unrecognised WMO weather_code ${weatherCode}`);
        logWarn(
          `${beach.id}: unrecognised WMO weather_code ${weatherCode} — weatherCondition left null`
        );
      }
    }

    if (issues.length > 0) beachesWithIssues += 1;

    next.set(beach.id, {
      airTemperature: airTemperature === null ? null : Math.round(airTemperature),
      waterTemperature: waterTemperature === null ? null : Math.round(waterTemperature),
      windSpeed: windSpeed === null ? null : Math.round(windSpeed),
      uvIndex: uvIndex === null ? null : Math.round(uvIndex * 10) / 10,
      weatherCondition,
      observedAt: (fCurrent && fCurrent.time) || null,
      issues,
    });
  });

  snapshot = next;
  fetchedAt = new Date();
  lastSuccessAt = fetchedAt;
  lastError = null;
  consecutiveFailures = 0;

  const ms = Date.now() - startedAt;
  logInfo(
    `refreshed ${beaches.length} beaches from Open-Meteo in ${ms}ms` +
      (beachesWithIssues > 0
        ? ` — ${beachesWithIssues} beach(es) had incomplete data (see warnings above)`
        : "")
  );
}

/**
 * Runs a refresh. Never throws — a failure is logged loudly and recorded in
 * `lastError`, which /api/beaches reports back to the client. Any previous
 * snapshot is retained but reported as stale, never as live.
 */
async function refresh() {
  if (inFlight) return inFlight;

  inFlight = (async () => {
    try {
      await refreshNow();
    } catch (err) {
      consecutiveFailures += 1;
      lastError = {
        message: err.message,
        at: new Date().toISOString(),
        consecutiveFailures,
      };
      logError(`live weather refresh FAILED (failure #${consecutiveFailures})`, err.message);
      if (snapshot) {
        const ageMin = Math.round((Date.now() - fetchedAt.getTime()) / 60000);
        logError(
          `serving CACHED weather from ${fetchedAt.toISOString()} (${ageMin} min old) — flagged stale to API clients`
        );
      } else {
        logError(
          "no cached weather available — /api/beaches will return null condition values flagged as unavailable"
        );
      }
      scheduleRetry();
    } finally {
      inFlight = null;
    }
  })();

  return inFlight;
}

/**
 * Queues a single early retry after a failure. Only relevant when the periodic
 * refresh is running (i.e. inside the server, not in a one-off script).
 */
function scheduleRetry() {
  if (!refreshTimer || retryTimer) return;
  logInfo(`retrying in ${RETRY_MINUTES} min`);
  retryTimer = setTimeout(() => {
    retryTimer = null;
    refresh();
  }, RETRY_MINUTES * 60 * 1000);
  if (retryTimer.unref) retryTimer.unref();
}

// --- public API -------------------------------------------------------------

/** Resolves once the first refresh attempt has settled (successfully or not). */
function ensureReady() {
  if (!readyPromise) readyPromise = refresh();
  return readyPromise;
}

function start() {
  ensureReady();
  if (!refreshTimer) {
    refreshTimer = setInterval(refresh, REFRESH_MINUTES * 60 * 1000);
    if (refreshTimer.unref) refreshTimer.unref();
    logInfo(
      `live data enabled — refreshing every ${REFRESH_MINUTES} min (request timeout ${REQUEST_TIMEOUT_MS}ms)`
    );
  }
}

function stop() {
  if (refreshTimer) {
    clearInterval(refreshTimer);
    refreshTimer = null;
  }
  if (retryTimer) {
    clearTimeout(retryTimer);
    retryTimer = null;
  }
}

/** Overall pipeline health: "live" | "stale" | "unavailable". */
function getStatus() {
  const ageMs = fetchedAt ? Date.now() - fetchedAt.getTime() : null;
  let status;
  if (!snapshot) {
    status = "unavailable";
  } else if (lastError || ageMs > STALE_AFTER_MS) {
    status = "stale";
  } else {
    status = "live";
  }

  return {
    status,
    source: "Open-Meteo",
    // Free tier is non-commercial, ~10k calls/day. A paid plan is required
    // before commercial launch — see the file header.
    licence: "Open-Meteo free tier (non-commercial use)",
    fetchedAt: fetchedAt ? fetchedAt.toISOString() : null,
    lastSuccessAt: lastSuccessAt ? lastSuccessAt.toISOString() : null,
    ageMinutes: ageMs === null ? null : Math.round(ageMs / 60000),
    refreshIntervalMinutes: REFRESH_MINUTES,
    liveFields: ["airTemperature", "waterTemperature", "windSpeed", "uvIndex", "weatherCondition"],
    demoFields: ["ripCurrentRisk", "redTideStatus"],
    error: lastError,
  };
}

/**
 * Live conditions for one beach, or null if the pipeline has never succeeded.
 * The returned object may still contain nulls for individual fields; those are
 * accompanied by `issues` describing exactly what the upstream API withheld.
 */
function getConditions(beachId) {
  if (!snapshot) return null;
  return snapshot.get(beachId) || null;
}

module.exports = {
  start,
  stop,
  refresh,
  ensureReady,
  getStatus,
  getConditions,
  weatherCodeToCondition,
};
