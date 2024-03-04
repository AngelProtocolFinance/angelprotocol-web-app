import LoaderRing from "components/LoaderRing";

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
      className="flex items-center justify-center gap-3 uppercase text-sm font-bold rounded-b w-full h-12 hover:bg-orange-l5 dark:hover:bg-blue-d3 active:bg-orange-l4 dark:active:bg-blue-d2 disabled:bg-gray-l3 disabled:text-gray aria-disabled:bg-gray-l3 aria-disabled:dark:bg-navy disabled:dark:bg-navy"
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
