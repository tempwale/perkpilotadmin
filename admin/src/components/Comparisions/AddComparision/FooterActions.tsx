import { useState } from "react";
import { COMPARISIONS_API } from "../../../config/backend";

type Props = {
  comparisonData?: Record<string, any>;
  onSaveSuccess?: () => void;
  onSaveError?: (error: string) => void;
};

export default function FooterActions({
  comparisonData = {},
  onSaveSuccess,
  onSaveError,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSaveDraft = async () => {
    console.log("Save as draft:", comparisonData);
    // TODO: Implement draft saving logic
  };

  const handleSaveAndPublish = async () => {
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
      ({ field }) =>
        !comparisonData[field] || comparisonData[field].trim() === ""
    );

    if (missingFields.length > 0) {
      const fieldNames = missingFields.map(({ label }) => label).join(", ");
      const errorMsg = `Please fill in all required fields: ${fieldNames}`;
      setError(errorMsg);
      setLoading(false);
      onSaveError?.(errorMsg);
      return;
    }

    // Validate prosConsCards
    if (
      !comparisonData.prosConsCards ||
      comparisonData.prosConsCards.length < 2
    ) {
      const errorMsg = "At least 2 pros/cons cards are required";
      setError(errorMsg);
      setLoading(false);
      onSaveError?.(errorMsg);
      return;
    }

    // Validate toolBlogCards
    if (
      !comparisonData.toolBlogCards ||
      comparisonData.toolBlogCards.length === 0
    ) {
      const errorMsg = "At least 1 tool blog card is required";
      setError(errorMsg);
      setLoading(false);
      onSaveError?.(errorMsg);
      return;
    }

    // Prepare data - remove empty fields and add 'author' field (copy of authorId)
    const dataToSend = {
      ...comparisonData,
      author: comparisonData.authorId, // Backend expects both authorId and author
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
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Server error: ${response.status}`
        );
      }

      const result = await response.json();
      console.log("Comparison created successfully:", result);
      onSaveSuccess?.();
    } catch (err: any) {
      const errorMessage = err?.message || "Failed to save comparison";
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
          className="flex-1 h-12 px-3 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-neutral-50 flex justify-center items-center transition-colors duration-150 hover:bg-zinc-700/30 focus:outline-none focus:ring-2 focus:ring-[#7f57e2] disabled:opacity-50 disabled:cursor-not-allowed"
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
