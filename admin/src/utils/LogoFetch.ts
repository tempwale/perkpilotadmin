const BRANDFETCH_CLIENT_ID = import.meta.env.VITE_BRANDFETCH_CLIENT_ID;

/**
 * Fetch brand logo URL using Brandfetch CDN
 * @param identifier - The company identifier (domain or company name)
 * @returns Logo URL that can be used directly in img src
 */
export async function fetchLogoByDomain(
  domain: string
): Promise<string | null> {
  if (!BRANDFETCH_CLIENT_ID) {
    throw new Error(
      "VITE_BRANDFETCH_CLIENT_ID environment variable is not set"
    );
  }

  try {
    // Clean the domain (remove protocol, www, trailing slashes)
    const cleanDomain = domain
      .replace(/^(https?:\/\/)?(www\.)?/, '')
      .replace(/\/$/, '')
      .trim();

    if (!cleanDomain) {
      throw new Error('Invalid domain');
    }

    // Brandfetch CDN URL - returns image directly
    // Format: https://cdn.brandfetch.io/{domain}/icon?c={client-id}
    const logoUrl = `https://cdn.brandfetch.io/${encodeURIComponent(
      cleanDomain
    )}/icon?c=${BRANDFETCH_CLIENT_ID}`;

    console.log("Generated logo URL:", logoUrl);

    // Verify the logo exists by checking response status
    const response = await fetch(logoUrl, { method: 'HEAD' });

    if (!response.ok) {
      console.warn(
        `Logo not found for ${cleanDomain}: ${response.status} ${response.statusText}`
      );
      return null;
    }

    // Return the URL directly - it's an image, not JSON
    return logoUrl;
  } catch (error) {
    console.error(`Failed to fetch logo for domain ${domain}:`, error);
    return null;
  }
}
