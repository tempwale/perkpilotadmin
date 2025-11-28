import { type ReactElement } from "react";
import React, { useState, useEffect } from "react";
import ReviewsCard from "../Reviews/Reviews/ReviewsCard";
import { REVIEWS_API } from "../../config/backend";
import type { ReviewApiResponse } from "../../types/api.types";

interface Review extends ReviewApiResponse {
  _id: string;
}

interface ReviewsGridProps {
  selectedReviews: string[];
}

const ReviewsGrid: React.FC<ReviewsGridProps> = ({ selectedReviews }) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (selectedReviews.length === 0) {
      setReviews([]);
      return;
    }

    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await fetch(REVIEWS_API);
        if (!response.ok) throw new Error("Failed to fetch reviews");
        const json = await response.json() as Review[] | { data: Review[] };
        const allReviews: Review[] = Array.isArray(json)
          ? json
          : (json.data && Array.isArray(json.data) ? json.data : []);

        const selectedReviewsData = selectedReviews
          .map(id => allReviews.find(review => review._id === id))
          .filter((review): review is Review => review !== undefined);

        setReviews(selectedReviewsData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchReviews();
  }, [selectedReviews]);

  if (loading) {
    return (
      <div className="w-full py-8 flex justify-center items-center">
        <div className="text-neutral-50">Loading reviews...</div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="w-full p-6 bg-zinc-800/50 rounded-lg border border-dashed border-zinc-700 text-center">
        <p className="text-zinc-400 text-sm">No reviews selected. Click "Manage Reviews" to add some.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto overflow-hidden px-4 md:px-0"> 
      <style>{`.reviews-scroll::-webkit-scrollbar{display:none}.reviews-scroll{scrollbar-width:none;-ms-overflow-style:none}`}</style>
      <div
        className="px-4 overflow-x-auto reviews-scroll py-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        aria-label="Top reviews carousel"
      >
        <div className="flex gap-4 items-stretch snap-x snap-mandatory">
          {reviews
            .slice(0, isDesktop ? reviews.length : 3)
            .map((review): ReactElement => (
              <div
                key={review._id}
                className="min-w-[340px] snap-start shrink-0"
              >
                <ReviewsCard
                  id={review._id}
                  review={review}
                  showCustomizeHeader={false}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsGrid;
