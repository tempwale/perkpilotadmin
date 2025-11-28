import { HOMEPAGE_API } from "../config/backend";

interface StatItem {
  value: string;
  label: string;
}

interface StatsSection {
  items: StatItem[];
}

interface HomePageData {
  stats?: StatsSection;
}

interface ApiStatItem {
  numberValue: string;
  message: string;
  _id?: string;
}

interface ApiHomePageResponse {
  stats?: ApiStatItem[];
  [key: string]: unknown;
}

export async function fetchHomePage(): Promise<HomePageData> {
  try {
    const response = await fetch(HOMEPAGE_API);

    if (!response.ok) {
      if (response.status === 404) {
        return { stats: { items: [] } };
      }
      throw new Error(`Failed to fetch homepage: ${response.status}`);
    }

    const data = (await response.json()) as ApiHomePageResponse;

    // Map backend structure to frontend structure
    // Backend uses: stats: [{ numberValue: string, message: string }]
    // Frontend expects: stats: { items: [{ value: string, label: string }] }

    if (data.stats && Array.isArray(data.stats)) {
      return {
        stats: {
          items: data.stats.map((stat: ApiStatItem) => ({
            value: stat.numberValue,
            label: stat.message,
          })),
        },
      };
    }

    return { stats: { items: [] } };
  } catch {
    return { stats: { items: [] } };
  }
}
