import { useMemo, useState, type ReactElement } from "react";
import { ChevronDown } from "lucide-react";
import ComparisionsCard from "./ComparisionCard";
import type { ComparisonApiResponse } from "../../../types/api.types";

type ArticleGridProps = {
  comparisons: ComparisonApiResponse[];
  featuredIds: string[];
  onToggleFeatured: (id: string) => void;
  loading?: boolean;
};

export default function ArticleGrid({
  comparisons,
  featuredIds,
  onToggleFeatured,
  loading = false,
}: ArticleGridProps): ReactElement {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(true);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return comparisons;
    return comparisons.filter((comparison) => {
      const haystack = [
        comparison.heroHeading,
        comparison.heroBody,
        comparison.slug,
        comparison.blogCategory,
        ...(comparison.toolsMentioned?.map((tool) => tool.toolName) ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [comparisons, query]);

  return (
    <div className="w-full p-4 bg-zinc-800 rounded-2xl flex flex-col justify-start items-start gap-6">
      <div className="self-stretch pb-4 border-b border-zinc-700 inline-flex justify-between items-center">
        <div className="text-neutral-50 text-xl font-medium leading-loose">
          Feature Comparisions On Top
        </div>
        <button
          type="button"
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-zinc-700/20 focus:outline-none focus:ring-2 focus:ring-[#7f57e2]"
          aria-expanded={open}
          onClick={(): void => setOpen((v) => !v)}
          aria-label={open ? "Collapse article list" : "Expand article list"}
        >
          <ChevronDown
            className={`text-zinc-400 transition-transform duration-150 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>
      {open && (
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
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Comparisions"
              className="bg-transparent outline-none text-neutral-50 placeholder:text-zinc-500 w-full"
              aria-label="Search Comparisions"
            />
          </div>
        </div>
      )}

      {open && (
        <div className="self-stretch">
          {loading ? (
            <div className="text-center text-zinc-400 py-6">
              Loading comparisons...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filtered.map((comparison, idx) => {
                const key =
                  comparison._id ??
                  comparison.id ??
                  comparison.slug ??
                  `comparison-${idx}`;
                const tools = comparison.toolsMentioned ?? [];
                const featured = featuredIds.includes(String(key));
                return (
            <ComparisionsCard
                    key={key}
                    id={String(key)}
                    title={comparison.heroHeading ?? comparison.title}
                    description={comparison.heroBody ?? comparison.description}
                    tags={[
                      comparison.blogCategory ?? "",
                      ...(comparison.toolsMentioned?.map(
                        (tool) => tool.toolCategory ?? ""
                      ) ?? []),
                    ].filter(Boolean)}
                    app1Logo={
                      tools[0]?.toolLogo ? (
                        <img
                          src={tools[0].toolLogo}
                          alt={tools[0]?.toolName ?? "tool"}
                          className="w-8 h-8 object-contain"
            />
                      ) : undefined
                    }
                    app2Logo={
                      tools[1]?.toolLogo ? (
                        <img
                          src={tools[1].toolLogo}
                          alt={tools[1]?.toolName ?? "tool"}
                          className="w-8 h-8 object-contain"
                        />
                      ) : undefined
                    }
                    isSelected={featured}
                    onToggleFeatured={(): void =>
                      onToggleFeatured(String(key))
                    }
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
