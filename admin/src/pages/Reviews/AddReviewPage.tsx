import { useState, type ReactElement } from "react";
import type { ReviewApiResponse, UseCaseApiResponse } from "../../types/api.types";
import Hero from "../../components/Reviews/AddReview/Hero";
import Header from "../../components/Reviews/AddReview/Header";
import Tabs from "../../components/Reviews/AddReview/Tabs";
import RatingBreakdown from "../../components/Reviews/AddReview/RatingBreakdown";
import ProsCons from "../../components/Reviews/AddReview/ProsCons";
import BestUseCase from "../../components/Reviews/AddReview/BestUseCase";
import TagChips from "../../components/Reviews/AddReview/TagChips";
import FAQ from "../../components/Reviews/AddReview/FAQ";
import FooterActions from "../../components/Reviews/AddReview/FooterActions";
import { REVIEWS_API } from "../../config/backend";
import { formatDateISO } from "../../utils/helpers";

export default function AddReviewPage(): ReactElement {
  // Main review state matching backend schema
  const [reviewData, setReviewData] = useState<ReviewApiResponse>({
    // User/Author Info (with test data)
    userName: "John Smith",
    userTitle: "Senior Product Manager",
    userAvatar: "https://i.pravatar.cc/150?img=1",
    date: formatDateISO(),
    verified: true,
    reviewText:
      "Excellent product that has transformed our workflow. Highly recommend for teams of all sizes.",
    rating: 5,
    helpful: 0,
    notHelpful: 0,

    // Product Info (with test data)
    productName: "Slack",
    productType: "Communication Tool",
    avatarUrl: "https://example.com/slack-logo.png",
    description: "Team collaboration and communication platform",
    overview:
      "Slack is a cloud-based team collaboration platform that brings teams together through channels, direct messaging, and integrations with hundreds of tools.",

    // Arrays
    features: [] as Array<{ title: string; description: string }>,
    pricing: [] as Array<{ plan: string; amount: string; note: string }>,
    alternatives: [] as Array<{
      name: string;
      type: string;
      avatarUrl?: string;
      price: string;
      rating: number;
      reviewCount: number;
      compareNote: string;
    }>,

    // Product Stats
    userCount: "",
    foundedYear: 0,
    employeeRange: "",
    headquarters: "",
    lastUpdated: formatDateISO(),
    upvotes: 0,
    shareCount: 0,

    // Ratings
    aggregateRating: 0,
    ratingCount: 0,
    ratingCategories: [] as Array<{
      category: string;
      value: number;
      outOf: number;
    }>,

    // Pros/Cons
    pros: [] as string[],
    cons: [] as string[],

    // FAQs
    faqs: [] as Array<{ question: string; answer: string }>,

    // Use Cases
    useCases: [] as Array<{
      title: string;
      description: string;
      rating: number;
    }>,

    // Integrations
    integrations: [] as string[],
  });

  // Handler for child components to update state
  const updateReviewData = (updates: Partial<ReviewApiResponse>): void => {
    setReviewData((prev) => ({ ...prev, ...updates }));
  };

  // Submit handler
  const handleSaveAndPublish = async (): Promise<void> => {
    console.log("=== SAVING REVIEW ===");
    console.log("Review Data:", JSON.stringify(reviewData, null, 2));

    // Validate required fields
    if (!reviewData.productName || !reviewData.productName.trim()) {
      alert("Product Name is required");
      return;
    }

    if (!reviewData.reviewText || !reviewData.reviewText.trim()) {
      alert("Review Text is required");
      return;
    }

    if (!reviewData.rating || reviewData.rating === 0) {
      alert("Rating is required");
      return;
    }

    try {
      const response = await fetch(REVIEWS_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({})) as { message?: string };
        throw new Error(
          errorData.message || `Server error: ${response.status}`
        );
      }

      const result = await response.json() as ReviewApiResponse;
      console.log("Review created successfully:", result);
      alert("Review published successfully!");
      // Navigate to reviews list or show success message
      // navigate("/reviews");
    } catch (error: unknown) {
      console.error("Error saving review:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      alert(`Failed to save review: ${errorMessage}`);
    }
  };

  const handleSaveDraft = (): void => {
    console.log("Saving draft:", reviewData);
    alert("Draft saved locally (implement backend draft endpoint)");
  };

  return (
    <div
      data-layer="Frame 2147206029"
      className="Frame2147206029 w-[1116px] p-6 bg-zinc-900 rounded-3xl outline-1 outline-solid -outline-offset-1 outline-zinc-800 inline-flex flex-col justify-start items-start gap-6"
    >
      <Header />
      <Hero reviewData={reviewData} updateReviewData={updateReviewData} />
      <Tabs reviewData={reviewData} updateReviewData={updateReviewData} />
      <RatingBreakdown 
        initialCategories={reviewData.ratingCategories ? reviewData.ratingCategories.map((cat) => ({
          category: cat.category,
          value: cat.value,
          outOf: cat.outOf ?? 5, // Default to 5 if undefined
        })) : undefined}
        onCategoriesChange={(categories) => {
          updateReviewData({ ratingCategories: categories });
        }}
      />
      <ProsCons 
        initialPros={reviewData.pros}
        initialCons={reviewData.cons}
        onProsChange={(pros) => {
          updateReviewData({ pros });
        }}
        onConsChange={(cons) => {
          updateReviewData({ cons });
        }}
      />
      <BestUseCase
        initialUseCases={reviewData.useCases ? reviewData.useCases.map((uc: UseCaseApiResponse, idx: number) => ({
          id: idx + 1,
          title: uc.title,
          description: uc.description ?? "", // Default to empty string if undefined
          rating: uc.rating,
        })) : undefined}
        onUseCasesChange={(useCases) => {
          updateReviewData({
            useCases: useCases.map((uc) => ({
              title: uc.title,
              description: uc.description,
              rating: uc.rating || 0,
            })),
          });
        }}
      />
      <TagChips 
        tags={reviewData.integrations}
        onAdd={(tag) => {
          updateReviewData({
            integrations: [...(reviewData.integrations || []), tag]
          });
        }}
        onRemove={(tag) => {
          updateReviewData({
            integrations: reviewData.integrations?.filter(t => t !== tag) || []
          });
        }}
        placeholder="Search & Add Popular Integrations"
      />
      <FAQ 
        initialFaqs={reviewData.faqs ? reviewData.faqs.filter((faq) => 
          typeof faq.question === "string" && typeof faq.answer === "string"
        ).map((faq) => ({
          question: faq.question ?? "",
          answer: faq.answer ?? "",
        })) : undefined}
        onFaqsChange={(faqs) => {
          updateReviewData({ faqs });
        }}
      />
      <FooterActions
        onSaveDraft={handleSaveDraft}
        onSaveAndPublish={handleSaveAndPublish}
      />
    </div>
  );
}
