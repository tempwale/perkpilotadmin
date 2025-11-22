import { ChevronDown } from "lucide-react";
import { useState, type ReactElement } from "react";

interface ReviewPageSettingsProps {
  status?: "live" | "maintenance";
  onToggle?: (next: "live" | "maintenance") => void;
}

export default function ReviewPageSettings({
  status,
  onToggle,
}: ReviewPageSettingsProps): ReactElement {
  const [internalStatus, setInternalStatus] = useState<"live" | "maintenance">(
    status ?? "live"
  );
  const [open, setOpen] = useState(true);

  const current = status ?? internalStatus;
  const isLive = current === "live";

  const handleToggle = (): void => {
    const next = current === "live" ? "maintenance" : "live";
    if (!status) setInternalStatus(next);
    onToggle?.(next);
  };

  return (
    <div className="flex flex-col items-start p-4 gap-6 w-[1084px] h-[161px] bg-[#27272A] rounded-2xl">
      <div className="box-border flex flex-row justify-between items-center pb-4 gap-2 w-[1052px] h-12 border-b border-[#3F3F46]">
        <div className="w-[215px] h-8 font-['Poppins'] font-medium text-xl leading-8 text-[#FAFAFA] flex-none order-0 grow-0">
          Review Page Settings
        </div>
        <button
          type="button"
          aria-expanded={open}
          onClick={(): void => setOpen((prev) => !prev)}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-zinc-700/20 focus:outline-none focus:ring-2 focus:ring-[#7f57e2] flex-none order-1 grow-0"
          aria-label={open ? "Collapse settings" : "Expand settings"}
        >
          <ChevronDown
            className={`w-6 h-6 text-[#FAFAFA] transition-transform duration-150 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="flex flex-row items-center p-0 gap-3 w-[1052px] h-[57px]">
          <div className="flex flex-col items-start p-0 gap-3 w-[777.67px] h-[57px] flex-none order-0 grow">
            <div className="w-[138px] h-[21px] font-['Poppins'] font-medium text-sm leading-[21px] text-[#FAFAFA]">
              Review Page Status
            </div>
            <div className="w-[777.67px] h-6 font-['Poppins'] font-normal text-base leading-6 text-[#A1A1AA]">
              Set the deals page to live or maintenance mode.
            </div>
          </div>
          <div className="w-[137px] h-[21px] font-['Poppins'] font-medium text-sm leading-[21px] text-[#FAFAFA] flex-none order-1 grow-0">
            Maintenance Mode
          </div>
          <button
            type="button"
            onClick={handleToggle}
            aria-pressed={!isLive}
            className="relative w-[53.33px] h-7 rounded-[66.67px] overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#7f57e2] flex-none order-2 grow-0"
          >
            <div
              className={`absolute inset-0 rounded-[66.67px] transition-colors duration-150 ${
                isLive
                  ? "bg-linear-to-b from-[#501BD6] to-[#7F57E2]"
                  : "bg-zinc-700"
              }`}
            />
            <div
              className={`absolute w-[23.33px] h-[22.67px] bg-white rounded-[66.67px] transition-transform duration-150 top-[2.67px] ${
                isLive ? "left-[26.67px]" : "left-[4px]"
              }`}
            />
          </button>
          <div className="w-12 h-[21px] font-['Poppins'] font-medium text-sm leading-[21px] text-right text-[#FAFAFA] flex-none order-3 grow-0">
            Live
          </div>
        </div>
      )}
    </div>
  );
}
