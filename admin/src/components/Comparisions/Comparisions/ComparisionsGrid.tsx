import { useState, useEffect, type ReactNode, type ReactElement } from "react";
import ComparisionCard from "./ComparisionsCard";
import Pagination from "./Pagination";
import fetchComparisions from "../../../hooks/useComparisions";
import type { ComparisonApiResponse } from "../../../types/api.types";

// UI-facing Comparision shape that may include backend-specific fields.
type UIComparision = Partial<ComparisonApiResponse> & {
  _id?: string;
  id?: number | string;
  logoUri?: string;
  logoComponent?: ReactNode;
  verified?: boolean;
  tag?: string;
  ComparisionType?: string;
  features?: string[];
  discount?: string;
  savings?: string;
  category?: string;
  title?: string;
  description?: string;
};

interface ComparisionGridProps {
  Comparisions?: UIComparision[];
  onViewDetails?: (ComparisionId: string | number) => void;
  onGetComparision?: (ComparisionId: string | number) => void;
  itemsPerPage?: number;
  showPagination?: boolean;
}

export default function ComparisionGrid({
  Comparisions,
  onViewDetails,
  itemsPerPage = 6,
  showPagination = true,
}: ComparisionGridProps): ReactElement {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [apiComparisions, setApiComparisions] = useState<UIComparision[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return (): void => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Reset to page 1 when switching between mobile/desktop
  useEffect((): void => {
    setCurrentPage(1);
  }, [isMobile]);

  // Fetch Comparisions from API on mount (if no `Comparisions` prop provided)
  useEffect(() => {
    if (Comparisions && Comparisions.length) return; // caller provided Comparisions

    let mounted = true;
    async function load(): Promise<void> {
      setLoading(true);
      setFetchError(null);
      try {
        const data = await fetchComparisions();
        if (!mounted) return;
        // cast minimal Comparision[] into UIComparision[] for UI mapping (safe: fields are optional)
        setApiComparisions(data as UIComparision[]);
      } catch (e) {
        console.error("fetchComparisions error", e);
        if (mounted) {
          const errorMessage = e instanceof Error ? e.message : String(e);
          setFetchError(errorMessage);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load().catch((error) => {
      console.error("Failed to load comparisons:", error);
      if (mounted) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        setFetchError(errorMessage);
        setLoading(false);
      }
    });
    return (): void => {
      mounted = false;
    };
  }, [Comparisions]);

  // Decide which data source to use: prop -> API -> empty array
  const sourceComparisions =
    Comparisions && Comparisions.length > 0 ? Comparisions : apiComparisions;

  // Calculate items per page based on screen size
  const effectiveItemsPerPage = isMobile ? 3 : itemsPerPage;

  // Filter by single global search query (title, category, description, features)
  const normalizedQuery = query.trim().toLowerCase();
  const filteredComparisions = normalizedQuery
    ? sourceComparisions.filter((d): boolean => {
        const title = typeof d.title === "string" ? d.title.toLowerCase() : "";
        const category = typeof d.category === "string" 
          ? d.category.toLowerCase() 
          : (typeof d.ComparisionType === "string" ? d.ComparisionType.toLowerCase() : "");
        const description = typeof d.description === "string" ? d.description.toLowerCase() : "";
        const features = Array.isArray(d.features)
          ? d.features.join(" ").toLowerCase()
          : "";
        return (
          title.includes(normalizedQuery) ||
          category.includes(normalizedQuery) ||
          description.includes(normalizedQuery) ||
          features.includes(normalizedQuery)
        );
      })
    : sourceComparisions;

  // Calculate pagination based on filtered results
  const totalPages =
    Math.ceil(filteredComparisions.length / effectiveItemsPerPage) || 1;
  const startIndex = (currentPage - 1) * effectiveItemsPerPage;
  const endIndex = startIndex + effectiveItemsPerPage;
  const displayComparisions = showPagination
    ? filteredComparisions.slice(startIndex, endIndex)
    : filteredComparisions;

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
    // Scroll to top of grid when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewDetails = (ComparisionId: string | number): void => {
    if (onViewDetails) {
      onViewDetails(ComparisionId);
    } else {
      console.log(`View details for Comparision ${ComparisionId}`);
    }
  };

  const handleDeleteComparision = (ComparisionId: string | number): void => {
    // Remove from API comparisions state
    setApiComparisions((prev) =>
      prev.filter((c): boolean => {
        const cId =
          c.id ?? c._id ?? `Comparision-${sourceComparisions.indexOf(c)}`;
        return cId !== ComparisionId;
      })
    );
  };

  return (
    <div className="w-full">
      {/* Grid Container with animation */}

      {loading && (
        <div className="col-span-full text-center py-6">
          Loading Comparisions...
        </div>
      )}

      {fetchError && (
        <div className="col-span-full text-center text-red-500 py-6">
          {fetchError}
        </div>
      )}

      {!loading && !fetchError && displayComparisions.length === 0 && (
        <div className="col-span-full text-center py-6 text-gray-500">
          No Comparisions available at the moment.
        </div>
      )}

      {/* Single Search bar for the grid */}
      <div className="mb-4">
        <div className="self-stretch relative bg-zinc-800 rounded-xl px-3 py-2">
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
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.1654 20.1666L18.332 18.3333"
                  stroke="#727A8F"
                  strokeWidth={1.5}
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
      </div>

      {/* Responsive grid: 1 col mobile, 2 cols sm, 3 cols md+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {displayComparisions.map((Comparision, idx) => {
          // Determine the index in the full source array (used for delete by index)
          const sourceIndex = sourceComparisions.indexOf(Comparision);
          // Normalize API shape (supports different property names)
          const idKey =
            Comparision.id ??
            Comparision._id ??
            `Comparision-${sourceIndex >= 0 ? sourceIndex : idx}`;
          // logoUri/logoComponent may exist on the API object; we only map the
          // parts we need into the card props below.

          // Map API shape to the UI card props expected by the new ComparisionsCard
          const apiToComparisionCardProps = (item: UIComparision): {
            app1Logo: React.ReactNode;
            app2Logo: React.ReactNode;
            title: string;
            description: string;
            tags: string[];
          } => {
            const tools = Array.isArray(item.toolsMentioned)
              ? item.toolsMentioned
              : [];
            const t1 = tools[0];
            const t2 = tools[1];

            const app1Logo: React.ReactNode = t1?.toolLogo ? (
              <img
                src={t1.toolLogo}
                alt={typeof t1.toolName === "string" ? t1.toolName : (typeof item.title === "string" ? item.title : "logo")}
                className="w-8 h-8 object-contain"
              />
            ) : (
              (item.logoComponent ?? null) ??
              (item.logoUri ? (
                <img
                  src={item.logoUri}
                  alt={typeof item.title === "string" ? item.title : "logo"}
                  className="w-8 h-8 object-contain"
                />
              ) : null)
            );

            const app2Logo: React.ReactNode = t2?.toolLogo ? (
              <img
                src={t2.toolLogo}
                alt={t2.toolName ?? "logo"}
                className="w-8 h-8 object-contain"
              />
            ) : null;

            const heroHeadingValue = item.heroHeading;
            const titleValue = item.title;
            const slugValue = item.slug;
            const heroBodyValue = item.heroBody;
            const descriptionValue = item.description;
            
            const title = (typeof heroHeadingValue === "string" ? heroHeadingValue : undefined) ??
              (typeof titleValue === "string" ? titleValue : undefined) ??
              (typeof slugValue === "string" ? slugValue : undefined) ??
              "";
            const description = (typeof heroBodyValue === "string" ? heroBodyValue : undefined) ??
              (typeof descriptionValue === "string" ? descriptionValue : undefined) ??
              "";

            const tags = [
              typeof item.category === "string" ? item.category : undefined,
              typeof item.ComparisionType === "string" ? item.ComparisionType : undefined,
              typeof item.tag === "string" ? item.tag : undefined,
              typeof t1?.toolCategory === "string" ? t1.toolCategory : undefined,
              typeof t2?.toolCategory === "string" ? t2.toolCategory : undefined,
            ].filter((tag): tag is string => typeof tag === "string" && tag.length > 0);

            return {
              app1Logo,
              app2Logo,
              title,
              description,
              tags,
            };
          };

          const cardProps = apiToComparisionCardProps(Comparision);

          return (
            <div key={String(idKey)}>
              <ComparisionCard
                id={idKey}
                {...cardProps}
                comparisonData={Comparision as ComparisonApiResponse}
                onReadComparison={() => handleViewDetails(idKey)}
                onDelete={() => handleDeleteComparision(idKey)}
              />
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
