export const PaginationBtns = ({
  page,
  setPage,
  isLastPage,
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isLastPage: boolean; // true if no more products
}) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <button
        className="px-4 py-2 rounded bg-gray-200 disabled:bg-gray-100 disabled:text-gray-400"
        onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
        disabled={page === 0}
      >
        Previous
      </button>

      <span className="px-4 py-2 font-mono">Page {page + 1}</span>

      <button
        className="px-4 py-2 rounded bg-gray-200 disabled:bg-gray-100 disabled:text-gray-400"
        onClick={() => setPage((prev) => prev + 1)}
        disabled={isLastPage}
      >
        Next
      </button>
    </div>
  );
};
