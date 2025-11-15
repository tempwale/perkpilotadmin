import { ChevronDown } from "lucide-react";
import { useState, type ReactElement} from "react";

type Props = {
  status?: "live" | "maintenance";
  onToggle?: (next: "live" | "maintenance") => void;
};

export default function ComparisionPageSettings({ status, onToggle }: Props): ReactElement{
  const [internal, setInternal] = useState<"live" | "maintenance">(
    status ?? "live"
  );

  // sync prop -> internal when prop changes
  // (keep simple; if more advanced sync is needed we can use useEffect)
  const current = status ?? internal;

  function handleToggle(): void {
    const next = current === "live" ? "maintenance" : "live";
    if (!status) setInternal(next);
    if (onToggle) onToggle(next);
  }

  const isLive = current === "live";

  const [open, setOpen] = useState(true);

  return (
    <div className="w-full p-4 bg-zinc-800 rounded-2xl flex flex-col justify-start items-start gap-6">
      <div className="self-stretch pb-4 border-b border-zinc-700 inline-flex justify-between items-center">
        <div className="text-neutral-50 text-xl font-medium leading-loose">
          Comparision Page Settings
        </div>

        <button
          type="button"
          aria-expanded={open}
          onClick={(): void => setOpen((v) => !v)}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-zinc-700/20 focus:outline-none focus:ring-2 focus:ring-[#7f57e2]"
          aria-label={open ? "Collapse settings" : "Expand settings"}
        >
          <ChevronDown
            className={`text-zinc-400 transition-transform duration-150 ${
              open ? "rotate-0" : "rotate-180"
            }`}
          />
        </button>
      </div>

      {/* Collapsible content */}
      {open && (
        <div className="self-stretch inline-flex justify-start items-center gap-3">
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
            <div className="text-neutral-50 text-sm font-medium">
              Comparision Page Status
            </div>
            <div className="text-zinc-400 text-base">
              Set the Comparision page to live or maintenance mode.
            </div>
          </div>

          <div className="text-neutral-50 text-sm font-medium">
            Maintenance Mode
          </div>

          <button
            type="button"
            onClick={handleToggle}
            aria-pressed={isLive}
            className="relative w-[53.33px] h-7 rounded-[66.67px] overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#7f57e2]"
          >
            <div
              className={`absolute inset-0 transition-colors duration-150 rounded-[66.67px] ${
                isLive
                  ? "bg-gradient-to-b from-[#501bd6] to-[#7f57e2]"
                  : "bg-zinc-700"
              }`}
            />
            <div
              className={`absolute top-[2.67px] w-[23.33px] h-[22.67px] bg-white rounded-[66.67px] transition-transform duration-150 ${
                isLive ? "left-[26.67px]" : "left-[4px]"
              }`}
            />
          </button>

          <div className="w-12 text-center text-neutral-50 text-sm font-medium">
            Live{" "}
          </div>
        </div>
      )}
    </div>
  );
}
