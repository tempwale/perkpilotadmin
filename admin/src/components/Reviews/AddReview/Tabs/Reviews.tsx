
import {useState, type ReactElement} from "react";
import { GripVertical, Trash2, Plus, Star, Camera } from "lucide-react";

interface Review {
  id: number;
  profileImage: string | null;
  reviewerName: string;
  companyPosition: string;
  rating: number;
  reviewText: string;
  helpful?: number;
  notHelpful?: number;
}

interface ReviewsProps {
  initialReviews?: Review[];
  onReviewsChange?: (reviews: Review[]) => void;
}

export default function Reviews({
  initialReviews,
  onReviewsChange,
}: ReviewsProps): ReactElement{
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [reviews, setReviews] = useState<Review[]>(
    initialReviews || [
      {
        id: 1,
        profileImage: null,
        reviewerName: "",
        companyPosition: "",
        rating: 0,
        reviewText: "",
      },
      {
        id: 2,
        profileImage: null,
        reviewerName: "",
        companyPosition: "",
        rating: 0,
        reviewText: "",
      },
    ]
  );

  const updateReviews = (newReviews: Review[]): void => {
    setReviews(newReviews);
    onReviewsChange?.(newReviews);
  };

  const handleImageUpload = (
    id: number,
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = (): void => {
        const updatedReviews = reviews.map((review) =>
          review.id === id
            ? { ...review, profileImage: reader.result as string }
            : review
        );
        updateReviews(updatedReviews);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReviewerNameChange = (id: number, value: string): void => {
    const updatedReviews = reviews.map((review) =>
      review.id === id ? { ...review, reviewerName: value } : review
    );
    updateReviews(updatedReviews);
  };

  const handleCompanyPositionChange = (id: number, value: string): void => {
    const updatedReviews = reviews.map((review) =>
      review.id === id ? { ...review, companyPosition: value } : review
    );
    updateReviews(updatedReviews);
  };

  const handleRatingChange = (id: number, rating: number): void => {
    const updatedReviews = reviews.map((review) =>
      review.id === id ? { ...review, rating } : review
    );
    updateReviews(updatedReviews);
  };

  const handleReviewTextChange = (id: number, value: string): void => {
    const updatedReviews = reviews.map((review) =>
      review.id === id ? { ...review, reviewText: value } : review
    );
    updateReviews(updatedReviews);
  };

  const deleteReview = (id: number): void => {
    const updatedReviews = reviews.filter((review): boolean => review.id !== id);
    updateReviews(updatedReviews);
  };

  const addReview = (): void => {
    const newId = Math.max(...reviews.map((r) => r.id), 0) + 1;
    const updatedReviews = [
      ...reviews,
      {
        id: newId,
        profileImage: null,
        reviewerName: "",
        companyPosition: "",
        rating: 0,
        reviewText: "",
      },
    ];
    updateReviews(updatedReviews);
  };

  const handleToggle = (): void => {
    setIsEnabled(!isEnabled);
  };

  return (
    <div className="w-full max-w-[1068px] py-4 bg-zinc-800 rounded-3xl outline-1 -outline-offset-1 outline-zinc-700 flex flex-col gap-4">
      {/* Header */}
      <div
        data-layer="Row"
        className="Row self-stretch h-14 inline-flex justify-start items-center"
      >
        <div
          data-layer="Column"
          className="Column flex-1 self-stretch px-6 py-3 border-b border-zinc-700 flex justify-start items-center gap-3"
        >
          <div
            data-layer="Frame 2147205991"
            className="Frame2147205991 flex justify-start items-center cursor-grab"
          >
            <GripVertical className="w-6 h-6 text-neutral-50" />
          </div>
          <div
            data-layer="Text"
            className="Text justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
          >
            Reviews
          </div>
        </div>
        <div
          data-layer="Column"
          className="Column self-stretch px-6 py-3 border-b border-zinc-700 flex justify-start items-center gap-4"
        >
          <button
            onClick={handleToggle}
            className="Button w-[53.33px] h-7 relative bg-linear-to-b from-[#501bd6] to-[#7f57e2] rounded-[66.67px] outline-1 -outline-offset-1 outline-[#501bd6] overflow-hidden transition-all"
            aria-label={isEnabled ? "Disable reviews" : "Enable reviews"}
          >
            <div
              className={`Button w-[23.33px] h-[22.67px] absolute bg-white rounded-[66.67px] top-[2.67px] transition-all ${
                isEnabled ? "left-[26.67px]" : "left-[2.67px]"
              }`}
            />
          </button>
          <button
            onClick={(): void => {}}
            className="hover:opacity-70 transition-opacity"
            aria-label="Delete section"
          >
            <Trash2 className="w-6 h-6 text-neutral-50" />
          </button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="px-4 flex flex-col gap-6">
        {reviews.map((review, index) => {
          // Convert index to number name (One, Two, Three, etc.)
          const numberNames = [
            "One",
            "Two",
            "Three",
            "Four",
            "Five",
            "Six",
            "Seven",
            "Eight",
            "Nine",
            "Ten",
          ];
          const reviewNumber = numberNames[index] || `${index + 1}`;

          return (
            <div
              key={review.id}
              className="w-full py-6 px-6 bg-zinc-800 rounded-2xl outline-1 outline-zinc-700 flex gap-6"
            >
              {/* Drag Handle and Label */}
              <div className="flex flex-col items-center gap-3">
                <div className="cursor-grab">
                  <GripVertical className="w-6 h-6 text-neutral-50" />
                </div>
                <div className="text-neutral-50 text-sm font-medium font-['Poppins'] whitespace-nowrap">
                  Review {reviewNumber}
                </div>
              </div>

            {/* Profile Image Upload */}
            <div className="flex flex-col items-center gap-2">
              <label className="text-neutral-50 text-sm font-medium font-['Poppins']">
                Profile Avatar
              </label>
              <label
                htmlFor={`profile-image-${review.id}`}
                className="w-24 h-24 bg-zinc-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-zinc-700 transition-colors relative overflow-hidden"
              >
                {review.profileImage ? (
                  <img
                    src={review.profileImage}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="w-8 h-8 text-zinc-400" />
                )}
                <input
                  id={`profile-image-${review.id}`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(review.id, e)}
                  className="hidden"
                  aria-label="Upload profile image"
                />
              </label>
              {/* Star Rating */}
              <div className="flex items-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={(): void => handleRatingChange(review.id, star)}
                    onMouseEnter={(e): void => {
                      const stars = e.currentTarget.parentElement?.children;
                      if (stars) {
                        Array.from(stars).forEach((s, idx) => {
                          if (idx < star) {
                            s.classList.add("opacity-80");
                          }
                        });
                      }
                    }}
                    onMouseLeave={(e): void => {
                      const stars = e.currentTarget.parentElement?.children;
                      if (stars) {
                        Array.from(stars).forEach((s) => {
                          s.classList.remove("opacity-80");
                        });
                      }
                    }}
                    className="hover:scale-110 transition-transform p-0.5"
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star
                      className={`w-6 h-6 transition-colors ${
                        star <= review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-none text-zinc-600 stroke-zinc-600"
                      }`}
                      strokeWidth={1.5}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Review Details */}
            <div className="flex-1 flex flex-col gap-4">
              {/* Reviewer Name and Company/Position */}
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-2">
                  <label
                    htmlFor={`reviewer-name-${review.id}`}
                    className="text-neutral-50 text-sm font-medium font-['Poppins']"
                  >
                    Reviewer Name
                  </label>
                  <input
                    id={`reviewer-name-${review.id}`}
                    type="text"
                    value={review.reviewerName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleReviewerNameChange(review.id, e.target.value)
                    }
                    placeholder="Name"
                    className="h-12 px-6 py-3 bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700 text-neutral-50 text-base font-normal font-['Poppins'] leading-6 placeholder:text-zinc-400 focus:outline-zinc-500"
                  />
                </div>

                <div className="flex-1 flex flex-col gap-2">
                  <label
                    htmlFor={`company-position-${review.id}`}
                    className="text-neutral-50 text-sm font-medium font-['Poppins']"
                  >
                    Company / Position
                  </label>
                  <input
                    id={`company-position-${review.id}`}
                    type="text"
                    value={review.companyPosition}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleCompanyPositionChange(review.id, e.target.value)
                    }
                    placeholder="Occupation"
                    className="h-12 px-6 py-3 bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700 text-neutral-50 text-base font-normal font-['Poppins'] leading-6 placeholder:text-zinc-400 focus:outline-zinc-500"
                  />
                </div>
              </div>

        

              {/* Review Text */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor={`review-text-${review.id}`}
                  className="text-neutral-50 text-sm font-medium font-['Poppins']"
                >
                  Review Text in Details
                </label>
                <textarea
                  id={`review-text-${review.id}`}
                  value={review.reviewText}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    handleReviewTextChange(review.id, e.target.value)
                  }
                  placeholder="Review in Detail..."
                  rows={3}
                  className="px-6 py-3 bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700 text-neutral-50 text-base font-normal font-['Poppins'] leading-6 placeholder:text-zinc-400 focus:outline-zinc-500 resize-none"
                />
              </div>
            </div>

            {/* Delete Button */}
            <button
              onClick={(): void => deleteReview(review.id)}
              className="self-start hover:opacity-70 transition-opacity"
              aria-label={`Delete review ${review.id}`}
            >
              <Trash2 className="w-6 h-6 text-neutral-50" />
            </button>
          </div>
          );
        })}
      </div>

      {/* Add More Button */}
      <div className="px-4 flex justify-end">
        <button
          onClick={addReview}
          className="inline-flex items-center gap-3 hover:opacity-70 transition-opacity"
          aria-label="Add more reviews"
        >
          <div className="text-neutral-50 text-sm font-medium font-['Poppins']">
            Add More
          </div>
          <Plus className="w-6 h-6 text-neutral-50" />
        </button>
      </div>
    </div>
  );
}
