/**
 * Generic API fetch utilities
 */

/**
 * Generic function to fetch data from an API endpoint with timeout support
 * @param url 
 * @param timeoutMs
 * @returns Promise resolving to array of items
 */
export async function fetchApiData<T>(
  url: string,
  timeoutMs = 10000
): Promise<T[]> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { signal: controller.signal });

    clearTimeout(id);

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(
        `Failed to fetch: ${res.status} ${res.statusText} ${text}`
      );
    }

    const data = await res.json() as T[] | { value?: T[]; data?: T[] };
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
      "Invalid response shape: expected an array or { value: T[] } or { data: T[] }"
    );
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Request timed out after ${timeoutMs}ms`);
    }
    throw err;
  }
}

