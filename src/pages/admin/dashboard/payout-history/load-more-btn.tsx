import LoaderRing from "components/loader-ring";

interface Props {
  onLoadMore(): void;
  disabled: boolean;
  isLoading: boolean;
}
export default function LoadMoreBtn(props: Props) {
  return (
    <button
      type="button"
      onClick={props.onLoadMore}
      disabled={props.disabled}
      className="flex items-center justify-center gap-3 uppercase text-sm font-bold rounded-b w-full h-12 hover:bg-blue-l5 dark:hover:bg-blue-d3 active:bg-blue-l4 dark:active:bg-blue-d2 disabled:bg-gray-l3 disabled:text-gray aria-disabled:bg-gray-l3 dark:aria-disabled:bg-gray-d1 dark:disabled:bg-gray-d1"
    >
      {props.isLoading ? (
        <>
          <LoaderRing thickness={10} classes="w-6" /> Loading...
        </>
      ) : (
        "Load More"
      )}
    </button>
  );
}
