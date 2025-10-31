import { useState, useEffect, type ReactNode } from "react";
import ComparisionCard from "./ComparisionsCard";
import Pagination from "./Pagination";
import fetchComparisions, { type Deal } from "../../../hooks/useDeals";

// UI-facing Comparision shape that may include backend-specific fields.
type UIComparision = Partial<Comparision> & {
  _id?: string;
  id?: number;
  logoUri?: string;
  logoComponent?: ReactNode;
  verified?: boolean;
  tag?: string;
  ComparisionType?: string;
  features?: string[];
  discount?: string;
  savings?: string;
  category?: string;
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
  onGetComparision,
  itemsPerPage = 6,
  showPagination = true,
}: ComparisionGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [apiComparisions, setApiComparisions] = useState<UIComparision[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Reset to page 1 when switching between mobile/desktop
  useEffect(() => {
    setCurrentPage(1);
  }, [isMobile]);

  // Fetch Comparisions from API on mount (if no `Comparisions` prop provided)
  useEffect(() => {
    if (Comparisions && Comparisions.length) return; // caller provided Comparisions

    let mounted = true;
    async function load() {
      setLoading(true);
      setFetchError(null);
      try {
        const data = await fetchComparisions();
        if (!mounted) return;
        // cast minimal Comparision[] into UIComparision[] for UI mapping (safe: fields are optional)
        setApiComparisions(data as UIComparision[]);
      } catch (e: any) {
        console.error("fetchComparisions error", e);
        if (mounted) setFetchError(e.message || String(e));
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
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
    ? sourceComparisions.filter((d) => {
        const title = (d.title ?? "").toString().toLowerCase();
        const category = (d.category ?? d.ComparisionType ?? "")
          .toString()
          .toLowerCase();
        const description = (d.description ?? "").toString().toLowerCase();
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of grid when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewDetails = (ComparisionId: string | number) => {
    if (onViewDetails) {
      onViewDetails(ComparisionId);
    } else {
      console.log(`View details for Comparision ${ComparisionId}`);
    }
  };

  const handleGetComparision = (ComparisionId: string | number) => {
    if (onGetComparision) {
      onGetComparision(ComparisionId);
    } else {
      console.log(`Get Comparision ${ComparisionId}`);
    }
  };

  // Delete handler: only works when using internal apiComparisions state (not when `Comparisions` prop is provided)
  const handleDelete = (
    ComparisionId: string | number,
    sourceIndex: number
  ) => {
    if (Comparisions && Comparisions.length) {
      console.warn("Cannot delete Comparisions passed in via props");
      return;
    }

    setApiComparisions((prev) => {
      // prefer removing by index when available
      if (
        sourceIndex != null &&
        sourceIndex >= 0 &&
        sourceIndex < prev.length
      ) {
        const copy = [...prev];
        copy.splice(sourceIndex, 1);
        return copy;
      }

      // fallback: remove by matching id fields
      return prev.filter((d) => {
        const dId = d._id ?? d.id;
        return !(String(dId) === String(ComparisionId));
      });
    });

    // adjust current page if needed
    setCurrentPage((p) => {
      const newTotal = Math.max(
        1,
        Math.ceil((filteredComparisions.length - 1) / effectiveItemsPerPage)
      );
      return Math.min(p, newTotal);
    });
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
              className="bg-transparent outline-none text-zinc-400 placeholder:text-zinc-500 w-full"
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
          const category =
            Comparision.category ?? Comparision.ComparisionType ?? "";
          const ComparisionType =
            Comparision.ComparisionType ?? Comparision.tag ?? "";
          const logoComponent =
            Comparision.logoComponent ??
            (Comparision.logoUri ? (
              <img
                src={Comparision.logoUri}
                alt={Comparision.title ?? "logo"}
                className="w-12 h-12 object-contain"
              />
            ) : null);

          return (
            <div key={String(idKey)}>
              <ComparisionCard
                id={String(idKey)}
                title={Comparision.title}
                category={category}
                description={Comparision.description}
                logoComponent={logoComponent}
                verified={Comparision.verified ?? false}
                ComparisionType={ComparisionType}
                features={Comparision.features ?? []}
                discount={Comparision.discount ?? ""}
                savings={Comparision.savings ?? ""}
                onViewDetails={() => handleViewDetails(idKey)}
                onGetComparision={() => handleGetComparision(idKey)}
                onDelete={() => handleDelete(idKey, sourceIndex)}
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
