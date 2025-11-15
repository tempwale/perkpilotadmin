import { useMemo, useState, type ReactElement} from "react";
import { ChevronDown } from "lucide-react";
import ComparisionsCard from "./ComparisionCard";

export default function ArticleGrid(): ReactElement{
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(true);

  const posts = useMemo(
    () => [
      {
        id: "Comparision-1",
        title: "The Ultimate Remote Work Stack For 2025",
        description:
          "From just a startup idea to getting 1000s of customers every month and getting loved by globally users",
        tags: ["SaaS", "Founders"],
        views: 1240,
        date: "27/06/2025",
      },
      {
        id: "Comparision-2",
        title: "How AI Tools Are Changing Product Teams",
        description:
          "A practical guide to integrating AI into your product lifecycle.",
        tags: ["AI", "Product"],
        views: 890,
        date: "10/04/2025",
      },
      {
        id: "Comparision-3",
        title: "No-code vs. Low-code: Which to choose?",
        description:
          "Comparing developer velocity and where no-code fits best.",
        tags: ["No-code", "Engineering"],
        views: 560,
        date: "02/02/2025",
      },
      {
        id: "Comparision-4",
        title: "Growth Marketing Templates That Actually Work",
        description:
          "Playbooks and templates to help early-stage growth teams scale.",
        tags: ["Marketing", "Growth"],
        views: 430,
        date: "15/01/2025",
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p): boolean => {
      const hay = `${p.title} ${p.description} ${p.tags.join(
        " "
      )}`.toLowerCase();
      return hay.includes(q);
    });
  }, [posts, query]);

  return (
    <div className="w-full p-4 bg-zinc-800 rounded-2xl flex flex-col justify-start items-start gap-6">
      <div className="self-stretch pb-4 border-b border-zinc-700 inline-flex justify-between items-center">
        <div className="text-neutral-50 text-xl font-medium leading-loose">
          Feature Comparisions On Top
        </div>
        <button
          type="button"
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-zinc-700/20 focus:outline-none focus:ring-2 focus:ring-[#7f57e2]"
          aria-expanded={open}
          onClick={(): void => setOpen((v) => !v)}
          aria-label={open ? "Collapse article list" : "Expand article list"}
        >
          <ChevronDown
            className={`text-zinc-400 transition-transform duration-150 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>
      {open && (
        <div className="self-stretch relative bg-zinc-800 rounded-xl outline-1 -outline-offset-1 outline-zinc-700 px-3 py-2">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded flex items-center justify-center">
              {/* simple search circle visual (keeps original look) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
              >
                <path
                  d="M10.5404 19.2499C15.3498 19.2499 19.2487 15.3511 19.2487 10.5416C19.2487 5.73211 15.3498 1.83325 10.5404 1.83325C5.73088 1.83325 1.83203 5.73211 1.83203 10.5416C1.83203 15.3511 5.73088 19.2499 10.5404 19.2499Z"
                  stroke="#727A8F"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20.1654 20.1666L18.332 18.3333"
                  stroke="#727A8F"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>{" "}
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Comparisions"
              className="bg-transparent outline-none text-zinc-400 placeholder:text-zinc-500 w-full"
              aria-label="Search Comparisions"
            />
          </div>
        </div>
      )}

      {open && (
        <div className="self-stretch grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((p): ReactElement=> (
            <ComparisionsCard
              key={p.id}
              id={p.id}
              title={p.title}
              description={p.description}
              tags={p.tags}
            />
          ))}
        </div>
      )}
    </div>
  );
}
