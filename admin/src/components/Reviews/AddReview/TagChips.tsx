import { X } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  tags?: string[];
  onAdd?: (tag: string) => void;
  onRemove?: (tag: string) => void;
  placeholder?: string;
};

export default function TagChips({
  tags,
  onAdd,
  onRemove,
  placeholder,
}: Props) {
  const [internalTags, setInternalTags] = useState<string[]>(
    tags ?? ["AI Tools", "No-code", "Marketing"]
  );

  const [input, setInput] = useState("");

  function addTag(tag?: string) {
    const t = (tag ?? input).trim();
    if (!t) return;
    if (internalTags.includes(t)) {
      setInput("");
      return;
    }
    setInternalTags((s) => [...s, t]);
    if (onAdd) onAdd(t);
    setInput("");
  }

  useEffect(() => {
    if (tags !== undefined) setInternalTags(tags);
  }, [tags]);

  // keep callbacks referenced to prevent unused-variable warnings
  useEffect(() => {
    void onAdd;
    void onRemove;
  }, [onAdd, onRemove]);

  return (
    <div className="self-stretch flex flex-col justify-center items-start gap-3">
      <div className="text-neutral-50 text-sm font-medium">
        Popular Integrations
      </div>

      <div className="self-stretch h-14 pl-6 pr-4 py-3 relative bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700">
        <div className="left-[16px] top-[16px] absolute flex items-center gap-3">
          <input
            className="bg-transparent text-zinc-400 placeholder:text-zinc-500 outline-none w-[260px]"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
            placeholder={placeholder ?? "Search & Add Top Recommended Tags"}
            aria-label="Search and add tags"
          />
        </div>

        <div className="absolute left-[374.50px] top-[11px] flex items-center gap-4">
          {internalTags.map((t) => (
            <div
              key={t}
              className="px-4 py-2 bg-gradient-to-b from-[#501bd6] to-[#7f57e2] rounded-[100px] flex items-center gap-2.5"
            >
              <div className="text-neutral-50 text-xs font-medium">{t}</div>
              <div className="w-4 h-4 relative flex items-center justify-left">
                <button
                  type="button"
                  onClick={() => {
                    // remove visually without changing layout
                    setInternalTags((s) => s.filter((x) => x !== t));
                    if (onRemove) onRemove(t);
                  }}
                  aria-label={`Remove ${t}`}
                  className=""
                >
                  <X size={16} className="text-neutral-50" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
