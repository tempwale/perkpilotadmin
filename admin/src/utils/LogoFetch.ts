const LOGO_DEV_TOKEN = import.meta.env.VITE_LOGO_DEV_TOKEN;

/**
 * Fetch brand logo URL using logo.dev
 * @param domain - The company domain (e.g., "google.com")
 * @returns Logo URL that can be used directly in img src
 */
export async function fetchLogoByDomain(
  domain: string
): Promise<string | null> {
  if (!LOGO_DEV_TOKEN) {
    console.error(
      "VITE_LOGO_DEV_TOKEN environment variable is not set. Please add it to your .env file."
    );
    return null;
  }

  try {
    // Clean the domain (remove protocol, www, trailing slashes)
    const cleanDomain = domain
      .replace(/^(https?:\/\/)?(www\.)?/, "")
      .replace(/\/$/, "")
      .trim();

    if (!cleanDomain) {
      console.error("Invalid domain provided");
      return null;
    }

    // logo.dev URL - returns image directly
    // Format: https://img.logo.dev/{domain}?token={token}
    const logoUrl = `https://img.logo.dev/${encodeURIComponent(
      cleanDomain
    )}?token=${LOGO_DEV_TOKEN}`;

    console.log("Generated logo URL:", logoUrl);

    // Return the URL directly - logo.dev handles the image serving
    return logoUrl;
  } catch (error) {
    console.error(`Failed to generate logo URL for domain ${domain}:`, error);
    return null;
  }
}
