import { useState, useEffect, type ReactElement } from "react";
import { ChevronDown, Plus } from "lucide-react";
import { AUTHORS_API } from "../../../config/backend";
import type { AuthorsApiResponse } from "../../../types/api.types";

type Props = {
  onAuthorChange?: (author: string) => void;
  onCategoryChange?: (category: string) => void;
  onReadingTimeChange?: (time: string) => void;
};

export default function Author({
  onAuthorChange,
  onCategoryChange,
  onReadingTimeChange,
}: Props): ReactElement {
  const [selectedAuthor, setSelectedAuthor] = useState<string>("Select Author");
  const [selectedCategory, setSelectedCategory] = useState<string>("Select Category");
  const [readingTime, setReadingTime] = useState("5 Minute");

  const [showAuthors, setShowAuthors] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const [authors, setAuthors] = useState<Array<{ id: string; name: string }>>(
    []
  );
  const [loadingAuthors, setLoadingAuthors] = useState(false);
  const categories = ["Tech", "Design", "Marketing", "Finance"];

  // Fetch authors from backend
  useEffect((): void => {
    const fetchAuthors = async (): Promise<void> => {
      setLoadingAuthors(true);
      try {
        const response = await fetch(`${AUTHORS_API}?limit=100`);
        if (!response.ok) {
          throw new Error("Failed to fetch authors");
        }
        const result = await response.json() as AuthorsApiResponse;
        // Extract author id and name from the response
        const authorsList = result.data.map((author) => ({
          id: author._id,
          name: author.authorName,
        }));
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

  const handleAuthorSelect = (author: { id: string; name: string }): void => {
    setSelectedAuthor(author.name);
    setShowAuthors(false);
    onAuthorChange?.(author.id); // Send author ID to backend
  };

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
        data-layer="Frame 2147205561"
        className="Frame2147205561 flex-1 inline-flex flex-col justify-center items-start gap-3 relative"
      >
        <div className="Author text-neutral-50 text-sm font-medium font-['Poppins']">
          Author
        </div>
        <div
          className="Input self-stretch h-14 pl-6 pr-4 py-3 relative bg-zinc-800 rounded-xl outline-1 outline-zinc-700 inline-flex justify-between items-center cursor-pointer"
          onClick={(): void => setShowAuthors(!showAuthors)}
        >
          <span className="text-neutral-50 text-base font-normal font-['Poppins']">
            {selectedAuthor}
          </span>
          <ChevronDown className="text-zinc-200 w-5 h-5" />
          {showAuthors && (
            <div className="absolute top-16 left-0 w-full bg-zinc-800 rounded-xl shadow-lg border border-zinc-700 z-10 max-h-60 overflow-y-auto">
              {loadingAuthors ? (
                <div className="px-4 py-3 text-neutral-50 text-sm font-['Poppins'] text-center">
                  Loading authors...
                </div>
              ) : authors.length === 0 ? (
                <div className="px-4 py-3 text-zinc-400 text-sm font-['Poppins'] text-center">
                  No authors found
                </div>
              ) : (
                authors.map((a) => (
                  <div
                    key={a.id}
                    className="px-4 py-2 hover:bg-zinc-700 cursor-pointer text-neutral-50 text-sm font-['Poppins']"
                    onClick={(): void => handleAuthorSelect(a)}
                  >
                    {a.name}
                  </div>
                ))
              )}
              <div
                className="px-4 py-3 border-t border-zinc-700 hover:bg-zinc-700 cursor-pointer flex items-center gap-2 text-[#7f57e2] text-sm font-medium font-['Poppins']"
                onClick={(e): void => {
                  e.stopPropagation();
                  window.location.href = "/addauthor";
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
                  onClick={(): void => handleCategorySelect(c)}
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
