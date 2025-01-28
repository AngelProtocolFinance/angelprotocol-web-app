import LoaderRing from "components/loader-ring";

export default function LoadMoreBtn({
  onLoadMore,
  disabled,
  isLoading,
}: {
  onLoadMore(): void;
  disabled: boolean;
  isLoading: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onLoadMore}
      disabled={disabled}
      className="flex items-center justify-center gap-3 uppercase text-sm font-bold rounded-b w-full h-12 hover:bg-blue-l5 dark:hover:bg-blue-d3 active:bg-blue-l4 dark:active:bg-blue-d2 disabled:bg-gray-l3 disabled:text-gray aria-disabled:bg-gray-l3 dark:aria-disabled:bg-gray-d1 dark:disabled:bg-gray-d1"
    >
      {isLoading ? (
        <>
          <LoaderRing thickness={10} classes="w-6" /> Loading...
        </>
      ) : (
        "Load More"
      )}
    </button>
  );
}
