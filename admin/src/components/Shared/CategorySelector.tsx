import { useState, useEffect, useRef, type ChangeEvent, type ReactElement } from "react";
import { ChevronDown } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  categories?: string[];
  name?: string;
};

const DEFAULT_CATEGORIES = [
  "productivity",
  "design",
  "development",
  "marketing",
  "analytics",
  "communication",
  "project-management",
  "crm",
  "automation",
  "ai",
];

export default function CategorySelector({
  value,
  onChange,
  placeholder = "Select or type custom category",
  categories = DEFAULT_CATEGORIES,
  name,
}: Props): ReactElement {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(value || "");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle dropdown toggle
  const handleDropdownToggle = (): void => {
    setShowDropdown(!showDropdown);
  };

  // Handle category selection from dropdown
  const handleCategorySelect = (category: string): void => {
    setInputValue(category);
    onChange(category);
    setShowDropdown(false);
  };

  // Handle custom category input
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  // Handle click outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sync input value with external value prop
  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  // Filter categories based on input
  const filteredCategories = categories.filter(cat =>
    cat.toLowerCase().includes(inputValue.toLowerCase())
  );

  const isCustomCategory =
    inputValue &&
    !categories.includes(inputValue.toLowerCase()) &&
    inputValue.trim().length > 0;

  return (
    <div ref={dropdownRef} className="relative w-full">
      <div
        data-layer="Input"
        className="Input self-stretch h-14 px-4 py-3 relative bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700 inline-flex justify-start items-center cursor-pointer"
        onClick={handleDropdownToggle}
      >
        <input
          type="text"
          name={name}
          value={inputValue}
          onChange={handleInputChange}
          onClick={(e) => {
            e.stopPropagation();
            setShowDropdown(true);
          }}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-neutral-50 text-base font-normal font-['Poppins'] leading-6 placeholder:text-zinc-500 cursor-text"
        />
        <ChevronDown
          size={20}
          className={`text-neutral-50 transition-transform shrink-0 ${
            showDropdown ? "rotate-180" : ""
          }`}
        />
      </div>

      {showDropdown && (
        <div className="absolute z-50 w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {filteredCategories.map((category) => (
            <div
              key={category}
              onClick={() => handleCategorySelect(category)}
              className="px-4 py-3 hover:bg-zinc-700 cursor-pointer text-neutral-50 text-base font-normal font-['Poppins'] capitalize transition-colors"
            >
              {category.replace(/-/g, " ")}
            </div>
          ))}

          {isCustomCategory && (
            <div className="px-4 py-3 border-t border-zinc-700">
              <div
                onClick={() => handleCategorySelect(inputValue)}
                className="hover:bg-zinc-700 cursor-pointer text-neutral-50 text-base font-normal font-['Poppins'] transition-colors p-2 rounded"
              >
                <span className="text-zinc-400">Use custom: </span>
                <span className="text-[#737eff]">"{inputValue}"</span>
              </div>
            </div>
          )}

          {filteredCategories.length === 0 && !inputValue && (
            <div className="px-4 py-3 text-zinc-500 text-sm text-center">
              Type to search or add custom category
            </div>
          )}

          {filteredCategories.length === 0 && inputValue && !isCustomCategory && (
            <div className="px-4 py-3 text-zinc-500 text-sm text-center">
              No categories found. Press Enter to use "{inputValue}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
