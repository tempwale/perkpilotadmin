import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import {useState, type ReactElement} from "react";

// Type definitions
type SortOption =
  | "newly-published"
  | "oldest"
  | "price-high"
  | "price-low"
  | "name-az";
type FilterOption = "all" | "active" | "expired" | "pending" | "draft";

interface SortOptionItem {
  value: SortOption;
  label: string;
}

interface DealsHeaderProps {
  onSortChange?: (value: SortOption) => void;
  onFilterChange?: (value: FilterOption) => void;
  onAddDeal?: () => void;
}

export default function DealsHeader({
  onSortChange,
  onAddDeal,
}: DealsHeaderProps): ReactElement{
  const [sortBy, setSortBy] = useState<SortOption>("newly-published");
  const [showSortDropdown, setShowSortDropdown] = useState<boolean>(false);
  // Sort options with proper typing
  const sortOptions: SortOptionItem[] = [
    { value: "newly-published", label: "Newly Published First" },
    { value: "oldest", label: "Oldest First" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "name-az", label: "Name: A to Z" },
  ];

  const handleSortChange = (value: SortOption): void => {
    setSortBy(value);
    setShowSortDropdown(false);
    onSortChange?.(value);
  };

  const handleAddNewDeal = (): void => {
    onAddDeal?.();
    // Navigate to the add deal page. Use window.location so this works
    // whether or not a client router is configured.
    window.location.assign("/adddeal");
  };

  const selectedSortLabel: string =
    sortOptions.find((opt) => opt.value === sortBy)?.label ??
    "Newly Published First";

  return (
    <div
      data-layer="Frame 2147205542"
      className="Frame2147205542 self-stretch inline-flex justify-between items-center"
    >
      <div
        data-layer="Manage All Deals Page"
        className="ManageAllDealsPage justify-start text-neutral-50 text-xl font-medium font-['Poppins'] leading-8"
      >
        Manage All Deals Page
      </div>
      <div
        data-layer="Frame 2147223652"
        className="Frame2147223652 flex justify-start items-center gap-6"
      >
        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={(): void => setShowSortDropdown(!showSortDropdown)}
            type="button"
            aria-expanded={showSortDropdown}
            aria-haspopup="true"
            data-layer="Button"
            className="Button pl-3 pr-2 py-2 bg-zinc-800 rounded-lg outline-1 -outline-offset-1 outline-zinc-700 flex justify-start items-center gap-2 hover:bg-zinc-700 transition-colors"
          >
            <div className="HorizontalContainer flex justify-start items-center gap-2">
              <div className="NewlyPublishedFirst justify-start text-neutral-50 text-base font-normal font-['Poppins'] leading-6">
                {selectedSortLabel}
              </div>
              <div className="DashboardIcon w-6 h-6 relative overflow-hidden">
                <ChevronDown className="text-white" />
              </div>
            </div>
          </button>

          {showSortDropdown && (
            <div className="absolute top-full mt-2 right-0 bg-zinc-800 rounded-lg outline-1 outline-zinc-700 shadow-lg z-10 min-w-[200px]">
              {sortOptions.map((option: SortOptionItem) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={(): void => handleSortChange(option.value)}
                  className={`w-full text-left px-4 py-2 text-neutral-50 hover:bg-zinc-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                    sortBy === option.value ? "bg-zinc-700" : ""
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div
          data-layer="Button"
          className="Button pl-3 pr-2 py-2 bg-neutral-50 rounded-lg inline-flex justify-start items-center gap-2"
          onClick={(): void => window.location.assign("/dealsmanagement")}
        >
          <div
            data-layer="Horizontal container"
            className="HorizontalContainer flex justify-start items-center gap-2"
          >
            <div
              data-layer="Manage Blog Page Content"
              className="ManageBlogPageContent justify-start text-zinc-950 text-base font-normal font-['Poppins'] leading-6"
            >
              Manage Deal Page Content
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-zinc-950" />
        </div>

        {/* Add New Deal Button */}
        <button
          onClick={handleAddNewDeal}
          type="button"
          data-layer="Button"
          className="Button pl-3 pr-2 py-2 bg-neutral-50 rounded-lg flex justify-start items-center gap-2 hover:bg-neutral-200 transition-colors"
        >
          <div className="HorizontalContainer flex justify-start items-center gap-2">
            <div className="AddNewDeal justify-start text-zinc-950 text-base font-normal font-['Poppins'] leading-6">
              Add New Deal
            </div>
          </div>
          <div data-layer="Icon/Plus" className="IconPlus w-5 h-5 relative">
            <Plus className="w-full h-full" />
          </div>
        </button>
      </div>
    </div>
  );
}
