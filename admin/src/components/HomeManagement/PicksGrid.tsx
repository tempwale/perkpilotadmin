import { type ReactElement } from "react";
import React, { useState, useEffect } from "react";
import Pick from "./PicksCard";
import { DEALS_API } from "../../config/backend";

interface Deal {
  _id: string;
  title: string;
  category: string;
  description: string;
  discount: string;
  savings: string;
  logoUri?: string;
  verified?: boolean;
  rating?: number;
  [key: string]: unknown;
}

interface PicksGridProps {
  selectedDeals: string[];
}

const PicksGrid: React.FC<PicksGridProps> = ({ selectedDeals }) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Fetch selected deals
  useEffect(() => {
    if (selectedDeals.length === 0) {
      setDeals([]);
      return;
    }

    const fetchDeals = async () => {
      setLoading(true);
      try {
        const response = await fetch(DEALS_API);
        if (!response.ok) throw new Error("Failed to fetch deals");
        const allDeals = (await response.json()) as Deal[];

        // Filter to only show selected deals in the same order
        const selectedDealsData = selectedDeals
          .map(id => allDeals.find(deal => deal._id === id))
          .filter((deal): deal is Deal => deal !== undefined);

        setDeals(selectedDealsData);
      } catch (error) {
        console.error("Error fetching deals:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchDeals();
  }, [selectedDeals]);

  if (loading) {
    return (
      <div className="w-full py-8 flex justify-center items-center">
        <div className="text-neutral-50">Loading deals...</div>
      </div>
    );
  }

  if (deals.length === 0) {
    return (
      <div className="w-full p-6 bg-zinc-800/50 rounded-lg border border-dashed border-zinc-700 text-center">
        <p className="text-zinc-400 text-sm">No deals selected. Click "Manage Deals" to add some.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto overflow-hidden px-4 md:px-0">
      {/* scoped style to hide the native scrollbar for this carousel (cross-browser) */}
      <style>{`.picks-scroll::-webkit-scrollbar{display:none}.picks-scroll{scrollbar-width:none;-ms-overflow-style:none}`}</style>
      <div
        className="px-4 overflow-x-auto picks-scroll py-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        aria-label="Top picks carousel"
      >
        <div className="flex gap-4 items-stretch snap-x snap-mandatory">
          {deals
            .slice(0, isDesktop ? deals.length : 3)
            .map((deal): ReactElement => (
              <div
                key={deal._id}
                className="min-w-[260px] md:min-w-[300px] lg:min-w-[340px] snap-start flex-shrink-0"
              >
                <Pick
                  appName={deal.title}
                  category={deal.category}
                  description={deal.description}
                  discountPercentage={deal.discount}
                  savingsAmount={deal.savings}
                  rating={deal.rating ? `${deal.rating}/5.0 Ratings` : "No ratings"}
                  verified={deal.verified ?? false}
                  logoUri={deal.logoUri}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PicksGrid;
