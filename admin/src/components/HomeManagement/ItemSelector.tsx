import { useState, useEffect, type ReactElement } from "react";
import { Search, X } from "lucide-react";

interface Item {
  _id: string;
  [key: string]: unknown;
}

interface ItemSelectorProps<T extends Item> {
  title: string;
  apiEndpoint: string;
  selectedItems: string[]; // Array of IDs
  onSelectionChange: (selectedIds: string[]) => void;
  renderItem: (item: T) => ReactElement;
  searchPlaceholder?: string;
  maxSelections?: number;
  onClose?: () => void;
}

export default function ItemSelector<T extends Item>({
  title,
  apiEndpoint,
  selectedItems,
  onSelectionChange,
  renderItem,
  searchPlaceholder = "Search...",
  maxSelections,
  onClose,
}: ItemSelectorProps<T>): ReactElement {
  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState<T[]>([]);
  const [filteredItems, setFilteredItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all items when modal opens
  useEffect(() => {
    if (isOpen && items.length === 0) {
      void fetchItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Filter items based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredItems(items);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = items.filter((item) =>
        JSON.stringify(item).toLowerCase().includes(query)
      );
      setFilteredItems(filtered);
    }
  }, [searchQuery, items]);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(apiEndpoint);
      if (!response.ok) {
        throw new Error(`Failed to fetch items: ${response.status}`);
      }
      const json = await response.json() as T[] | { data: T[] };
      // Handle both array response and { data: [...] } response
      const data: T[] = Array.isArray(json)
        ? json
        : (json.data && Array.isArray(json.data) ? json.data : []);
      setItems(data);
      setFilteredItems(data);
    } catch (err) {
      console.error("Error fetching items:", err);
      setError(err instanceof Error ? err.message : "Failed to load items");
    } finally {
      setLoading(false);
    }
  };

  const toggleSelection = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      // Remove item
      onSelectionChange(selectedItems.filter(id => id !== itemId));
    } else {
      // Add item
      if (maxSelections && selectedItems.length >= maxSelections) {
        alert(`You can only select up to ${maxSelections} items`);
        return;
      }
      onSelectionChange([...selectedItems, itemId]);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-4xl max-h-[80vh] bg-zinc-900 rounded-2xl outline-1 -outline-offset-1 outline-zinc-800 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
              <h2 className="text-neutral-50 text-xl font-semibold">{title}</h2>
              <button
                type="button"
                onClick={handleClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5 text-zinc-400" />
              </button>
            </div>

            {/* Search */}
            <div className="p-6 border-b border-zinc-800">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 py-3 bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700 text-zinc-200 placeholder:text-zinc-500"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {loading && (
                <div className="flex justify-center items-center py-12">
                  <div className="text-neutral-50">Loading...</div>
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              {!loading && !error && filteredItems.length === 0 && (
                <div className="flex justify-center items-center py-12">
                  <div className="text-zinc-400">No items found</div>
                </div>
              )}

              {!loading && !error && filteredItems.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredItems.map((item) => {
                    const isSelected = selectedItems.includes(item._id);
                    return (
                      <button
                        key={item._id}
                        type="button"
                        onClick={() => toggleSelection(item._id)}
                        className={`p-4 rounded-lg outline-1 -outline-offset-1 transition-all text-left ${
                          isSelected
                            ? "bg-[#7f57e2]/20 outline-[#7f57e2]"
                            : "bg-zinc-800 outline-zinc-700 hover:outline-zinc-600"
                        }`}
                      >
                        {renderItem(item)}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-zinc-800 flex justify-between items-center">
              <div className="text-zinc-400 text-sm">
                {selectedItems.length} item{selectedItems.length !== 1 ? "s" : ""} selected
                {maxSelections && ` (max ${maxSelections})`}
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="h-10 px-6 py-2 bg-linear-to-b from-[#501bd6] to-[#7f57e2] rounded-lg text-white text-sm transition-transform duration-150 hover:scale-[1.02]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
