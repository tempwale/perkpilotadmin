/**
 * Common utility functions used across the admin panel
 */

/**
 * Formats a date to DD/MM/YYYY format (en-GB locale)
 * @param date 
 * @returns 
 */
export function formatDate(date?: string | Date): string {
  if (!date) return "";
  try {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

/**
 * Formats a date to YYYY-MM-DD format (ISO date string without time)
 * @param date 
 * @returns 
 */
export function formatDateISO(date?: string | Date): string {
  const d = date ? (typeof date === "string" ? new Date(date) : date) : new Date();
  return d.toISOString().split("T")[0] ?? "";
}

/**
 * Safely parses JSON response from fetch, returning empty object on error
 * @param response 
 * @returns
 */
export async function safeJsonParse<T = { message?: string }>(
  response: Response
): Promise<T> {
  try {
    return (await response.json()) as T;
  } catch {
    return {} as T;
  }
}

/**
 * Extracts error message from API response
 * @param response
 * @param defaultMessage 
 * @returns
 */
export async function getErrorMessage(
  response: Response,
  defaultMessage = "An error occurred"
): Promise<string> {
  const body = await safeJsonParse<{ message?: string }>(response);
  return body.message || defaultMessage;
}

