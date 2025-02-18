interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const TablePagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: TablePaginationProps) => {
  return (
    <div className="mt-6 flex justify-between items-center">
      <div className="text-sm text-gray-d2">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="
            px-4 
            py-2 
            text-sm 
            bg-blue-l4 
            text-blue-d2 
            rounded 
            hover:bg-blue-l3 
            disabled:opacity-50 
            disabled:cursor-not-allowed 
            transition-colors
          "
        >
          Previous
        </button>
        <button
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
          disabled={currentPage >= totalPages}
          className="
            px-4 
            py-2 
            text-sm 
            bg-blue-l4 
            text-blue-d2 
            rounded 
            hover:bg-blue-l3 
            disabled:opacity-50 
            disabled:cursor-not-allowed 
            transition-colors
          "
        >
          Next
        </button>
      </div>
    </div>
  );
};
