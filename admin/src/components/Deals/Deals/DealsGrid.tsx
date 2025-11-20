import { useState, useEffect, type ReactNode, type ReactElement } from "react";
import DealCard from "./DealsCard";
import Pagination from "./Pagination";
import fetchDeals from "../../../hooks/useDeals";
import type { DealApiResponse } from "../../../types/api.types";

// UI-facing deal shape that may include backend-specific fields.
type UIDeal = Partial<DealApiResponse> & {
  _id?: string;
  id?: number;
  logoUri?: string;
  logoComponent?: ReactNode;
  verified?: boolean;
  tag?: string;
  dealType?: string;
  features?: string[];
  discount?: string;
  savings?: string;
  category?: string;
};

interface DealGridProps {
  deals?: UIDeal[];
  onViewDetails?: (dealId: string | number) => void;
  onGetDeal?: (dealId: string | number) => void;
  itemsPerPage?: number;
  showPagination?: boolean;
}

export default function DealGrid({
  deals,
  onViewDetails,
  onGetDeal,
  itemsPerPage = 6,
  showPagination = true,
}: DealGridProps): ReactElement {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [apiDeals, setApiDeals] = useState<UIDeal[]>([]);
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

  // Fetch deals from API on mount (if no `deals` prop provided)
  useEffect(() => {
    if (deals && deals.length) return; // caller provided deals

    let mounted = true;
    async function load(): Promise<void> {
      setLoading(true);
      setFetchError(null);
      try {
        const data = await fetchDeals();
        if (!mounted) return;
        // cast minimal Deal[] into UIDeal[] for UI mapping (safe: fields are optional)
        setApiDeals(data as UIDeal[]);
      } catch (e) {
        console.error("fetchDeals error", e);
        if (mounted) {
          const errorMessage = e instanceof Error ? e.message : String(e);
          setFetchError(errorMessage);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load().catch((error) => {
      console.error("Failed to load deals:", error);
      if (mounted) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        setFetchError(errorMessage);
        setLoading(false);
      }
    });
    return (): void => {
      mounted = false;
    };
  }, [deals]);

  // Decide which data source to use: prop -> API -> empty array
  const sourceDeals = deals && deals.length > 0 ? deals : apiDeals;

  // Calculate items per page based on screen size
  const effectiveItemsPerPage = isMobile ? 3 : itemsPerPage;

  // Filter by single global search query (title, category, description, features)
  const normalizedQuery = query.trim().toLowerCase();
  const filteredDeals = normalizedQuery
    ? sourceDeals.filter((d): boolean => {
        const title = (d.title ?? "").toString().toLowerCase();
        const category = (d.category ?? d.dealType ?? "")
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
    : sourceDeals;

  // Calculate pagination based on filtered results
  const totalPages =
    Math.ceil(filteredDeals.length / effectiveItemsPerPage) || 1;
  const startIndex = (currentPage - 1) * effectiveItemsPerPage;
  const endIndex = startIndex + effectiveItemsPerPage;
  const displayDeals = showPagination
    ? filteredDeals.slice(startIndex, endIndex)
    : filteredDeals;

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
    // Scroll to top of grid when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewDetails = (dealId: string | number): void => {
    if (onViewDetails) {
      onViewDetails(dealId);
    } else {
      console.log(`View details for deal ${dealId}`);
    }
  };

  const handleGetDeal = (dealId: string | number): void => {
    if (onGetDeal) {
      onGetDeal(dealId);
    } else {
      console.log(`Get deal ${dealId}`);
    }
  };

  // Delete handler: only works when using internal apiDeals state (not when `deals` prop is provided)
  const handleDelete = (dealId: string | number, sourceIndex: number): void => {
    if (deals && deals.length) {
      console.warn("Cannot delete deals passed in via props");
      return;
    }

    setApiDeals((prev) => {
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
      return prev.filter((d): boolean => {
        const dId = d._id ?? d.id;
        return String(dId) !== String(dealId);
      });
    });

    // adjust current page if needed
    setCurrentPage((p) => {
      const newTotal = Math.max(
        1,
        Math.ceil((filteredDeals.length - 1) / effectiveItemsPerPage)
      );
      return Math.min(p, newTotal);
    });
  };

  return (
    <div className="w-full">
      {/* Grid Container with animation */}

      {loading && (
        <div className="col-span-full text-center py-6">Loading deals...</div>
      )}

      {fetchError && (
        <div className="col-span-full text-center text-red-500 py-6">
          {fetchError}
        </div>
      )}

      {!loading && !fetchError && displayDeals.length === 0 && (
        <div className="col-span-full text-center py-6 text-gray-500">
          No deals available at the moment.
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
              placeholder="Search deals"
              className="bg-transparent outline-none text-neutral-50 placeholder:text-zinc-500 w-full"
              aria-label="Search deals"
            />
          </div>
        </div>
      </div>

      {/* Responsive grid: 1 col mobile, 2 cols sm, 3 cols md+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {displayDeals.map((deal, idx) => {
          // Determine the index in the full source array (used for delete by index)
          const sourceIndex = sourceDeals.indexOf(deal);
          // Normalize API shape (supports different property names)
          const idKey =
            deal.id ??
            deal._id ??
            `deal-${sourceIndex >= 0 ? sourceIndex : idx}`;
          const category = deal.category ?? deal.dealType ?? "";
          const dealType = deal.dealType ?? deal.tag ?? "";
          const logoComponent =
            deal.logoComponent ??
            (deal.logoUri ? (
              <img
                src={deal.logoUri}
                alt={deal.title ?? "logo"}
                className="w-14 h-14 object-contain"
              />
            ) : null);

          return (
            <div key={String(idKey)}>
              <DealCard
                id={String(idKey)}
                title={deal.title}
                category={category}
                description={deal.description}
                logoComponent={logoComponent}
                dealType={dealType}
                features={deal.features ?? []}
                discount={deal.discount ?? ""}
                savings={deal.savings ?? ""}
                onViewDetails={() => handleViewDetails(idKey)}
                onGetDeal={() => handleGetDeal(idKey)}
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
