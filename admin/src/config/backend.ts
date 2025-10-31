// Centralized backend URL configuration.
// Uses Vite env var VITE_BACKEND_URL when available, otherwise falls back to localhost.
const rawEnv = (import.meta as any)?.env || {};
export const BACKEND_URL: string =
  rawEnv.VITE_BACKEND_URL || "http://localhost:5000";
export const DEALS_API = `${BACKEND_URL}/api/deals`;

export default BACKEND_URL;
