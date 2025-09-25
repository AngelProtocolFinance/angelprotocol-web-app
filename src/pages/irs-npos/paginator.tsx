import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface Props {
  page: number;
  size: number;
  num_items: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Paginator({
  page,
  size,
  num_items,
  onPageChange,
  className = "",
}: Props) {
  // Calculate total pages
  const totalPages = Math.ceil(num_items / size);

  // Don't render pagination if there's only one page
  if (totalPages <= 1) {
    return null;
  }

  // Function to generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pageNumbers = [];

    // Always show first page
    pageNumbers.push(1);

    // Current page and surrounding pages
    const rangeStart = Math.max(2, page - 1);
    const rangeEnd = Math.min(totalPages - 1, page + 1);

    // Add ellipsis after first page if needed
    if (rangeStart > 2) {
      pageNumbers.push("ellipsis-start");
    }

    // Add pages in range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pageNumbers.push(i);
    }

    // Add ellipsis before last page if needed
    if (rangeEnd < totalPages - 1) {
      pageNumbers.push("ellipsis-end");
    }

    // Always show last page if more than one page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <nav
      className={`flex items-center justify-center space-x-1 ${className}`}
      aria-label="Pagination"
    >
      {/* Previous button */}
      <button
        className={`flex items-center justify-center size-8 rounded-md border border-gray-l1 ${
          page <= 1
            ? "bg-gray-l3 text-gray-l1 cursor-not-allowed"
            : "bg-white text-gray-d3 hover:bg-gray-l4 hover:text-gray-d4"
        }`}
        onClick={() => page > 1 && onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Page numbers */}
      <div className="flex items-center space-x-1">
        {getPageNumbers().map((pageNumber, index) => {
          if (
            pageNumber === "ellipsis-start" ||
            pageNumber === "ellipsis-end"
          ) {
            return (
              <div
                key={`${pageNumber}-${index}`}
                className="flex items-center justify-center px-1"
              >
                <MoreHorizontal size={16} className="text-gray-d1" />
              </div>
            );
          }

          return (
            <button
              key={pageNumber}
              className={`flex items-center justify-center p-1 min-w-8 rounded-md ${
                page === pageNumber
                  ? "bg-blue-d1 border border-blue-d1 text-white"
                  : "bg-white border border-gray-l1 text-gray-d2 hover:bg-gray-50 hover:text-gray-d4"
              }`}
              onClick={() => onPageChange(Number(pageNumber))}
              aria-label={`Page ${pageNumber}`}
              aria-current={page === pageNumber ? "page" : undefined}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      {/* Next button */}
      <button
        className={`flex items-center justify-center size-8 rounded-md border border-gray-l1 ${
          page >= totalPages
            ? "bg-gray-l3 text-gray-l1 cursor-not-allowed"
            : "bg-white text-gray-d2 hover:bg-gray-l4 hover:text-gray-d4"
        }`}
        onClick={() => page < totalPages && onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
      >
        <ChevronRight className="size-4" />
      </button>

      {/* Page info */}
      <div className="ml-2 text-sm text-gray-d1">
        Page {page} of {totalPages}
      </div>
    </nav>
  );
}
