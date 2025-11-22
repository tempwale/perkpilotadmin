import { useState, useEffect, useMemo, type ReactElement } from "react";
import { ChevronDown } from "lucide-react";
import { REVIEWS_API } from "../../../config/backend";  
import ReviewsCard from "../../../components/Reviews/Reviews/ReviewsCard";
import type { ReviewApiResponse } from "../../../types/api.types";

export interface ReviewSummary {
  _id: string;
  productName: string;
  productType?: string;
  aggregateRating?: number;
  ratingCount?: number;
  avatarUrl?: string;
}

interface FeaturedReviewsProps {
  reviews: ReviewSummary[];
  selectedReviewIds: string[];
  onSelectionChange?: (ids: string[]) => void;
}

export default function FeaturedReviews({
  reviews: _reviews,
  selectedReviewIds,
  onSelectionChange,
}: FeaturedReviewsProps): ReactElement {
  const [open, setOpen] = useState(true);
  const [allReviews, setAllReviews] = useState<ReviewApiResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  // Fetch all reviews
  useEffect(() => {
    const fetchAllReviews = async (): Promise<void> => {
      setLoading(true);
      try {
        const response = await fetch(`${REVIEWS_API}?limit=100`);
        if (!response.ok) {
          throw new Error(`Failed to fetch reviews: ${response.status}`);
        }

        const result = await response.json() as ReviewApiResponse[] | { data: ReviewApiResponse[] };
        const reviewsArray = Array.isArray(result) ? result : (result.data ?? []);
        
        // Filter out review page settings document
        const actualReviews = reviewsArray.filter(
          (review: ReviewApiResponse): boolean => !review.isReviewPageSettings
        );

        setAllReviews(actualReviews);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    void fetchAllReviews();
  }, []);

  // Filter reviews by search query
  const filteredReviews = useMemo(() => {
    if (!query.trim()) return allReviews;
    const searchQuery = query.trim().toLowerCase();
    return allReviews.filter((review) => {
      const productName = (review.productName || "").toLowerCase();
      const productType = (review.productType || "").toLowerCase();
      const description = (review.description || review.overview || "").toLowerCase();
      return (
        productName.includes(searchQuery) ||
        productType.includes(searchQuery) ||
        description.includes(searchQuery)
      );
    });
  }, [allReviews, query]);

  // Sort: selected reviews first, then by product name
  const sortedReviews = useMemo(() => {
    const selectedSet = new Set(selectedReviewIds);
    return [...filteredReviews].sort((a, b) => {
      const aId = a._id ?? a.id ?? "";
      const bId = b._id ?? b.id ?? "";
      const aSelected = selectedSet.has(aId);
      const bSelected = selectedSet.has(bId);

      // Selected reviews come first
      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;

      // Both selected or both not selected - sort by product name
      const aName = (a.productName || "").toLowerCase();
      const bName = (b.productName || "").toLowerCase();
      return aName.localeCompare(bName);
    });
  }, [filteredReviews, selectedReviewIds]);

  // Toggle review selection
  const toggleSelection = (reviewId: string): void => {
    if (!onSelectionChange) return;

    const selectedSet = new Set(selectedReviewIds);
    if (selectedSet.has(reviewId)) {
      selectedSet.delete(reviewId);
    } else {
      selectedSet.add(reviewId);
    }
    onSelectionChange(Array.from(selectedSet));
  };

  return (
    <div className="flex flex-col items-start p-4 gap-6 w-[1084px] bg-[#27272A] rounded-2xl">
      <div className="box-border flex flex-row justify-between items-center pb-4 gap-2 w-[1052px] h-12 border-b border-[#3F3F46]">
        <div className="w-[240px] h-8 font-['Poppins'] font-medium text-xl leading-8 text-[#FAFAFA] flex-none order-0 grow-0">
          Feature Reviews On Top
        </div>
        <button
          type="button"
          aria-expanded={open}
          onClick={(): void => setOpen((prev) => !prev)}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-zinc-700/20 focus:outline-none focus:ring-2 focus:ring-[#7f57e2] flex-none order-1 grow-0"
          aria-label={open ? "Collapse settings" : "Expand settings"}
        >
          <ChevronDown
            className={`w-6 h-6 text-[#FAFAFA] transition-transform duration-150 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>

      {open && (
        <>
          {/* Search bar */}
        <div className="w-full">
            <div className="self-stretch relative bg-zinc-800 rounded-xl outline-1 -outline-offset-1 outline-zinc-700 px-3 py-2">
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
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20.1654 20.1666L18.332 18.3333"
                      stroke="#727A8F"
                      strokeWidth="1.5"
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

          {/* Reviews Grid */}
          {loading ? (
            <div className="w-full text-center text-[#A1A1AA] text-sm py-6">
              Loading reviews...
            </div>
          ) : sortedReviews.length === 0 ? (
            <div className="w-full text-center text-[#A1A1AA] text-sm py-6">
              {query ? "No reviews found matching your search." : "No reviews available."}
            </div>
          ) : (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {sortedReviews.map((review): ReactElement => {
                const reviewId = review._id ?? review.id ?? "";
                const isSelected = selectedReviewIds.includes(reviewId);

                return (
                  <div key={reviewId} className="relative">
                    {/* Selection checkbox */}
                    <div className="absolute top-4 left-4 z-10">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(): void => toggleSelection(reviewId)}
                        className="w-5 h-5 rounded border-zinc-600 bg-zinc-800 text-[#7f57e2] focus:ring-2 focus:ring-[#7f57e2] cursor-pointer"
                        aria-label={`Select ${review.productName || "review"}`}
                      />
                    </div>

                    {/* Selected indicator badge */}
                    {isSelected && (
                      <div className="absolute top-4 right-4 z-10">
                        <div className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#7f57e2] text-white">
                          Featured
                        </div>
                      </div>
                    )}

                    <ReviewsCard
                      id={reviewId}
                      review={review}
                      showCustomizeHeader={false}
            />
                  </div>
                );
              })}
        </div>
          )}
        </>
      )}
    </div>
  );
}
