import { X } from "lucide-react";
import { useState, useEffect, type ReactElement } from "react";

interface PopularTagsProps {
  tags: string[];
  onChange?: (next: string[]) => void;
}

export default function PopularTags({
  tags,
  onChange,
}: PopularTagsProps): ReactElement {
  const [internalTags, setInternalTags] = useState<string[]>(tags ?? []);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (tags !== undefined) setInternalTags(tags);
  }, [tags]);

  function addTag(tag?: string): void {
    const t = (tag ?? input).trim();
    if (!t) return;
    if (internalTags.includes(t)) {
      setInput("");
      return;
    }
    const newTags = [...internalTags, t];
    setInternalTags(newTags);
    onChange?.(newTags);
    setInput("");
  }

  function removeTag(tag: string): void {
    const newTags = internalTags.filter((x) => x !== tag);
    setInternalTags(newTags);
    onChange?.(newTags);
  }

  return (
    <div className="flex flex-col justify-center items-start p-0 gap-3 w-[1068px] h-[89px]">
      <div className="w-[93px] h-[21px] font-['Poppins'] font-medium text-sm leading-[21px] text-[#FAFAFA]">
        Popular Tags
      </div>
      <div className="relative flex flex-row flex-wrap items-center px-6 py-3 gap-0 w-[1068px] h-14 bg-[#27272A] border border-[#3F3F46] rounded-xl">
        <div className="absolute left-4 top-4 flex flex-row items-center p-0 gap-3 w-[315px] h-6">
          <input
            type="text"
            value={input}
            onChange={(e): void => setInput(e.target.value)}
            onKeyDown={(e): void => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
            placeholder="Search & Add Top Recommended Tags"
            className="w-[315px] h-6 font-['Poppins'] font-normal text-base leading-6 text-[#A1A1AA] bg-transparent outline-none placeholder:text-[#A1A1AA]"
            aria-label="Search and add tags"
          />
        </div>

        {internalTags.length > 0 && (
          <div className="absolute left-[374.5px] top-[11px] flex flex-row items-center p-0 gap-4 w-[528px] h-[34px]">
            {internalTags.map((t) => (
              <div
                key={t}
                className="flex flex-row justify-center items-center px-4 py-2 gap-2.5 h-[34px] bg-linear-to-b from-[#501BD6] to-[#7F57E2] rounded-[100px]"
              >
                <div className="font-['Poppins'] font-medium text-xs leading-[18px] flex items-center text-[#FAFAFA]">
                  {t}
                </div>
                <button
                  type="button"
                  onClick={(): void => removeTag(t)}
                  className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-white/20 focus:outline-none"
                  aria-label={`Remove ${t}`}
                >
                  <X className="w-4 h-4 text-[#FAFAFA]" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
