interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 3,
}: PaginationProps) {
  const getVisiblePages = () => {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= maxVisiblePages + 2) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate range around current page
      const start = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
      const end = Math.min(totalPages - 1, start + maxVisiblePages - 1);

      // Add ellipsis after first page if needed
      if (start > 2) {
        pages.push("ellipsis");
      }

      // Add pages around current page
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pages.push("ellipsis");
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative w-full mt-8">
      {visiblePages.map((page, index) => {
        if (page === "ellipsis") {
          return (
            <div
              key={`ellipsis-${index}`}
              className="bg-[rgba(255,255,255,0.08)] box-border content-stretch flex flex-col items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0"
            >
              <p className="font-bold leading-[1.4] not-italic relative shrink-0 text-[16px] text-neutral-50">
                ...
              </p>
            </div>
          );
        }

        const isCurrentPage = page === currentPage;

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`box-border content-stretch flex flex-col items-center justify-center px-[12px] py-[8px] relative rounded-[8px] shrink-0 transition-colors hover:opacity-80 ${
              isCurrentPage
                ? "bg-gradient-to-b from-[#501bd6] to-[#7f57e2]"
                : "bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.12)]"
            }`}
          >
            <p className="font-normal leading-none not-italic relative shrink-0 text-[16px] text-neutral-50">
              {page}
            </p>
          </button>
        );
      })}
    </div>
  );
}
