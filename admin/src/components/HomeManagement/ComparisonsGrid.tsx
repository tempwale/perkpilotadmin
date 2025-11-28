import { type ReactElement } from "react";
import React, { useState, useEffect } from "react";
import ComparisionsCard from "./ComparisionsCard";
import { COMPARISIONS_API } from "../../config/backend";

interface Comparison {
  _id: string;
  heroHeading: string;
  heroBody?: string;
  sectionHeadline?: string;
  toolsMentioned?: Array<{
    toolName: string;
    toolLogo?: string;
    toolCategory?: string;
  }>;
  [key: string]: unknown;
}

interface ComparisonsGridProps {
  selectedComparisons: string[];
}

const ComparisonsGrid: React.FC<ComparisonsGridProps> = ({ selectedComparisons }) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [comparisons, setComparisons] = useState<Comparison[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Fetch selected comparisons
  useEffect(() => {
    if (selectedComparisons.length === 0) {
      setComparisons([]);
      return;
    }

    const controller = new AbortController();

    const fetchComparisons = async () => {
      setLoading(true);
      try {
        const response = await fetch(COMPARISIONS_API, { signal: controller.signal });
        if (!response.ok) throw new Error("Failed to fetch comparisons");
        const allComparisons = (await response.json()) as Comparison[];

        if (controller.signal.aborted) return;

        // Filter to only show selected comparisons in the same order
        const selectedComparisonsData = selectedComparisons
          .map(id => allComparisons.find(comp => comp._id === id))
          .filter((comp): comp is Comparison => comp !== undefined);

        setComparisons(selectedComparisonsData);
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return; // Ignore abort errors
        }
        // Error fetching comparisons
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void fetchComparisons();

    return () => controller.abort();
  }, [selectedComparisons]);

  if (loading) {
    return (
      <div className="w-full py-8 flex justify-center items-center">
        <div className="text-neutral-50">Loading comparisons...</div>
      </div>
    );
  }

  if (comparisons.length === 0) {
    return (
      <div className="w-full p-6 bg-zinc-800/50 rounded-lg border border-dashed border-zinc-700 text-center">
        <p className="text-zinc-400 text-sm">No comparisons selected. Click "Manage Comparisons" to add some.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto overflow-hidden px-4 md:px-0">
      {/* scoped style to hide the native scrollbar for this carousel (cross-browser) */}
      <style>{`.comparisons-scroll::-webkit-scrollbar{display:none}.comparisons-scroll{scrollbar-width:none;-ms-overflow-style:none}`}</style>
      <div
        className="px-4 overflow-x-auto comparisons-scroll py-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        aria-label="Software comparisons carousel"
      >
        <div className="flex gap-4 items-stretch snap-x snap-mandatory">
          {comparisons
            .slice(0, isDesktop ? comparisons.length : 3)
            .map((comparison): ReactElement => (
              <div
                key={comparison._id}
                className="min-w-[260px] md:min-w-[300px] lg:min-w-[340px] snap-start shrink-0"
              >
                <ComparisionsCard
                  app1Name={comparison.toolsMentioned?.[0]?.toolName || "Tool 1"}
                  app1Icon={comparison.toolsMentioned?.[0]?.toolLogo || ""}
                  app2Name={comparison.toolsMentioned?.[1]?.toolName || "Tool 2"}
                  app2Icon={comparison.toolsMentioned?.[1]?.toolLogo || ""}
                  title={comparison.heroHeading}
                  subtitle={comparison.sectionHeadline || ""}
                  description={comparison.heroBody || ""}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ComparisonsGrid;
