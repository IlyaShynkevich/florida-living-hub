// In dev, VITE_API_BASE_URL is unset and requests stay relative (/api/...),
// resolved by the Vite dev proxy in vite.config.js. In production, set
// VITE_API_BASE_URL to the deployed backend's origin (e.g. https://api.example.com)
// when the frontend and backend are hosted as separate services.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export function apiUrl(path) {
  return `${API_BASE_URL}${path}`
}
