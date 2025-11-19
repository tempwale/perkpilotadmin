export interface DealPageData {
  status?: "live" | "maintenance";
  topTagline?: string;
  heading: string;
  subheading?: string;
  deals: string[];
}

export interface DealPageApiResponse {
  _id?: string;
  status?: "live" | "maintenance";
  topTagline?: string;
  heading: string;
  subheading?: string;
  deals?: Array<{
    _id?: string;
    id?: string;
  } | string>;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiErrorResponse {
  message?: string;
}

