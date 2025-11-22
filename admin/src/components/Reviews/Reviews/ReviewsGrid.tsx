import { useState, useEffect, type ReactElement } from "react";
import ReviewsCard from "./ReviewsCard";
import Pagination from "./Pagination";
import type { ReviewApiResponse } from "../../../types/api.types";
import { REVIEWS_API } from "../../../config/backend";

interface ReviewsGridProps {
  reviews?: ReviewApiResponse[];
  onViewDetails?: (reviewId: string | number) => void;
  itemsPerPage?: number;
  showPagination?: boolean;
}

export default function ReviewsGrid({
  reviews,
  onViewDetails,
  itemsPerPage = 6,
  showPagination = true,
}: ReviewsGridProps): ReactElement {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [apiReviews, setApiReviews] = useState<ReviewApiResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Reset to page 1 when switching between mobile/desktop
  useEffect((): void => {
    setCurrentPage(1);
  }, [isMobile]);

  // Fetch reviews from API on mount (if no `reviews` prop provided)
  useEffect(() => {
    if (reviews && reviews.length) return; // caller provided reviews

    let mounted = true;
    async function load(): Promise<void> {
      setLoading(true);
      setFetchError(null);
      try {
        const response = await fetch(REVIEWS_API);
        if (!response.ok) {
          throw new Error(`Failed to fetch reviews: ${response.status}`);
        }
        const data = await response.json() as ReviewApiResponse[] | { data: ReviewApiResponse[] };
        if (!mounted) return;
        const fetchedReviews = Array.isArray(data) ? data : (data.data ?? []);
        // Filter out review page settings document
        const actualReviews = fetchedReviews.filter((r) => !r.isReviewPageSettings);
        setApiReviews(actualReviews);
      } catch (e) {
        console.error("fetchReviews error", e);
        if (mounted) {
          const errorMessage = e instanceof Error ? e.message : String(e);
          setFetchError(errorMessage);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load().catch((error) => {
      console.error("Failed to load reviews:", error);
      if (mounted) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        setFetchError(errorMessage);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [reviews]);

  // Decide which data source to use: prop -> API -> empty array
  const sourceReviews = reviews && reviews.length > 0 ? reviews : apiReviews;

  // Calculate items per page based on screen size
  const effectiveItemsPerPage = isMobile ? 3 : itemsPerPage;

  // Filter by single global search query (productName, productType, description, pros, cons)
  const normalizedQuery = query.trim().toLowerCase();
  const filteredReviews = normalizedQuery
    ? sourceReviews.filter((r): boolean => {
        const productName = (r.productName || "").toLowerCase();
        const productType = (r.productType || "").toLowerCase();
        const description = (r.description || r.overview || "").toLowerCase();
        const pros = Array.isArray(r.pros) ? r.pros.join(" ").toLowerCase() : "";
        const cons = Array.isArray(r.cons) ? r.cons.join(" ").toLowerCase() : "";
        return (
          productName.includes(normalizedQuery) ||
          productType.includes(normalizedQuery) ||
          description.includes(normalizedQuery) ||
          pros.includes(normalizedQuery) ||
          cons.includes(normalizedQuery)
        );
      })
    : sourceReviews;

  // Calculate pagination based on filtered results
  const totalPages =
    Math.ceil(filteredReviews.length / effectiveItemsPerPage) || 1;
  const startIndex = (currentPage - 1) * effectiveItemsPerPage;
  const endIndex = startIndex + effectiveItemsPerPage;
  const displayReviews = showPagination
    ? filteredReviews.slice(startIndex, endIndex)
    : filteredReviews;

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
    // Scroll to top of grid when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewDetails = (reviewId: string | number): void => {
    if (onViewDetails) {
      onViewDetails(reviewId);
    } else {
      console.log(`View details for review ${reviewId}`);
    }
  };

  // Delete handler: only works when using internal apiReviews state (not when `reviews` prop is provided)
  const handleDelete = (reviewId: string | number, sourceIndex: number): void => {
    if (reviews && reviews.length) {
      console.warn("Cannot delete reviews passed in via props");
      return;
    }

    setApiReviews((prev) => {
      // prefer removing by index when available
      if (
        sourceIndex != null &&
        sourceIndex >= 0 &&
        sourceIndex < prev.length
      ) {
        const copy = [...prev];
        copy.splice(sourceIndex, 1);
        return copy;
      }

      // fallback: remove by matching id fields
      return prev.filter((r): boolean => {
        const rId = r._id ?? r.id;
        return !(String(rId) === String(reviewId));
      });
    });

    // adjust current page if needed
    setCurrentPage((p) => {
      const newTotal = Math.max(
        1,
        Math.ceil((filteredReviews.length - 1) / effectiveItemsPerPage)
      );
      return Math.min(p, newTotal);
    });
  };

  return (
    <div className="w-full">
      {/* Grid Container with animation */}

      {loading && (
        <div className="col-span-full text-center py-6">Loading reviews...</div>
      )}

      {fetchError && (
        <div className="col-span-full text-center text-red-500 py-6">
          {fetchError}
        </div>
      )}

      {!loading && !fetchError && displayReviews.length === 0 && (
        <div className="col-span-full text-center py-6 text-gray-500">
          No reviews available at the moment.
        </div>
      )}

      {/* Single Search bar for the grid */}
      <div className="mb-4">
        <div className="self-stretch relative bg-zinc-800 rounded-xl px-3 py-2">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
              >
                <path
                  d="M10.5404 19.2499C15.3498 19.2499 19.2487 15.3511 19.2487 10.5416C19.2487 5.73211 15.3498 1.83325 10.5404 1.83325C5.73088 1.83325 1.83203 5.73211 1.83203 10.5416C1.83203 15.3511 5.73088 19.2499 10.5404 19.2499Z"
                  stroke="#727A8F"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.1654 20.1666L18.332 18.3333"
                  stroke="#727A8F"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <input
              value={query}
              onChange={(e): void => setQuery(e.target.value)}
              placeholder="Search reviews"
              className="bg-transparent outline-none text-neutral-50 placeholder:text-zinc-500 w-full"
              aria-label="Search reviews"
            />
          </div>
        </div>
      </div>

      {/* Responsive grid: 1 col mobile, 2 cols sm, 3 cols md+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {displayReviews.map((review, idx): ReactElement=> {
          // Determine the index in the full source array (used for delete by index)
          const sourceIndex = sourceReviews.indexOf(review);
          // Normalize API shape (supports different property names)
          const idKey =
            review.id ??
            review._id ??
            `review-${sourceIndex >= 0 ? sourceIndex : idx}`;

          return (
            <div key={String(idKey)}>
              <ReviewsCard
                id={String(idKey)}
                review={review}
                onViewDetails={(): void => handleViewDetails(idKey)}
                onDelete={(): void => handleDelete(idKey, sourceIndex)}
                showCustomizeHeader={true}
              />
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
