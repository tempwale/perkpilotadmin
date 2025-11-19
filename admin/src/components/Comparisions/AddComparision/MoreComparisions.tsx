import { useState, useEffect, type ReactElement } from "react";
import type { ChangeEvent } from "react";
import ComparisionsGrid from "../../HomeManagement/ComparisionsGrid";
import { ChevronDown, Trash } from "lucide-react";
import type { ComparisonApiResponse } from "../../../types/api.types";

type ComparisonItem = Partial<ComparisonApiResponse> & {
  title?: string;
  description?: string;
  pageType?: string;
};

export default function MoreComparisions(): ReactElement {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState<ComparisonItem[]>([]);
  const [allComparisons, setAllComparisons] = useState<ComparisonItem[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);

  // Fetch or set initial data
  useEffect((): void => {
    // Replace this with your actual data fetching logic
    // Example: fetch('/api/comparisons').then(res => res.json()).then(setAllComparisons)
    setAllComparisons([]); // Your comparison data here
    setFilteredData([]);
  }, []);

  // Filter comparisons based on search query
  useEffect((): void => {
    if (query.trim() === "") {
      setFilteredData(allComparisons);
    } else {
      const normalizedQuery = query.toLowerCase();
      const filtered = allComparisons.filter(
        (item: ComparisonItem): boolean => {
          const titleValue = item.title;
          const descriptionValue = item.description;
          const title = typeof titleValue === "string" ? titleValue.toLowerCase() : "";
          const description = typeof descriptionValue === "string" ? descriptionValue.toLowerCase() : "";
          return title.includes(normalizedQuery) || description.includes(normalizedQuery);
        }
      );
      setFilteredData(filtered);
    }
  }, [query, allComparisons]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  const handleToggleSection = (): void => {
    setIsExpanded(!isExpanded);
  };

  const handleDeleteSection = (): void => {
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

          <div className="self-stretch relative bg-zinc-800 rounded-xl outline-1 -outline-offset-1 outline-zinc-700 px-3 py-2">
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
                className="bg-transparent outline-none text-neutral-50 placeholder:text-zinc-500 w-full"
                aria-label="Search blogs"
              />
            </div>
          </div>

          <ComparisionsGrid data={filteredData.filter((item): item is ComparisonApiResponse => {
            return typeof item.pageType === "string" && 
                   typeof item.title === "string" &&
                   typeof item.subtitle === "string" &&
                   typeof item.description === "string";
          }).map((item): ComparisonApiResponse => ({
            ...item,
            pageType: item.pageType ?? "Tool Comparison Blog",
            title: item.title ?? "",
            subtitle: item.subtitle ?? "",
            description: item.description ?? "",
          }))} searchQuery={query} />
        </>
      )}
    </div>
  );
}
