import { type ReactElement } from "react";
import ItemSelector from "./ItemSelector";
import { REVIEWS_API } from "../../config/backend";

interface Review {
  _id: string;
  productName: string;
  productType?: string;
  avatarUrl?: string;
  description?: string;
  overview?: string;
  rating?: number;
  averageRating?: number;
  totalReviews?: number;
  verified?: boolean;
  [key: string]: unknown;
}

interface ReviewsSelectorProps {
  selectedReviews: string[];
  onSelectionChange: (reviewIds: string[]) => void;
  maxSelections?: number;
  onClose?: () => void;
}

export default function ReviewsSelector({
  selectedReviews,
  onSelectionChange,
  maxSelections,
  onClose,
}: ReviewsSelectorProps): ReactElement {
  const renderReview = (review: Review) => (
    <div className="flex items-start gap-3">
      {review.avatarUrl && (
        <img
          src={review.avatarUrl}
          alt={review.productName}
          className="w-12 h-12 rounded-lg object-cover"
        />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-neutral-50 text-sm font-medium truncate">
            {review.productName}
          </h3>
          {review.verified && (
            <span className="shrink-0 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded">
              Verified
            </span>
          )}
        </div>
        {(review.description || review.overview) && (
          <p className="text-zinc-400 text-xs mb-2 line-clamp-2">
            {review.description || review.overview}
          </p>
        )}
        <div className="flex items-center gap-3 text-xs">
          {review.productType && (
            <>
              <span className="text-zinc-400">{review.productType}</span>
              <span className="text-zinc-500">•</span>
            </>
          )}
          {review.averageRating && (
            <>
              <span className="text-yellow-400">
                ★ {review.averageRating.toFixed(1)}
              </span>
            </>
          )}
          {review.rating && !review.averageRating && (
            <>
              <span className="text-yellow-400">
                ★ {review.rating.toFixed(1)}
              </span>
            </>
          )}
          {review.totalReviews && review.totalReviews > 0 && (
            <>
              <span className="text-zinc-500">•</span>
              <span className="text-zinc-400">{review.totalReviews} reviews</span>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <ItemSelector<Review>
      title="Select Reviews for Top SaaS Reviews Section"
      apiEndpoint={REVIEWS_API}
      selectedItems={selectedReviews}
      onSelectionChange={onSelectionChange}
      renderItem={renderReview}
      searchPlaceholder="Search reviews by product name or type..."
      maxSelections={maxSelections}
      onClose={onClose}
    />
  );
}
