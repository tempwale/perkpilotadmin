import { type ReactElement } from "react";
import ItemSelector from "./ItemSelector";
import { COMPARISIONS_API } from "../../config/backend";

interface Comparison {
  _id: string;
  heroHeading: string;
  heroBody: string;
  blogCategory: string;
  author: string;
  readingTime: string;
  slug: string;
  isPublished: boolean;
  viewCount?: number;
  [key: string]: unknown;
}

interface ComparisonsSelectorProps {
  selectedComparisons: string[];
  onSelectionChange: (comparisonIds: string[]) => void;
  maxSelections?: number;
  onClose?: () => void;
}

export default function ComparisonsSelector({
  selectedComparisons,
  onSelectionChange,
  maxSelections,
  onClose,
}: ComparisonsSelectorProps): ReactElement {
  const renderComparison = (comparison: Comparison) => (
    <div className="flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-neutral-50 text-sm font-medium line-clamp-2 flex-1">
          {comparison.heroHeading}
        </h3>
        {comparison.isPublished ? (
          <span className="shrink-0 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded">
            Published
          </span>
        ) : (
          <span className="shrink-0 px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded">
            Draft
          </span>
        )}
      </div>
      <p className="text-zinc-400 text-xs line-clamp-2">
        {comparison.heroBody}
      </p>
      <div className="flex items-center gap-3 text-xs">
        <span className="text-zinc-400">{comparison.blogCategory}</span>
        <span className="text-zinc-500">•</span>
        <span className="text-zinc-400">{comparison.author}</span>
        <span className="text-zinc-500">•</span>
        <span className="text-zinc-400">{comparison.readingTime}</span>
        {comparison.viewCount !== undefined && comparison.viewCount > 0 && (
          <>
            <span className="text-zinc-500">•</span>
            <span className="text-[#7f57e2]">{comparison.viewCount} views</span>
          </>
        )}
      </div>
    </div>
  );

  return (
    <ItemSelector<Comparison>
      title="Select Comparisons for Software Comparisons Section"
      apiEndpoint={COMPARISIONS_API}
      selectedItems={selectedComparisons}
      onSelectionChange={onSelectionChange}
      renderItem={renderComparison}
      searchPlaceholder="Search comparisons by title, category, or author..."
      maxSelections={maxSelections}
      onClose={onClose}
    />
  );
}
