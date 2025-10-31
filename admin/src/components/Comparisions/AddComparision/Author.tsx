import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Author() {
  const [selectedAuthor, setSelectedAuthor] = useState("Select Author");
  const [selectedCategory, setSelectedCategory] = useState("Select Category");
  const [readingTime, setReadingTime] = useState("5 Minute");

  const [showAuthors, setShowAuthors] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const authors = ["John Doe", "Jane Smith", "Alex Turner", "Emily Clark"];
  const categories = ["Tech", "Design", "Marketing", "Finance"];

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
          className="Input self-stretch h-14 pl-6 pr-4 py-3 relative bg-zinc-800 rounded-xl outline outline-1 outline-zinc-700 inline-flex justify-between items-center cursor-pointer"
          onClick={() => setShowAuthors(!showAuthors)}
        >
          <span className="text-neutral-50 text-base font-normal font-['Poppins']">
            {selectedAuthor}
          </span>
          <ChevronDown className="text-zinc-200 w-5 h-5" />
          {showAuthors && (
            <div className="absolute top-16 left-0 w-full bg-zinc-800 rounded-xl shadow-lg border border-zinc-700 z-10">
              {authors.map((a) => (
                <div
                  key={a}
                  className="px-4 py-2 hover:bg-zinc-700 cursor-pointer text-neutral-50 text-sm font-['Poppins']"
                  onClick={() => {
                    setSelectedAuthor(a);
                    setShowAuthors(false);
                  }}
                >
                  {a}
                </div>
              ))}
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
          className="Input self-stretch h-14 pl-6 pr-4 py-3 relative bg-zinc-800 rounded-xl outline outline-1 outline-zinc-700 inline-flex justify-between items-center cursor-pointer"
          onClick={() => setShowCategories(!showCategories)}
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
                  onClick={() => {
                    setSelectedCategory(c);
                    setShowCategories(false);
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
          onChange={(e) => setReadingTime(e.target.value)}
          className="self-stretch h-14 pl-6 pr-4 py-3 bg-zinc-800 rounded-xl outline outline-1 outline-zinc-700 text-neutral-50 text-base font-normal font-['Poppins'] focus:outline-none"
        />
      </div>
    </div>
  );
}
