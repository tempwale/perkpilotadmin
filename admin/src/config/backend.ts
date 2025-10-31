// Centralized backend URL configuration.
// Uses Vite env var VITE_BACKEND_URL when available, otherwise falls back to localhost.
const rawEnv = (import.meta as any)?.env || {};

// Ensure the backend URL is absolute. If VITE_BACKEND_URL is provided without a
// scheme (for example `perkpilot-production-58f9.up.railway.app`), browsers
// will treat the resulting fetch URL as relative and append it to the current
// origin (e.g. `https://perkpilotadmin.up.railway.app/perkpilot-production-...`).
// To avoid that, normalize the URL here by prepending `https://` when a
// scheme is missing and strip trailing slashes.
function normalizeBackendUrl(url?: string): string {
  const fallback = "http://localhost:5000";
  if (!url) return fallback;
  const trimmed = String(url).trim().replace(/\/+$/g, "");
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  // No scheme provided — assume https for production.
  return `https://${trimmed}`;
}

export const BACKEND_URL: string = normalizeBackendUrl(rawEnv.VITE_BACKEND_URL);
export const DEALS_API = `${BACKEND_URL}/api/deals`;

export default BACKEND_URL;
