import { X } from "lucide-react";
import { useEffect, useState, type ReactElement } from "react";

type Props = {
  tags?: string[];
  onAdd?: (tag: string) => void;
  onRemove?: (tag: string) => void;
  placeholder?: string;
};

const suggestionTags = [
  "AI Tools",
  "No-code",
  "Marketing",
  "CRM Softwares",
  "AI Note Takers",
  "Recruiting",
  "Project Management",
  "Editors Choice",
  "Productivity",
  "Design Tools",
  "Development",
  "Analytics",
];

export default function TagChips({
  tags,
  onAdd,
  onRemove,
  placeholder,
}: Props): ReactElement{
  const [internalTags, setInternalTags] = useState<string[]>(
    tags ?? []
  );

  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  function addTag(tag?: string): void {
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

  function handleSuggestionClick(suggestion: string): void {
    if (!internalTags.includes(suggestion)) {
      addTag(suggestion);
      setInput("");
    }
  }

  useEffect((): void => {
    if (tags !== undefined) setInternalTags(tags);
  }, [tags]);

  const filteredSuggestions = suggestionTags.filter((tag) => {
    const isNotSelected = !internalTags.includes(tag);
    const matchesInput = input.trim() === "" || tag.toLowerCase().includes(input.toLowerCase());
    return isNotSelected && matchesInput;
  });

  const showSuggestions = (input.trim() !== "" || isFocused) && filteredSuggestions.length > 0;

  return (
    <div className="self-stretch flex flex-col justify-center items-start gap-3">
      <div className="text-neutral-50 text-sm font-medium">
        Popular Category Tags
      </div>

      <div className="self-stretch min-h-14 pl-6 pr-4 py-3 relative bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700">
        <div className="left-[16px] top-[16px] absolute flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            className="w-[22px] h-[22px]"
          >
            <path
              d="M10.5404 19.2499C15.3498 19.2499 19.2487 15.3511 19.2487 10.5416C19.2487 5.73211 15.3498 1.83325 10.5404 1.83325C5.73088 1.83325 1.83203 5.73211 1.83203 10.5416C1.83203 15.3511 5.73088 19.2499 10.5404 19.2499Z"
              stroke="#727A8F"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20.1654 20.1666L18.332 18.3333"
              stroke="#727A8F"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            className="bg-transparent text-neutral-50 placeholder:text-zinc-500 outline-none w-[260px]"
            value={input}
            onChange={(e): void => setInput(e.target.value)}
            onFocus={(): void => setIsFocused(true)}
            onBlur={(): void => {
              setTimeout(() => setIsFocused(false), 200);
            }}
            onKeyDown={(e): void => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
            placeholder={placeholder ?? "Search & Add Top Recommended Tags"}
            aria-label="Search and add tags"
          />
        </div>

        <div className="absolute left-[374.50px] top-[11px] flex items-center gap-4 flex-wrap">
          {internalTags.map((t) => (
            <div
              key={t}
              className="px-4 py-2 bg-linear-to-b from-[#501bd6] to-[#7f57e2] rounded-[100px] flex items-center gap-2.5"
            >
              <div className="text-neutral-50 text-xs font-medium">{t}</div>
              <div className="w-4 h-4 relative flex items-center justify-start">
                <button
                  type="button"
                  onClick={(): void => {
                    setInternalTags((s) => s.filter((x): boolean => x !== t));
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

      {showSuggestions && (
        <div className="self-stretch flex flex-col gap-2">
          <div className="text-zinc-400 text-xs font-medium">
            Suggestions:
          </div>
          <div className="self-stretch flex flex-wrap gap-2 items-center">
            {filteredSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={(): void => handleSuggestionClick(suggestion)}
                className="px-4 py-2 bg-[rgba(255,255,255,0.04)] border border-[rgba(235,239,245,0.12)] rounded-[100px] flex items-center justify-center hover:bg-[rgba(255,255,255,0.08)] transition-colors"
              >
                <span className="text-[#ebeff5] text-xs font-medium">{suggestion}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
