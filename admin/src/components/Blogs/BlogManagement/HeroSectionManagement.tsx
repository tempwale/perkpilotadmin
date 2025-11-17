import { ChevronDown } from "lucide-react";
import { useEffect, useState, useRef, type ReactElement } from "react";
import TagChips from "./TagChips";

type Props = {
  topTagline?: string;
  mainHeadline?: string;
  subHeadline?: string;
  tags?: string[];
  onChange?: (fields: {
    topTagline: string;
    mainHeadline: string;
    subHeadline: string;
    tags: string[];
  }) => void;
  open?: boolean;
  onToggleOpen?: (next: boolean) => void;
};

export default function HeroSectionManagement({
  topTagline,
  mainHeadline,
  subHeadline,
  tags,
  onChange,
  open: openProp,
  onToggleOpen,
}: Props): ReactElement{
  const [internalOpen, setInternalOpen] = useState(true);

  const [internalTop, setInternalTop] = useState(topTagline ?? "");
  const [internalMain, setInternalMain] = useState(mainHeadline ?? "");
  const [internalSub, setInternalSub] = useState(subHeadline ?? "");
  const [internalTags, setInternalTags] = useState<string[]>(tags ?? []);

  const isInitialMount = useRef(true);
  const prevValuesRef = useRef({ topTagline: "", mainHeadline: "", subHeadline: "", tags: [] as string[] });
  const prevPropsRef = useRef({ topTagline, mainHeadline, subHeadline, tags });

  // Sync props to internal state only when props actually change
  useEffect((): void => {
    if (topTagline !== undefined && topTagline !== prevPropsRef.current.topTagline) {
      prevPropsRef.current.topTagline = topTagline;
      setInternalTop(topTagline);
    }
  }, [topTagline]);
  
  useEffect((): void => {
    if (mainHeadline !== undefined && mainHeadline !== prevPropsRef.current.mainHeadline) {
      prevPropsRef.current.mainHeadline = mainHeadline;
      setInternalMain(mainHeadline);
    }
  }, [mainHeadline]);
  
  useEffect((): void => {
    if (subHeadline !== undefined && subHeadline !== prevPropsRef.current.subHeadline) {
      prevPropsRef.current.subHeadline = subHeadline;
      setInternalSub(subHeadline);
    }
  }, [subHeadline]);
  
  useEffect((): void => {
    if (tags !== undefined) {
      const tagsStr = JSON.stringify(tags);
      const prevTagsStr = JSON.stringify(prevPropsRef.current.tags);
      if (tagsStr !== prevTagsStr) {
        prevPropsRef.current.tags = tags;
        setInternalTags(tags);
      }
    }
  }, [tags]);

  const open = openProp ?? internalOpen;

  function toggleOpen(): void {
    const next = !open;
    if (openProp === undefined) setInternalOpen(next);
    if (onToggleOpen) onToggleOpen(next);
  }
  // Notify parent when user changes values (not on initial mount or when syncing from props)
  useEffect((): void => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevValuesRef.current = {
        topTagline: internalTop,
        mainHeadline: internalMain,
        subHeadline: internalSub,
        tags: internalTags,
      };
      return;
    }

    // Check if the change came from props (compare current internal values with current props)
    const isFromProps =
      (topTagline !== undefined && internalTop === topTagline && prevValuesRef.current.topTagline !== topTagline) ||
      (mainHeadline !== undefined && internalMain === mainHeadline && prevValuesRef.current.mainHeadline !== mainHeadline) ||
      (subHeadline !== undefined && internalSub === subHeadline && prevValuesRef.current.subHeadline !== subHeadline) ||
      (tags !== undefined && JSON.stringify(internalTags) === JSON.stringify(tags) && JSON.stringify(prevValuesRef.current.tags) !== JSON.stringify(tags));

    if (isFromProps) {
      // Update prevValuesRef but don't call onChange
      prevValuesRef.current = {
        topTagline: internalTop,
        mainHeadline: internalMain,
        subHeadline: internalSub,
        tags: internalTags,
      };
      return;
    }

    // Check if values actually changed
    const hasChanged =
      prevValuesRef.current.topTagline !== internalTop ||
      prevValuesRef.current.mainHeadline !== internalMain ||
      prevValuesRef.current.subHeadline !== internalSub ||
      JSON.stringify(prevValuesRef.current.tags) !== JSON.stringify(internalTags);

    if (hasChanged && onChange) {
      prevValuesRef.current = {
        topTagline: internalTop,
        mainHeadline: internalMain,
        subHeadline: internalSub,
        tags: internalTags,
      };
      onChange({
        topTagline: internalTop,
        mainHeadline: internalMain,
        subHeadline: internalSub,
        tags: internalTags,
      });
    }
  }, [internalTop, internalMain, internalSub, internalTags, onChange, topTagline, mainHeadline, subHeadline, tags]);

  return (
    <div className="w-full p-4 bg-zinc-800 rounded-2xl flex flex-col justify-start items-start gap-6">
      <div className="self-stretch pb-4 border-b border-zinc-700 inline-flex justify-between items-center">
        <div className="text-neutral-50 text-xl font-medium leading-loose">
          Hero Section Management
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
              Top Tagline
            </label>
            <input
              className="self-stretch h-12 pl-4 pr-4 py-3 bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700 text-zinc-200 placeholder:text-zinc-400"
              value={internalTop}
              onChange={(e): void => setInternalTop(e.target.value)}
              placeholder="Enter a top tagline (e.g., For Expert Insights)"
            />
          </div>

          <div className="self-stretch flex flex-col justify-center items-start gap-3">
            <label className="text-neutral-50 text-sm font-medium">
              Main Headline
            </label>
            <input
              className="self-stretch h-12 pl-4 pr-4 py-3 bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700 text-zinc-200 placeholder:text-zinc-400"
              value={internalMain}
              onChange={(e): void => setInternalMain(e.target.value)}
              placeholder="Enter the main headline (e.g., Software Blogs)"
            />
          </div>

          <div className="self-stretch flex flex-col justify-center items-start gap-3">
            <label className="text-neutral-50 text-sm font-medium">
              Sub-Headline ( Body )
            </label>
            <textarea
              className="self-stretch h-24 pl-4 pr-4 py-3 bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700 text-zinc-200 placeholder:text-zinc-400"
              value={internalSub}
              onChange={(e): void => setInternalSub(e.target.value)}
              placeholder="Describe the section (e.g., In-depth reviews and comparisons of the latest tools...)"
            />
          </div>

          <TagChips
            tags={internalTags}
            onAdd={(tag): void => {
              const newTags = [...internalTags, tag];
              setInternalTags(newTags);
            }}
            onRemove={(tag): void => {
              const newTags = internalTags.filter((t) => t !== tag);
              setInternalTags(newTags);
            }}
          />
        </>
      )}
    </div>
  );
}
