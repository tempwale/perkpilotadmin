import { ChevronDown } from "lucide-react";
import {useEffect, useState, type ReactElement} from "react";
import UploadIconGrid from "../../HomeManagement/UploadIconGrid";

type Props = {
  topTagline?: string;
  mainHeadline?: string;
  subHeadline?: string;
  ctaText?: string;
  ctaLink?: string;
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

export default function DiscountedIcons({
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
          Discounted Icons Section
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
              className="self-stretch h-12 pl-4 pr-4 py-3 bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700 text-zinc-200"
              value={internalTop}
              onChange={(e) => setInternalTop(e.target.value)}
            />
          </div>

          <div className="self-stretch flex flex-col justify-center items-start gap-3">
            <label className="text-neutral-50 text-sm font-medium placeholder:text-zinc-500">
              Main Headline
            </label>
            <input
              className="self-stretch h-12 pl-4 pr-4 py-3 bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700 text-zinc-200"
              value={internalMain}
              onChange={(e) => setInternalMain(e.target.value)}
            />
          </div>

          <div className="self-stretch flex flex-col justify-center items-start gap-3">
            <label className="text-neutral-50 text-sm font-medium placeholder:text-zinc-500">
              Sub-Headline ( Body )
            </label>
            <textarea
              className="self-stretch h-24 pl-4 pr-4 py-3 bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700 text-zinc-200"
              value={internalSub}
              onChange={(e) => setInternalSub(e.target.value)}
            />
          </div>
          <div className="flex flex-row w-full justify-between gap-6">
            <div className="self-stretch w-full flex flex-col gap-3">
              <label className="text-neutral-50 text-sm font-medium ">
                Primary CTA Button Text
              </label>
              <input
                className="self-stretch h-12 pl-4 pr-4 py-3 bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700 text-zinc-200 placeholder:text-zinc-500"
                value={internalCtaText}
                onChange={(e) => setInternalCtaText(e.target.value)}
              />
            </div>
            <div className="self-stretch w-full flex flex-col justify-center items-start gap-3">
              <label className="text-neutral-50 text-sm font-medium ">
                Primary CTA Button Link
              </label>
              <input
                className="self-stretch h-12 pl-4 pr-4 py-3 bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700 text-zinc-200 placeholder:text-zinc-500"
                value={internalCtaLink}
                onChange={(e) => setInternalCtaLink(e.target.value)}
              />
            </div>
          </div>
          <div
            data-layer="The main button for users to proceed with the tool"
            className="TheMainButtonForUsersToProceedWithTheTool justify-start pl-2 text-neutral-50 text-[12px] font-medium "
          >
            The main button for users to proceed with the tool
          </div>
          <UploadIconGrid />
        </>
      )}
    </div>
  );
}
