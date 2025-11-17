import { useState, type ReactElement } from "react";
import BlogsHeader from "../../components/Blogs/Blogs/BlogsHeader";
import BlogsGrid from "../../components/Blogs/Blogs/BlogsGrid";
import type { SortOption } from "../../types/blog.types";

export default function BlogsPage(): ReactElement {
  const [sortBy, setSortBy] = useState<SortOption>("newly-published");

  const handleSortChange = (value: SortOption): void => {
    setSortBy(value);
  };

  return (
    <div
      data-layer="Container"
      className="box-border flex flex-col justify-start items-start p-6 gap-6 w-full max-w-[1116px] bg-[#18181B] border border-[#27272A] rounded-3xl"
    >
      <BlogsHeader onSortChange={handleSortChange} />
      <BlogsGrid sortBy={sortBy} />
    </div>
  );
}

