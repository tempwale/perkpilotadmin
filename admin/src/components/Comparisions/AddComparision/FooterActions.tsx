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

    try {
      const response = await fetch(COMPARISIONS_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comparisonData),
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
      {error && <div className="text-red-400 text-sm ml-2">{error}</div>}
    </div>
  );
}
