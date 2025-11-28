import { type ReactElement } from "react";
import ItemSelector from "./ItemSelector";
import { DEALS_API } from "../../config/backend";

interface Deal {
  _id: string;
  title: string;
  category: string;
  description: string;
  discount: string;
  savings: string;
  tag?: string;
  logoUri?: string;
  verified?: boolean;
  rating?: number;
  [key: string]: unknown;
}

interface DealsSelectorProps {
  selectedDeals: string[];
  onSelectionChange: (dealIds: string[]) => void;
  maxSelections?: number;
  onClose?: () => void;
}

export default function DealsSelector({
  selectedDeals,
  onSelectionChange,
  maxSelections,
  onClose,
}: DealsSelectorProps): ReactElement {
  const renderDeal = (deal: Deal) => (
    <div className="flex items-start gap-3">
      {deal.logoUri && (
        <img
          src={deal.logoUri}
          alt={deal.title}
          className="w-12 h-12 rounded-lg object-cover"
        />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-neutral-50 text-sm font-medium truncate">
            {deal.title}
          </h3>
          {deal.verified && (
            <span className="shrink-0 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded">
              Verified
            </span>
          )}
          {deal.tag && (
            <span className="shrink-0 px-2 py-0.5 bg-orange-500/20 text-orange-400 text-xs rounded">
              {deal.tag}
            </span>
          )}
        </div>
        <p className="text-zinc-400 text-xs mb-2 line-clamp-2">
          {deal.description}
        </p>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-[#7f57e2] font-medium">{deal.discount}</span>
          <span className="text-zinc-500">•</span>
          <span className="text-zinc-400">{deal.category}</span>
          {deal.rating != null && (
            <>
              <span className="text-zinc-500">•</span>
              <span className="text-yellow-400">★ {deal.rating.toFixed(1)}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <ItemSelector<Deal>
      title="Select Deals for Top Picks"
      apiEndpoint={DEALS_API}
      selectedItems={selectedDeals}
      onSelectionChange={onSelectionChange}
      renderItem={renderDeal}
      searchPlaceholder="Search deals by title, category, or discount..."
      maxSelections={maxSelections}
      onClose={onClose}
    />
  );
}
