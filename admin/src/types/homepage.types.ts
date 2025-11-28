// Homepage TypeScript Types

export interface HeroSection {
  topTagline: string;
  mainHeadline: string;
  subHeadline: string;
  ctaText?: string;
  ctaLink?: string;
  heroImage?: string;
}

export interface DiscountedIconsSection {
  topTagline: string;
  mainHeadline: string;
  subHeadline: string;
  ctaText?: string;
  ctaLink?: string;
  icons: Array<{
    url: string;
    alt?: string;
  }>;
}

export interface StatItem {
  numberValue: string;
  message: string;
}

export interface TopPicksSection {
  sectionTitle: string;
  body: string;
  deals: string[]; // Array of deal IDs
}

export interface SoftwareComparisonsSection {
  sectionTitle: string;
  comparisons: string[]; // Array of comparison IDs
}

export interface TopReviewsSection {
  sectionTitle: string;
  body: string;
  reviews: string[]; // Array of review IDs
}

// Populated versions (what the API returns)
export interface PopulatedDeal {
  _id: string;
  title: string;
  category: string;
  description: string;
  discount: string;
  logoUri?: string;
}

export interface PopulatedComparison {
  _id: string;
  heroHeading: string;
  heroBody: string;
  blogCategory: string;
}

export interface PopulatedReview {
  _id: string;
  productName: string;
  productType?: string;
  avatarUrl?: string;
}

export interface HomePageData {
  _id?: string;
  status: "live" | "maintenance";
  hero: HeroSection;
  discountedIcons: DiscountedIconsSection;
  stats: StatItem[];
  topPicks: TopPicksSection;
  softwareComparisons: SoftwareComparisonsSection;
  topReviews: TopReviewsSection;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface HomePageApiResponse extends HomePageData {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiErrorResponse {
  message: string;
  error?: unknown;
}
