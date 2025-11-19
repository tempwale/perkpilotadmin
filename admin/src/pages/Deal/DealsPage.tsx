import { useState, useEffect, type ReactElement, type ReactNode } from "react";
import DealsGrid from "../../components/Deals/Deals/DealsGrid";
import DealsHeader from "../../components/Deals/Deals/DealsHeader";
import fetchDeals from "../../hooks/useDeals";
import type { DealApiResponse } from "../../types/api.types";

type SortOption = "newly-published" | "oldest" | "price-high" | "price-low" | "name-az";

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

export default function DealsPage(): ReactElement{
  const [allDeals, setAllDeals] = useState<DealApiResponse[]>([]);
  const [sortedDeals, setSortedDeals] = useState<DealApiResponse[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("newly-published");
  const [loading, setLoading] = useState(true);

  // Fetch deals on mount
  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const data = await fetchDeals();
        if (mounted) {
          setAllDeals(data);
        }
      } catch (error) {
        console.error("Failed to load deals:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    void load();
    return () => {
      mounted = false;
    };
  }, []);

  // Apply sorting whenever deals or sortBy changes
  useEffect(() => {
    // Apply sorting
    const sorted = [...allDeals].sort((a, b) => {
      switch (sortBy) {
        case "newly-published": {
          // Sort by createdAt or updatedAt descending (newest first)
          const dateA = new Date(a.createdAt || a.updatedAt || 0).getTime();
          const dateB = new Date(b.createdAt || b.updatedAt || 0).getTime();
          return dateB - dateA;
        }
        
        case "oldest": {
          // Sort by createdAt or updatedAt ascending (oldest first)
          const dateA = new Date(a.createdAt || a.updatedAt || 0).getTime();
          const dateB = new Date(b.createdAt || b.updatedAt || 0).getTime();
          return dateA - dateB;
        }
        
        case "price-high": {
          // Sort by price/discount high to low (if available)
          const priceA = parseFloat(a.discount || "0");
          const priceB = parseFloat(b.discount || "0");
          return priceB - priceA;
        }
        
        case "price-low": {
          // Sort by price/discount low to high (if available)
          const priceA = parseFloat(a.discount || "0");
          const priceB = parseFloat(b.discount || "0");
          return priceA - priceB;
        }
        
        case "name-az":
          // Sort by title alphabetically
          return (a.title || "").localeCompare(b.title || "");
        
        default:
          return 0;
      }
    });

    setSortedDeals(sorted);
  }, [allDeals, sortBy]);

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort);
  };

  if (loading) {
    return (
      <div className="Frame2147206029 w-[1116px] p-6 bg-zinc-900 rounded-3xl outline-1 -outline-offset-1 outline-zinc-800 inline-flex flex-col justify-start items-start gap-6">
        <div className="text-neutral-50">Loading deals...</div>
      </div>
    );
  }

  return (
    <div
      data-layer="Frame 2147206029"
      className="Frame2147206029 w-[1116px] p-6 bg-zinc-900 rounded-3xl outline-1 -outline-offset-1 outline-zinc-800 inline-flex flex-col justify-start items-start gap-6"
    >
      <DealsHeader 
        onSortChange={handleSortChange}
      />
      <DealsGrid deals={sortedDeals as UIDeal[]} />
    </div>
  );
}
