import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { useState, useEffect, useRef, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import type { SortOption, SortOptionItem, BlogsHeaderProps } from "../../../types/blog.types";

export default function BlogsHeader({
  onSortChange,
  onAddBlog,
}: BlogsHeaderProps): ReactElement {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<SortOption>("newly-published");
  const [showSortDropdown, setShowSortDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sort options with proper typing
  const sortOptions: SortOptionItem[] = [
    { value: "newly-published", label: "Newly First" },
    { value: "oldest", label: "Oldest First" },
    { value: "views-high", label: "Views: High to Low" },
    { value: "views-low", label: "Views: Low to High" },
    { value: "name-az", label: "Name: A to Z" },
  ];

  // Click outside handler for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false);
      }
    };

    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setShowSortDropdown(false);
      }
    };

    if (showSortDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showSortDropdown]);

  const handleSortChange = (value: SortOption): void => {
    setSortBy(value);
    setShowSortDropdown(false);
    onSortChange?.(value);
  };

  const handleAddNewBlog = (): void => {
    if (onAddBlog) {
      onAddBlog();
    } else {
      void navigate("/addblog");
    }
  };

  const selectedSortLabel: string =
    sortOptions.find((opt) => opt.value === sortBy)?.label ??
    "Newly First";

  return (
    <div
      data-layer="Frame 2147205542"
      className="Frame2147205542 self-stretch inline-flex justify-between items-center"
    >
      <div
        data-layer="Manage All Blogs"
        className="ManageAllBlogs justify-start text-neutral-50 text-xl font-medium font-['Poppins'] leading-8"
      >
        Manage All Blogs
      </div>
      <div
        data-layer="Frame 2147223652"
        className="Frame2147223652 flex justify-start items-center gap-6"
      >
        {/* Sort Dropdown */}
        <div className="relative" ref={dropdownRef}>
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

        {/* Manage Blog Page Content Button */}
        <div
          data-layer="Button"
          className="Button pl-3 pr-2 py-2 bg-neutral-50 rounded-lg inline-flex justify-start items-center gap-2"
          onClick={(): void => {
            if (onAddBlog) {
              onAddBlog();
            } else {
              void navigate("/blogsmanagement");
            }
          }}
        >
          <div
            data-layer="Horizontal container"
            className="HorizontalContainer flex justify-start items-center gap-2"
          >
            <div
              data-layer="Manage Blog Page Content"
              className="ManageBlogPageContent justify-start text-zinc-950 text-base font-normal font-['Poppins'] leading-6"
            >
              Manage Blog Page Content
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-zinc-950" />
        </div>

        {/* Add New Blog Button */}
        <button
          onClick={handleAddNewBlog}
          type="button"
          data-layer="Button"
          className="Button pl-3 pr-2 py-2 bg-neutral-50 rounded-lg flex justify-start items-center gap-2 hover:bg-neutral-200 transition-colors"
        >
          <div className="HorizontalContainer flex justify-start items-center gap-2">
            <div className="AddNewBlog justify-start text-zinc-950 text-base font-normal font-['Poppins'] leading-6">
              Add New Blog
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

