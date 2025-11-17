import { useState, useEffect, useRef, type ReactElement, type KeyboardEvent } from "react";
import { ChevronDown, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AUTHORS_API } from "../../config/backend";
import type { AuthorsApiResponse } from "../../types/api.types";

type Props = {
  onAuthorChange?: (author: string | undefined) => void;
  onCategoryChange?: (category: string) => void;
  onReadingTimeChange?: (time: string) => void;
  initialAuthorId?: string;
  initialCategory?: string;
  initialReadingTime?: string;
};

export default function Author({
  onAuthorChange,
  onCategoryChange,
  onReadingTimeChange,
  initialAuthorId,
  initialCategory,
  initialReadingTime,
}: Props): ReactElement {
  const navigate = useNavigate();
  const [selectedAuthor, setSelectedAuthor] = useState<string>("Select Author");
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || "Select Category");
  const [readingTime, setReadingTime] = useState(initialReadingTime || "5 Minutes");
  
  const authorDropdownRef = useRef<HTMLDivElement>(null);
  const authorMenuRef = useRef<HTMLDivElement>(null);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const onAuthorChangeRef = useRef(onAuthorChange);
  const [focusedAuthorIndex, setFocusedAuthorIndex] = useState<number>(-1);

  const [showAuthors, setShowAuthors] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const [authors, setAuthors] = useState<Array<{ id: string; name: string }>>(
    []
  );
  const [loadingAuthors, setLoadingAuthors] = useState(false);
  const categories = ["AI Tools", "Productivity", "Marketing", "Development", "Design", "Tech", "Finance"];

  // Fetch authors from backend (only once on mount)
  useEffect((): void => {
    const fetchAuthors = async (): Promise<void> => {
      setLoadingAuthors(true);
      try {
        const response = await fetch(`${AUTHORS_API}?limit=100`);
        if (!response.ok) {
          throw new Error("Failed to fetch authors");
        }

        // Check content-type
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }

        const result: unknown = await response.json();

        // Validate response structure
        if (
          typeof result !== "object" ||
          result === null ||
          !("data" in result) ||
          !Array.isArray((result as { data: unknown }).data)
        ) {
          throw new Error("Invalid API response structure");
        }

        const typedResult = result as AuthorsApiResponse;

        // Validate each author has required fields
        const authorsList = typedResult.data
          .filter(
            (author): boolean =>
              typeof author === "object" &&
              author !== null &&
              "_id" in author &&
              "authorName" in author &&
              typeof (author as { _id: unknown; authorName: unknown })._id === "string" &&
              typeof (author as { _id: unknown; authorName: unknown }).authorName === "string"
          )
          .map((author) => {
            const typedAuthor = author as { _id: string; authorName: string };
            return {
              id: typedAuthor._id,
              name: typedAuthor.authorName,
            };
          });

        setAuthors(authorsList);
      } catch (error) {
        console.error("Error fetching authors:", error);
        // Fallback to default authors if fetch fails
        setAuthors([
          { id: "1", name: "John Doe" },
          { id: "2", name: "Jane Smith" },
          { id: "3", name: "Alex Turner" },
          { id: "4", name: "Emily Clark" },
        ]);
      } finally {
        setLoadingAuthors(false);
      }
    };

    void fetchAuthors();
  }, []);

  // Keep ref updated with latest callback
  useEffect((): void => {
    onAuthorChangeRef.current = onAuthorChange;
  }, [onAuthorChange]);

  // Update selected author when initialAuthorId or authors change
  useEffect((): void => {
    if (initialAuthorId && authors.length > 0) {
      const foundAuthor = authors.find((a) => a.id === initialAuthorId);
      if (foundAuthor) {
        setSelectedAuthor(foundAuthor.name);
      } else {
        // If author not found, reset to default and notify parent
        setSelectedAuthor("Select Author");
        onAuthorChangeRef.current?.(undefined);
      }
    } else if (!initialAuthorId) {
      setSelectedAuthor("Select Author");
    }
  }, [initialAuthorId, authors]);

  // Click outside detection for author dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent): void => {
      if (
        authorDropdownRef.current &&
        !authorDropdownRef.current.contains(event.target as Node)
      ) {
        setShowAuthors(false);
        setFocusedAuthorIndex(-1);
      }
    };

    if (showAuthors) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showAuthors]);

  // Click outside detection for category dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent): void => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCategories(false);
      }
    };

    if (showCategories) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showCategories]);

  const handleAuthorSelect = (author: { id: string; name: string }): void => {
    setSelectedAuthor(author.name);
    setShowAuthors(false);
    setFocusedAuthorIndex(-1);
    onAuthorChange?.(author.id); // Send author ID to backend
  };

  const handleAuthorToggleKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!showAuthors) {
        setShowAuthors(true);
        setFocusedAuthorIndex(0);
      } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        const newIndex = e.key === "ArrowDown" 
          ? Math.min(focusedAuthorIndex + 1, authors.length - 1)
          : Math.max(focusedAuthorIndex - 1, 0);
        setFocusedAuthorIndex(newIndex);
      }
    } else if (e.key === "Escape" && showAuthors) {
      e.preventDefault();
      setShowAuthors(false);
      setFocusedAuthorIndex(-1);
    }
  };

  const handleAuthorMenuKeyDown = (e: KeyboardEvent<HTMLDivElement>, index: number): void => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const author = authors[index];
      if (author) {
        handleAuthorSelect(author);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIndex = Math.min(index + 1, authors.length - 1);
      setFocusedAuthorIndex(newIndex);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIndex = Math.max(index - 1, 0);
      setFocusedAuthorIndex(newIndex);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setShowAuthors(false);
      setFocusedAuthorIndex(-1);
    }
  };

  // Focus management when menu opens/closes
  useEffect(() => {
    if (showAuthors && authorMenuRef.current) {
      const firstOption = authorMenuRef.current.querySelector<HTMLElement>('[role="option"]');
      if (firstOption && focusedAuthorIndex === 0) {
        firstOption.focus();
      }
    }
  }, [showAuthors, focusedAuthorIndex]);

  const handleCategorySelect = (category: string): void => {
    setSelectedCategory(category);
    setShowCategories(false);
    onCategoryChange?.(category);
  };

  const handleReadingTimeChange = (time: string): void => {
    setReadingTime(time);
    onReadingTimeChange?.(time);
  };

  return (
    <div
      data-layer="Frame 2147205998"
      className="Frame2147205998 self-stretch inline-flex justify-start items-center gap-3"
    >
      {/* Author Dropdown */}
      <div
        ref={authorDropdownRef}
        data-layer="Frame 2147205561"
        className="Frame2147205561 flex-1 inline-flex flex-col justify-center items-start gap-3 relative"
      >
        <span className="Author text-neutral-50 text-sm font-medium font-['Poppins']">
          Author
        </span>
        <div
          id="author-select"
          className="Input self-stretch h-14 pl-6 pr-4 py-3 relative bg-zinc-800 rounded-xl outline-1 outline-zinc-700 inline-flex justify-between items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={(): void => setShowAuthors(!showAuthors)}
          onKeyDown={handleAuthorToggleKeyDown}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={showAuthors}
          aria-label="Select author"
          tabIndex={0}
        >
          <span className="text-neutral-50 text-base font-normal font-['Poppins']">
            {selectedAuthor}
          </span>
          <ChevronDown className="text-zinc-200 w-5 h-5" />
          {showAuthors && (
            <div
              ref={authorMenuRef}
              role="listbox"
              className="absolute top-16 left-0 w-full bg-zinc-800 rounded-xl shadow-lg border border-zinc-700 z-10 max-h-60 overflow-y-auto"
            >
              {loadingAuthors ? (
                <div className="px-4 py-3 text-neutral-50 text-sm font-['Poppins'] text-center" role="status">
                  Loading authors...
                </div>
              ) : authors.length === 0 ? (
                <div className="px-4 py-3 text-zinc-400 text-sm font-['Poppins'] text-center" role="status">
                  No authors found
                </div>
              ) : (
                authors.map((a, index) => (
                  <div
                    key={a.id}
                    role="option"
                    aria-selected={selectedAuthor === a.name}
                    tabIndex={focusedAuthorIndex === index ? 0 : -1}
                    className={`px-4 py-2 hover:bg-zinc-700 cursor-pointer text-neutral-50 text-sm font-['Poppins'] ${
                      focusedAuthorIndex === index ? "bg-zinc-700 ring-2 ring-blue-500" : ""
                    }`}
                    onClick={(e): void => {
                      e.stopPropagation();
                      handleAuthorSelect(a);
                    }}
                    onKeyDown={(e): void => {
                      e.stopPropagation();
                      handleAuthorMenuKeyDown(e, index);
                    }}
                  >
                    {a.name}
                  </div>
                ))
              )}
              <div
                className="px-4 py-3 border-t border-zinc-700 hover:bg-zinc-700 cursor-pointer flex items-center gap-2 text-[#7f57e2] text-sm font-medium font-['Poppins']"
                onClick={(e): void => {
                  e.stopPropagation();
                  void navigate("/addauthor");
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e): void => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    void navigate("/addauthor");
                  }
                }}
              >
                <Plus className="w-4 h-4" />
                <span>Add New Author</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Category Dropdown */}
      <div
        ref={categoryDropdownRef}
        data-layer="Frame 2147205563"
        className="Frame2147205563 flex-1 inline-flex flex-col justify-center items-start gap-3 relative"
      >
        <div className="BlogCategory text-neutral-50 text-sm font-medium font-['Poppins']">
          Blog Category
        </div>
        <div
          className="Input self-stretch h-14 pl-6 pr-4 py-3 relative bg-zinc-800 rounded-xl outline-1 outline-zinc-700 inline-flex justify-between items-center cursor-pointer"
          onClick={(): void => setShowCategories(!showCategories)}
        >
          <span className="text-neutral-50 text-base font-normal font-['Poppins']">
            {selectedCategory}
          </span>
          <ChevronDown className="text-zinc-200 w-5 h-5" />
          {showCategories && (
            <div className="absolute top-16 left-0 w-full bg-zinc-800 rounded-xl shadow-lg border border-zinc-700 z-10">
              {categories.map((c) => (
                <div
                  key={c}
                  className="px-4 py-2 hover:bg-zinc-700 cursor-pointer text-neutral-50 text-sm font-['Poppins']"
                  onClick={(e): void => {
                    e.stopPropagation();
                    handleCategorySelect(c);
                  }}
                >
                  {c}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Reading Time Input */}
      <div
        data-layer="Frame 2147205562"
        className="Frame2147205562 flex-1 inline-flex flex-col justify-center items-start gap-3"
      >
        <div className="ReadingTime text-neutral-50 text-sm font-medium font-['Poppins']">
          Reading Time
        </div>
        <input
          type="text"
          value={readingTime}
          onChange={(e): void => handleReadingTimeChange(e.target.value)}
          className="self-stretch h-14 pl-6 pr-4 py-3 bg-zinc-800 rounded-xl outline-1 outline-zinc-700 text-neutral-50 text-base font-normal font-['Poppins'] focus:outline-none"
        />
      </div>
    </div>
  );
}
