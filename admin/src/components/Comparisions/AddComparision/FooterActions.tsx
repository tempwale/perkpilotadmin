import { useState, type ReactElement } from "react";
import { COMPARISIONS_API } from "../../../config/backend";
import type { ComparisonApiResponse, ApiError } from "../../../types/api.types";
import type { ComparisonData } from "../../../types/comparison.types";

type Props = {
  comparisonData?: ComparisonData | (Partial<ComparisonApiResponse> & Record<string, string | number | boolean | unknown[] | undefined>);
  onSaveSuccess?: () => void;
  onSaveError?: (error: string) => void;
};

export default function FooterActions({
  comparisonData = {},
  onSaveSuccess,
  onSaveError,
}: Props): ReactElement {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSaveDraft = (): void => {
    console.log("Save as draft:", comparisonData);
    // TODO: Implement draft saving logic
  };

  const handleSaveAndPublish = async (): Promise<void> => {
    setError(null);
    setLoading(true);

    // Validate required fields
    const requiredFields = [
      { field: "heroHeading", label: "Hero Heading" },
      { field: "heroBody", label: "Hero Body" },
      { field: "sectionHeadline", label: "Section Headline" },
      { field: "tipBulbText", label: "Tip Bulb Text" },
      { field: "authorId", label: "Author" },
      { field: "blogCategory", label: "Blog Category" },
      { field: "readingTime", label: "Reading Time" },
      { field: "slug", label: "Slug" },
    ];

    const missingFields = requiredFields.filter(
      ({ field }) => {
        const value = (comparisonData as Record<string, unknown>)[field];
        return !value || (typeof value === 'string' && value.trim() === "");
      }
    );

    if (missingFields.length > 0) {
      const fieldNames = missingFields.map(({ label }): string => label).join(", ");
      const errorMsg = `Please fill in all required fields: ${fieldNames}`;
      setError(errorMsg);
      setLoading(false);
      onSaveError?.(errorMsg);
      return;
    }

    // Type cast for easier access
    const comparisonDataTyped = comparisonData as ComparisonData;
    
    // Validate prosConsCards
    const prosConsCards = Array.isArray(comparisonDataTyped.prosConsCards) ? comparisonDataTyped.prosConsCards : [];
    if (prosConsCards.length < 2) {
      const errorMsg = "At least 2 pros/cons cards are required";
      setError(errorMsg);
      setLoading(false);
      onSaveError?.(errorMsg);
      return;
    }

    // Validate toolBlogCards
    const toolBlogCards = Array.isArray(comparisonDataTyped.toolBlogCards) ? comparisonDataTyped.toolBlogCards : [];
    if (toolBlogCards.length === 0) {
      const errorMsg = "At least 1 tool blog card is required";
      setError(errorMsg);
      setLoading(false);
      onSaveError?.(errorMsg);
      return;
    }

    // Transform featuresComparison from FeaturesData to FeatureComparisonApiResponse format
    const transformedFeaturesComparison = comparisonDataTyped?.featuresComparison ? {
      sectionTitle: comparisonDataTyped.featuresComparison.sectionTitle,
      featuresHeadline: comparisonDataTyped.featuresComparison.featuresHeadline,
      tools: comparisonDataTyped.featuresComparison.tools,
      features: comparisonDataTyped.featuresComparison.features.map((f) => ({
        featureName: f.featureName,
        tool1Available: f.toolAvailability["0"] ?? false,
        tool2Available: f.toolAvailability["1"] ?? false,
        tool3Available: f.toolAvailability["2"] ?? false,
      })),
    } : undefined;

    // Prepare data - remove empty fields and add 'author' field (copy of authorId)
    const dataToSend = {
      ...comparisonData,
      featuresComparison: transformedFeaturesComparison,
      author: comparisonDataTyped.authorId, // Backend expects both authorId and author
    };

    console.log("=== SENDING TO BACKEND ===");
    console.log("Full comparison data:", JSON.stringify(dataToSend, null, 2));

    try {
      const response = await fetch(COMPARISIONS_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = (await response.json().catch((): Record<string, unknown> => ({}))) as ApiError | { message?: string };
        throw new Error(
          errorData.message || `Server error: ${response.status}`
        );
      }

      const result = await response.json() as ComparisonApiResponse;
      console.log("Comparison created successfully:", result);
      onSaveSuccess?.();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to save comparison";
      console.error("Error saving comparison:", err);
      setError(errorMessage);
      onSaveError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {error && (
        <div className="w-full px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <div className="text-red-400 text-sm font-medium">{error}</div>
        </div>
      )}
      <div className="w-full inline-flex justify-start items-center gap-4">
        <button
          onClick={handleSaveDraft}
          disabled={loading}
          className="flex-1 h-12 px-3 py-2 rounded-lg outline-1 outline-offset-1 outline-neutral-50 flex justify-center items-center transition-colors duration-150 hover:bg-zinc-700/30 focus:outline-none focus:ring-2 focus:ring-[#7f57e2] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="text-neutral-50 text-base">Save Draft</div>
        </button>
        <button
          onClick={handleSaveAndPublish}
          disabled={loading}
          className="flex-1 h-12 px-3 py-2 bg-gradient-to-b from-[#501bd6] to-[#7f57e2] rounded-lg flex justify-center items-center transition-transform duration-150 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#7f57e2] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="text-white text-base">
            {loading ? "Publishing..." : "Save & Publish"}
          </div>
        </button>
      </div>
    </div>
  );
}
