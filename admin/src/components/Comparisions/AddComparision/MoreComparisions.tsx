import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import ComparisionsGrid from "../../HomeManagement/ComparisionsGrid";
import { ChevronDown, Trash } from "lucide-react";

type ComparisonItem = {
  id?: string;
  title?: string;
  description?: string;
  [key: string]: any;
};

export default function MoreComparisions() {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState<ComparisonItem[]>([]);
  const [allComparisons, setAllComparisons] = useState<ComparisonItem[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);

  // Fetch or set initial data
  useEffect(() => {
    // Replace this with your actual data fetching logic
    // Example: fetch('/api/comparisons').then(res => res.json()).then(setAllComparisons)
    setAllComparisons([]); // Your comparison data here
    setFilteredData([]);
  }, []);

  // Filter comparisons based on search query
  useEffect(() => {
    if (query.trim() === "") {
      setFilteredData(allComparisons);
    } else {
      const filtered = allComparisons.filter(
        (item) =>
          item.title?.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [query, allComparisons]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleToggleSection = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDeleteSection = () => {
    if (window.confirm("Are you sure you want to delete this section?")) {
      // Implement delete logic here
      console.log("Section deleted");
    }
  };

  return (
    <div
      data-layer="Frame 2147205992"
      className="Frame2147205992 self-stretch rounded-2xl inline-flex flex-col justify-start items-start gap-6"
    >
      <div
        data-layer="Frame 2147205981"
        className="Frame2147205981 self-stretch pb-4 border-b border-zinc-800 inline-flex justify-between items-center cursor-pointer"
        onClick={handleToggleSection}
      >
        <div
          data-layer="More Comparison Tools Blog"
          className="MoreComparisonToolsBlog justify-start text-neutral-50 text-xl font-medium font-['Poppins'] leading-8"
        >
          More Comparison Tools Blog
        </div>
        <ChevronDown
          className={`text-zinc-400 transition-transform duration-300 ${
            isExpanded ? "" : "rotate-180"
          }`}
        />
      </div>

      {isExpanded && (
        <>
          <div
            data-layer="Frame 2147206010"
            className="Frame2147206010 self-stretch inline-flex justify-start items-center gap-6"
          >
            <div
              data-layer="Frame 2147205559"
              className="Frame2147205559 flex-1 flex justify-start items-center gap-3"
            >
              <div
                data-layer="Section Title"
                className="SectionTitle justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
              >
                Section Title
              </div>
              <div
                data-layer="Input"
                className="Input flex-1 pl-6 pr-4 relative rounded-xl flex justify-start items-center flex-wrap content-center overflow-hidden"
              >
                <div
                  data-layer="Frame 13"
                  className="Frame13 left-[16px] top-[16px] absolute flex justify-start items-center gap-3"
                >
                  <div
                    data-layer="Frame 1171275453"
                    className="Frame1171275453 flex justify-start items-center"
                  >
                    <div
                      data-layer="Tools Face-Off Which SaaS Resigns Supreme?"
                      className="ToolsFaceOffWhichSaasResignsSupreme justify-start text-neutral-50 text-base font-normal font-['Poppins'] leading-6"
                    >
                      Tools Face-Off Which SaaS Resigns Supreme?
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              data-layer="Frame 2147205993"
              className="Frame2147205993 flex justify-start items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleDeleteSection}
            >
              <div
                data-layer="Remove or Delete Section"
                className="RemoveOrDeleteSection justify-start text-[#e62f29] text-sm font-medium font-['Poppins']"
              >
                Remove or Delete Section
              </div>
              <Trash className="text-red-500 w-4 h-4" />
            </button>
          </div>

          <div className="self-stretch relative bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-1px] outline-zinc-700 px-3 py-2">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    d="M10.5404 19.2499C15.3498 19.2499 19.2487 15.3511 19.2487 10.5416C19.2487 5.73211 15.3498 1.83325 10.5404 1.83325C5.73088 1.83325 1.83203 5.73211 1.83203 10.5416C1.83203 15.3511 5.73088 19.2499 10.5404 19.2499Z"
                    stroke="#727A8F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20.1654 20.1666L18.332 18.3333"
                    stroke="#727A8F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <input
                value={query}
                onChange={handleSearchChange}
                placeholder="Search blogs"
                className="bg-transparent outline-none text-zinc-400 placeholder:text-zinc-500 w-full"
                aria-label="Search blogs"
              />
            </div>
          </div>

          <ComparisionsGrid data={filteredData} searchQuery={query} />
        </>
      )}
    </div>
  );
}
