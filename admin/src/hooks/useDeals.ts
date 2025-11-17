import { DEALS_API } from "../config/backend";
import type { DealApiResponse } from "../types/api.types";
import { fetchApiData } from "../utils/api";

const DEFAULT_URL = DEALS_API;
const DEFAULT_TIMEOUT = 10000; // 10s

export async function fetchDeals(
  url: string = DEFAULT_URL,
  timeoutMs = DEFAULT_TIMEOUT
): Promise<DealApiResponse[]> {
  try {
    return await fetchApiData<DealApiResponse>(url, timeoutMs);
  } catch (err) {
    if (err instanceof Error && err.message.includes("Failed to fetch")) {
      throw new Error(err.message.replace("Failed to fetch", "Failed to fetch deals"));
    }
    throw err;
  }
}

export default fetchDeals;
