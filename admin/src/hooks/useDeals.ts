import { DEALS_API } from "../config/backend";
import type { DealApiResponse, ApiResponse } from "../types/api.types";

const DEFAULT_URL = DEALS_API;
const DEFAULT_TIMEOUT = 10000; // 10s

export async function fetchDeals(
  url: string = DEFAULT_URL,
  timeoutMs = DEFAULT_TIMEOUT
): Promise<DealApiResponse[]> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { signal: controller.signal });

    clearTimeout(id);

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(
        `Failed to fetch deals: ${res.status} ${res.statusText} ${text}`
      );
    }

    const data = await res.json() as DealApiResponse[] | ApiResponse<DealApiResponse>;

    // Support two shapes:
    // 1) direct array: [{...}, {...}]
    // 2) wrapped: { value: [{...}, ...], Count: n }
    if (Array.isArray(data)) {
      return data;
    }

    if (data && typeof data === 'object' && data !== null && 'value' in data && Array.isArray(data.value)) {
      return data.value;
    }

    if (data && typeof data === 'object' && data !== null && 'data' in data && Array.isArray(data.data)) {
      return data.data;
    }

    throw new Error(
      "Invalid response shape: expected an array of deals or { value: DealApiResponse[] }"
    );
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Request timed out after ${timeoutMs}ms`);
    }
    throw err;
  }
}

export default fetchDeals;
