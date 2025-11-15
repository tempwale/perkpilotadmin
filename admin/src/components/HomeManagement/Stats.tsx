import { ChevronDown } from "lucide-react";
import {useState, type ReactElement} from "react";
import StatsGrid from "./StatsGrid";

export default function Stats(): ReactElement{
  const [open, setOpen] = useState(true);

  return (
    <div className="w-full p-4 bg-zinc-800 rounded-2xl flex flex-col justify-start items-start gap-6">
      <div className="self-stretch pb-4 border-b border-zinc-700 inline-flex justify-between items-center">
        <div className="text-neutral-50 text-xl font-medium leading-loose">
          Stats Section
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
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>

      {/* Collapsible content */}
      {open && (
        <div className="self-stretch inline-flex justify-start items-center gap-3">
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
            <StatsGrid />
          </div>
        </div>
      )}
    </div>
  );
}
