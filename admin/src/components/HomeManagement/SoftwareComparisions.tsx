import { ChevronDown } from "lucide-react";
import {useEffect, useState, type ReactElement} from "react";
import ComparisionsGrid from "./ComparisionsGrid";

type Props = {
  topTagline?: string;
  mainHeadline?: string;
  subHeadline?: string;
  ctaText?: string;
  ctaLink?: string;
  onImageChange?: (file: File | null) => void;
  tags?: string[];
  onChange?: (fields: {
    topTagline: string;
    mainHeadline: string;
    subHeadline: string;
    ctaText?: string;
    ctaLink?: string;
    tags: string[];
  }) => void;
  open?: boolean;
  onToggleOpen?: (next: boolean) => void;
};

export default function SoftwareComparisions({
  topTagline,
  mainHeadline,
  subHeadline,
  ctaText,
  ctaLink,
  tags,
  onChange,
  open: openProp,
  onToggleOpen,
}: Props): ReactElement{
  const [internalOpen, setInternalOpen] = useState(true);

  // fields internal state
  const [internalTop, setInternalTop] = useState(
    topTagline ?? "For Expert Insights"
  );
  const [internalMain, setInternalMain] = useState(
    mainHeadline ?? "Software Deals"
  );
  const [internalSub, setInternalSub] = useState(
    subHeadline ??
      "In-depth reviews, comparisons, and insights about the latest software tools and productivity solutions."
  );
  const [internalTags, setInternalTags] = useState<string[]>(
    tags ?? ["AI Tools", "No-code", "Marketing"]
  );
  const [internalCtaText, setInternalCtaText] = useState<string>(ctaText ?? "");
  const [internalCtaLink, setInternalCtaLink] = useState<string>(ctaLink ?? "");

  const [query, setQuery] = useState("");

  // sync prop -> internal when props change
  useEffect((): void => {
    if (topTagline !== undefined) setInternalTop(topTagline);
  }, [topTagline]);
  useEffect((): void => {
    if (mainHeadline !== undefined) setInternalMain(mainHeadline);
  }, [mainHeadline]);
  useEffect((): void => {
    if (subHeadline !== undefined) setInternalSub(subHeadline);
  }, [subHeadline]);
  useEffect((): void => {
    if (tags !== undefined) setInternalTags(tags);
  }, [tags]);

  // sync CTA props when they change
  useEffect((): void => {
    if (ctaText !== undefined) setInternalCtaText(ctaText);
  }, [ctaText]);

  useEffect((): void => {
    if (ctaLink !== undefined) setInternalCtaLink(ctaLink);
  }, [ctaLink]);

  const open = openProp ?? internalOpen;

  function toggleOpen(): void {
    const next = !open;
    if (openProp === undefined) setInternalOpen(next);
    if (onToggleOpen) onToggleOpen(next);
  }

  // notify parent when fields change
  useEffect((): void => {
    if (onChange)
      onChange({
        topTagline: internalTop,
        mainHeadline: internalMain,
        subHeadline: internalSub,
        ctaText: internalCtaText,
        ctaLink: internalCtaLink,
        tags: internalTags,
      });
  }, [
    internalTop,
    internalMain,
    internalSub,
    internalCtaText,
    internalCtaLink,
    internalTags,
    onChange,
  ]);

  return (
    <div className="w-full p-4 bg-zinc-800 rounded-2xl flex flex-col justify-start items-start gap-6">
      <div className="self-stretch pb-4 border-b border-zinc-700 inline-flex justify-between items-center">
        <div className="text-neutral-50 text-xl font-medium leading-loose">
          Software Comparisions
        </div>

        <button
          type="button"
          aria-expanded={open}
          onClick={toggleOpen}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-zinc-700/20 focus:outline-none focus:ring-2 focus:ring-[#7f57e2]"
          aria-label={open ? "Collapse hero section" : "Expand hero section"}
        >
          <ChevronDown
            className={`text-zinc-400 transition-transform duration-150 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>

      {open && (
        <>
          <div className="self-stretch flex flex-col justify-center items-start gap-3">
            <label className="text-neutral-50 text-sm font-medium">
              Section Title{" "}
            </label>
            <input
              className="self-stretch h-12 pl-4 pr-4 py-3 bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700 text-zinc-200"
              value={internalTop}
              onChange={(e) => setInternalTop(e.target.value)}
            />
          </div>

          <div className="self-stretch relative bg-zinc-800 rounded-xl outline-1 -outline-offset-1 outline-zinc-700 px-3 py-2">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded flex items-center justify-center">
                {/* simple search circle visual (keeps original look) */}
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
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M20.1654 20.1666L18.332 18.3333"
                    stroke="#727A8F"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>{" "}
              </div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Comparisions Blog"
                className="bg-transparent outline-none text-zinc-400 placeholder:text-zinc-500 w-full"
                aria-label="Search Comparisions Blog"
              />
            </div>
          </div>
          <ComparisionsGrid />
        </>
      )}
    </div>
  );
}
