import {useMemo, useState, type ReactElement} from "react";
import DealsCard from "./DealCard";
import { ChevronDown } from "lucide-react";
import type { DealApiResponse } from "../../../types/api.types";
function FramerLogo(): ReactElement{
  return (
    <svg
      width="21"
      height="32"
      viewBox="0 0 21 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1_1900)">
        <path
          d="M0 0H21V10.6667H10.5L0 0ZM0 10.6667H10.5L21 21.3333H10.5V32L0 21.3333V10.6667Z"
          fill="#0D0D11"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_1900">
          <rect width="21" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

interface ArticleGridProps {
  allDeals?: DealApiResponse[];
  selectedDealIds?: string[];
  onDealsChange?: (dealIds: string[]) => void;
}

export default function ArticleGrid({
  allDeals = [],
  selectedDealIds = [],
  onDealsChange,
}: ArticleGridProps): ReactElement {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(true);

  // Convert deals to display format
  const posts = useMemo(() => {
    return allDeals.map((deal) => {
      const dealId = deal._id || (deal as { id?: string }).id || "";
      return {
        id: dealId,
        _id: dealId,
        title: deal.title || "",
        category: deal.category || "",
        description: deal.description || "",
        logoUri: deal.logoUri,
        verified: deal.verified || false,
        dealType: deal.tag || "",
        features: deal.features || [],
        discount: deal.discount || "",
        savings: deal.savings || "",
        isSelected: selectedDealIds.includes(dealId),
      };
    });
  }, [allDeals, selectedDealIds]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p): boolean => {
      const hay = `${p.title} ${p.description} ${p.category} ${p.dealType} ${(
        p.features || []
      ).join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [posts, query]);

  const handleToggleDeal = (dealId: string) => {
    if (!onDealsChange) return;
    
    const isSelected = selectedDealIds.includes(dealId);
    let newSelection: string[];
    
    if (isSelected) {
      newSelection = selectedDealIds.filter((id) => id !== dealId);
    } else {
      newSelection = [...selectedDealIds, dealId];
    }
    
    onDealsChange(newSelection);
  };

  return (
    <div className="w-full p-4 bg-zinc-800 rounded-2xl flex flex-col justify-start items-start gap-6">
      <div className="self-stretch pb-4 border-b border-zinc-700 inline-flex justify-between items-center">
        <div className="flex flex-col gap-1">
        <div className="text-neutral-50 text-xl font-medium leading-loose">
          Feature Deals On Top
          </div>
          <div className="text-zinc-400 text-sm">
            {selectedDealIds.length > 0
              ? `${selectedDealIds.length} deal${selectedDealIds.length === 1 ? "" : "s"} selected`
              : "Select deals to feature"}
          </div>
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
              {/* simple search circle visual (keeps original look) */}
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
              </svg>{" "}
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Deals"
              className="bg-transparent outline-none text-neutral-50 placeholder:text-zinc-500 w-full"
              aria-label="Search Deals"
            />
          </div>
        </div>
      )}

      {open && (
        <>
          {filtered.length === 0 ? (
            <div className="w-full text-center py-8 text-zinc-400">
              {allDeals.length === 0
                ? "No deals available. Create deals first."
                : "No deals match your search."}
            </div>
          ) : (
            <div className="self-stretch grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((p) => {
                const isSelected = selectedDealIds.includes(p.id);
                return (
                  <div
                    key={p.id}
                    className="relative cursor-pointer"
                    onClick={() => handleToggleDeal(p.id)}
                  >
                    <div
                      className={`absolute top-2 right-2 z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        isSelected
                          ? "bg-[#7f57e2] border-[#7f57e2]"
                          : "bg-zinc-800 border-zinc-600"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <path
                            d="M11.6667 3.5L5.25 9.91667L2.33334 7"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                    <div
                      className={`inline-block w-full transition-all ${
                        isSelected
                          ? "ring-2 ring-[#7f57e2] rounded-[24px] ring-offset-0"
                          : ""
                      }`}
                    >
                    <DealsCard
                      title={p.title}
                      category={p.category}
                      description={p.description}
                      logoComponent={
                        p.logoUri ? (
                          <img
                            src={p.logoUri}
                            alt={p.title}
                            className="w-14 h-14 object-contain"
                          />
                        ) : (
                          <FramerLogo />
                        )
                      }
                      dealType={p.dealType}
                      features={p.features}
                      discount={p.discount}
                      savings={p.savings}
                    />
                    </div>
                  </div>
                );
              })}
        </div>
          )}
        </>
      )}
    </div>
  );
}
