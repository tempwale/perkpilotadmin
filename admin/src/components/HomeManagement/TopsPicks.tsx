import { ChevronDown, Plus } from "lucide-react";
import {useEffect, useState, type ReactElement} from "react";
import DealsSelector from "./DealsSelector";
import PicksGrid from "./PicksGrid";

type Props = {
  topTagline?: string;
  mainHeadline?: string;
  selectedDeals?: string[];
  onChange?: (fields: {
    topTagline: string;
    mainHeadline: string;
    selectedDeals: string[];
  }) => void;
  open?: boolean;
  onToggleOpen?: (next: boolean) => void;
};

export default function TopPicks({
  topTagline,
  mainHeadline,
  selectedDeals,
  onChange,
  open: openProp,
  onToggleOpen,
}: Props): ReactElement{
  const [internalOpen, setInternalOpen] = useState(true);
  const [showSelector, setShowSelector] = useState(false);

  // fields internal state
  const [internalTop, setInternalTop] = useState(
    topTagline ?? "Top Picks"
  );
  const [internalMain, setInternalMain] = useState(
    mainHeadline ?? "Discover our top-rated software deals"
  );
  const [internalDeals, setInternalDeals] = useState<string[]>(
    selectedDeals ?? []
  );

  // sync prop -> internal when props change
  useEffect((): void => {
    if (topTagline !== undefined) setInternalTop(topTagline);
  }, [topTagline]);
  useEffect((): void => {
    if (mainHeadline !== undefined) setInternalMain(mainHeadline);
  }, [mainHeadline]);
  useEffect((): void => {
    if (selectedDeals !== undefined) setInternalDeals(selectedDeals);
  }, [selectedDeals]);

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
        selectedDeals: internalDeals,
      });
  }, [
    internalTop,
    internalMain,
    internalDeals,
    onChange,
  ]);

  return (
    <div className="w-full p-4 bg-zinc-800 rounded-2xl flex flex-col justify-start items-start gap-6">
      <div className="self-stretch pb-4 border-b border-zinc-700 inline-flex justify-between items-center">
        <div className="text-neutral-50 text-xl font-medium leading-loose">
          Top Picks Section
        </div>

        <button
          type="button"
          aria-expanded={open}
          onClick={toggleOpen}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-zinc-700/20 focus:outline-none focus:ring-2 focus:ring-[#7f57e2]"
          aria-label={open ? "Collapse top picks section" : "Expand top picks section"}
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

          <div className="self-stretch flex flex-col justify-center items-start gap-3">
            <label className="text-neutral-50 text-sm font-medium">Body</label>
            <input
              className="self-stretch h-12 pl-4 pr-4 py-3 bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700 text-zinc-200"
              value={internalMain}
              onChange={(e) => setInternalMain(e.target.value)}
            />
          </div>

          {/* Add Items Button */}
          <div className="w-full flex justify-between items-center">
            <label className="text-neutral-50 text-sm font-medium">
              Selected Deals ({internalDeals.length})
            </label>
            <button
              type="button"
              onClick={() => setShowSelector(true)}
              className="h-9 px-4 py-2 bg-linear-to-b from-[#501bd6] to-[#7f57e2] rounded-lg flex items-center gap-2 transition-transform duration-150 hover:scale-[1.02]"
            >
              <Plus className="w-4 h-4 text-white" />
              <span className="text-white text-sm">Manage Deals</span>
            </button>
          </div>

          {/* Original Card Grid UI */}
          <PicksGrid selectedDeals={internalDeals} />

          {/* Selection Modal (only shown when button clicked) */}
          {showSelector && (
            <DealsSelector
              selectedDeals={internalDeals}
              onSelectionChange={(deals) => {
                setInternalDeals(deals);
                setShowSelector(false);
              }}
              onClose={() => setShowSelector(false)}
            />
          )}
        </>
      )}
    </div>
  );
}
