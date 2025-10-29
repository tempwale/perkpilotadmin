import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  topTagline?: string;
  mainHeadline?: string;
  subHeadline?: string;
  ctaText?: string;
  ctaLink?: string;
  // image upload removed — keep props minimal
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

export default function HeroSectionManagement({
  topTagline,
  mainHeadline,
  subHeadline,
  ctaText,
  ctaLink,

  tags,
  onChange,
  open: openProp,
  onToggleOpen,
}: Props) {
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
  // NOTE: image preview/upload helpers removed for now — keep the component focused

  // sync prop -> internal when props change
  useEffect(() => {
    if (topTagline !== undefined) setInternalTop(topTagline);
  }, [topTagline]);
  useEffect(() => {
    if (mainHeadline !== undefined) setInternalMain(mainHeadline);
  }, [mainHeadline]);
  useEffect(() => {
    if (subHeadline !== undefined) setInternalSub(subHeadline);
  }, [subHeadline]);
  useEffect(() => {
    if (tags !== undefined) setInternalTags(tags);
  }, [tags]);

  // sync CTA props when they change
  useEffect(() => {
    if (ctaText !== undefined) setInternalCtaText(ctaText);
  }, [ctaText]);

  useEffect(() => {
    if (ctaLink !== undefined) setInternalCtaLink(ctaLink);
  }, [ctaLink]);

  const open = openProp ?? internalOpen;

  function toggleOpen() {
    const next = !open;
    if (openProp === undefined) setInternalOpen(next);
    if (onToggleOpen) onToggleOpen(next);
  }

  // notify parent when fields change
  useEffect(() => {
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
  ]);

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
              className="self-stretch h-12 pl-4 pr-4 py-3 bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 text-zinc-200"
              value={internalTop}
              onChange={(e) => setInternalTop(e.target.value)}
            />
          </div>

          <div className="self-stretch flex flex-col justify-center items-start gap-3">
            <label className="text-neutral-50 text-sm font-medium">
              Main Headline
            </label>
            <input
              className="self-stretch h-12 pl-4 pr-4 py-3 bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 text-zinc-200"
              value={internalMain}
              onChange={(e) => setInternalMain(e.target.value)}
            />
          </div>

          <div className="self-stretch flex flex-col justify-center items-start gap-3">
            <label className="text-neutral-50 text-sm font-medium">
              Sub-Headline ( Body )
            </label>
            <textarea
              className="self-stretch h-24 pl-4 pr-4 py-3 bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 text-zinc-200"
              value={internalSub}
              onChange={(e) => setInternalSub(e.target.value)}
            />
          </div>
        </>
      )}
    </div>
  );
}
