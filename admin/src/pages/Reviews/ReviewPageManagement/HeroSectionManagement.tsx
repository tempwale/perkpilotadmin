import { ChevronDown } from "lucide-react";
import { useState, type ChangeEvent, type ReactElement } from "react";

interface HeroFields {
  topTagline: string;
  heading: string;
  subheading: string;
}

interface HeroSectionManagementProps extends Partial<HeroFields> {
  onChange?: (fields: HeroFields) => void;
}

export default function HeroSectionManagement({
  topTagline = "",
  heading = "",
  subheading = "",
  onChange,
}: HeroSectionManagementProps): ReactElement {
  const [open, setOpen] = useState(true);

  const handleChange = (
    field: keyof HeroFields,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const nextValue = event.target.value;
    onChange?.({
      topTagline,
      heading,
      subheading,
      [field]: nextValue,
    } as HeroFields);
  };

  return (
    <div className="flex flex-col items-start p-4 gap-6 w-[1084px] bg-[#27272A] rounded-2xl">
      <div className="box-border flex flex-row justify-between items-center pb-4 gap-2 w-[1052px] h-12 border-b border-[#3F3F46]">
        <div className="w-[270px] h-8 font-['Poppins'] font-medium text-xl leading-8 text-[#FAFAFA] flex-none order-0 grow-0">
          Hero Section Management
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
        <>
          <div className="flex flex-col justify-center items-start p-0 gap-3 w-[1052px] h-[89px]">
            <div className="w-[82px] h-[21px] font-['Poppins'] font-medium text-sm leading-[21px] text-[#FAFAFA]">
              Top Tagline
            </div>
            <div className="relative flex flex-row flex-wrap items-center px-6 py-3 gap-0 w-[1052px] h-14 bg-[#27272A] border border-[#3F3F46] rounded-xl">
              <input
                type="text"
                value={topTagline}
                onChange={(event): void => handleChange("topTagline", event)}
                placeholder="Enter a top tagline (e.g., For Expert Insights)"
                className="w-full h-6 font-['Poppins'] font-normal text-base leading-6 text-[#FAFAFA] bg-transparent outline-none placeholder:text-[#A1A1AA]"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center items-start p-0 gap-3 w-[1052px] h-[89px]">
            <div className="w-[101px] h-[21px] font-['Poppins'] font-medium text-sm leading-[21px] text-[#FAFAFA]">
              Main Headline
            </div>
            <div className="relative flex flex-row flex-wrap items-center px-6 py-3 gap-0 w-[1052px] h-14 bg-[#27272A] border border-[#3F3F46] rounded-xl">
              <input
                type="text"
                value={heading}
                onChange={(event): void => handleChange("heading", event)}
                placeholder="Enter the main headline (e.g., Software Reviews)"
                className="w-full h-6 font-['Poppins'] font-normal text-base leading-6 text-[#FAFAFA] bg-transparent outline-none placeholder:text-[#A1A1AA]"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center items-start p-0 gap-3 w-[1052px] h-[89px]">
            <div className="w-[158px] h-[21px] font-['Poppins'] font-medium text-sm leading-[21px] text-[#FAFAFA]">
              Sub-Headline ( Body )
            </div>
            <div className="relative flex flex-row flex-wrap items-center px-6 py-3 gap-0 w-[1052px] h-14 bg-[#27272A] border border-[#3F3F46] rounded-xl">
              <input
                type="text"
                value={subheading}
                onChange={(event): void => handleChange("subheading", event)}
                placeholder="Honest, in-depth reviews of the software tools that matter to your productivity and workflow."
                className="w-full h-6 font-['Plus_Jakarta_Sans'] font-normal text-base leading-6 text-[#FAFAFA] bg-transparent outline-none placeholder:text-[#A1A1AA]"
              />
            </div>
          </div>
        </>
      )}

  </div>
  );
}
