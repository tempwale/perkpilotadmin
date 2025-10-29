export interface Deal {
  _id?: string;
  title: string;
  description?: string;
  url?: string;
  price?: number | null;
  vendor?: string;
  tags?: string[];
  publishedAt?: string; // ISO date string
}

const DEFAULT_URL = "http://localhost:5000/api/deals";
const DEFAULT_TIMEOUT = 10000; // 10s

export async function fetchDeals(
  url: string = DEFAULT_URL,
  timeoutMs = DEFAULT_TIMEOUT
): Promise<Deal[]> {
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

    const data = await res.json();

    // Support two shapes:
    // 1) direct array: [{...}, {...}]
    // 2) wrapped: { value: [{...}, ...], Count: n }
    if (Array.isArray(data)) {
      return data as Deal[];
    }

    if (data && Array.isArray(data.value)) {
      return data.value as Deal[];
    }

    throw new Error(
      "Invalid response shape: expected an array of deals or { value: Deal[] }"
    );
  } catch (err: any) {
    if (err.name === "AbortError") {
      throw new Error(`Request timed out after ${timeoutMs}ms`);
    }
    throw err;
  }
}

export default fetchDeals;
