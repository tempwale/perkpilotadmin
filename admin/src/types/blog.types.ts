// Blog API Response Types (from backend models)
export interface BlogApiResponse {
  _id?: string;
  id?: string;
  blogHeading?: string;
  blogBody?: string;
  blogHeroImage?: string;
  blogCategory?: string;
  blogReadingTime?: string;
  blogSlug?: string;
  blogIsPublished?: boolean;
  blogViewCount?: number;
  blogIsFeatured?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

// UI-facing blog shape for components
export type UIBlog = {
  _id?: string;
  id?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  featured?: boolean;
  views?: number | string;
  tags?: string[];
  readTime?: string;
  date?: string;
  category?: string;
  isSelected?: boolean;
  // API response fields (for backward compatibility)
  blogHeading?: string;
  blogBody?: string;
  blogHeroImage?: string;
  blogCategory?: string;
  blogReadingTime?: string;
  blogSlug?: string;
  blogIsPublished?: boolean;
  blogViewCount?: number;
  blogIsFeatured?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

// Blog item type for SimilarBlogs component
export type BlogItem = {
  blogId?: string;
  _id?: string;
  title?: string;
  blogHeading?: string;
  description?: string;
  blogBody?: string;
  image?: string;
  blogHeroImage?: string;
  category?: string;
  blogCategory?: string;
  tags?: string[];
  featured?: boolean;
  blogIsPublished?: boolean;
  published?: boolean;
  readingTime?: string;
  blogReadingTime?: string;
  viewCount?: number;
  blogViewCount?: number;
  date?: string;
  createdAt?: string | Date;
};

// Blog data type for AddBlogPage
export interface BlogData {
  blogHeading: string;
  blogBody: string;
  blogHeroImage: string;
  sectionHeadline: string;
  tipBulbText: string;
  blogToolsMentioned: Array<{
    toolName: string;
    toolLogo: string;
    toolCategory: string;
    isVerified: boolean;
  }>;
  blogAuthor: string;
  blogCategory: string;
  blogReadingTime: string;
  modules?: Array<{
    title: string;
    benefits: string[];
  }>;
  blogToolBlogCards?: Array<{
    sectionNumber: number;
    blogTitle: string;
    blogBody: string;
    blogImage?: string;
    dealsMentioned?: Array<{
      _id?: string;
      id?: string;
      title?: string;
      category?: string;
      logoUri?: string;
      tag?: string;
      verified?: boolean;
    }>;
    additionalNote?: string;
  }>;
  moreBlogsSectionTitle?: string;
  moreBlogs?: Array<{
    blogId?: string;
    title?: string;
    description?: string;
    image?: string;
    category?: string;
    tags?: string[];
    featured?: boolean;
    readingTime?: string;
    viewCount?: number;
    date?: string;
  }>;
  blogSlug: string;
  blogIsPublished: boolean;
}

// Component Props Types
export interface BlogsCardProps {
  id?: string;
  imageUrl?: string;
  featured?: boolean;
  views?: number | string;
  title?: string;
  description?: string;
  tags?: string[];
  readTime?: string;
  date?: string;
  onClick?: () => void;
  variant?: "default" | "compact";
}

export interface BlogsGridProps {
  blogs?: UIBlog[];
  onViewDetails?: (blogId: string | number) => void;
  itemsPerPage?: number;
  showPagination?: boolean;
  sortBy?: SortOption;
}

export interface SimilarBlogsProps {
  sectionTitle?: string;
  selectedBlogs?: BlogItem[];
  onSectionTitleChange?: (title: string) => void;
  onBlogsChange?: (blogs: BlogItem[]) => void;
  onDeleteSection?: () => void;
}

// Blog popup and delete types
export interface BlogForDelete {
  _id?: string;
  id?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  featured?: boolean;
  views?: number | string;
  tags?: string[];
  readTime?: string;
  date?: string;
}

export interface BlogForPopup {
  _id?: string;
  id?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  featured?: boolean;
  views?: number | string;
  tags?: string[];
  readTime?: string;
  date?: string;
  editPath?: string;
  deleteTitle?: string;
  deleteSubtitle?: string;
}

export interface BlogDeleteConfirmPopupProps {
  onClose?: () => void;
  onConfirm?: () => void;
  blog?: BlogForDelete;
}

export interface BlogEditDeletePopupProps {
  onClose?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

// Blog header types
export type SortOption =
  | "newly-published"
  | "oldest"
  | "views-high"
  | "views-low"
  | "name-az";

export interface SortOptionItem {
  value: SortOption;
  label: string;
}

export interface BlogsHeaderProps {
  onSortChange?: (value: SortOption) => void;
  onAddBlog?: () => void;
}

