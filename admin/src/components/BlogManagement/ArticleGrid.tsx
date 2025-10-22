import BlogsCard from "./BlogCard";

export default function ArticleGrid() {
  const cards = [1, 2, 3, 4];

  return (
    <div className="w-full p-4 bg-zinc-800 rounded-2xl flex flex-col justify-start items-start gap-6">
      <div className="self-stretch pb-4 border-b border-zinc-700 inline-flex justify-between items-center">
        <div className="text-neutral-50 text-xl font-medium leading-loose">
          Feature Blogs On Top
        </div>
        <div className="w-6 h-6 relative overflow-hidden">
          <div className="w-[11.15px] h-[6.55px] left-[6.43px] top-[8.73px] absolute bg-neutral-50" />
        </div>
      </div>

      <div className="self-stretch grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((c) => (
          <BlogsCard key={c} />
        ))}
      </div>
    </div>
  );
}
