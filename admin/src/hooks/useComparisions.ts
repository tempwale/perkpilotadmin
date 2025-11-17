import { COMPARISIONS_API } from "../config/backend";
import type { ComparisonApiResponse } from "../types/api.types";
import { fetchApiData } from "../utils/api";

const DEFAULT_URL = COMPARISIONS_API;
const DEFAULT_TIMEOUT = 10000; // 10s

export async function fetchComparisions(
  url: string = DEFAULT_URL,
  timeoutMs = DEFAULT_TIMEOUT
): Promise<ComparisonApiResponse[]> {
  try {
    return await fetchApiData<ComparisonApiResponse>(url, timeoutMs);
  } catch (err) {
    if (err instanceof Error && err.message.includes("Failed to fetch")) {
      throw new Error(err.message.replace("Failed to fetch", "Failed to fetch comparisions"));
    }
    throw err;
  }
}

export default fetchComparisions;
