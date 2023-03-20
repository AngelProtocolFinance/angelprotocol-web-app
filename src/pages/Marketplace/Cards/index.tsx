import QueryLoader from "components/QueryLoader";
import Card from "./Card";
import useCards from "./useCards";

export default function Cards({ classes = "" }: { classes?: string }) {
  const { hasMore, isLoading, isLoadingNextPage, loadNextPage, data, isError } =
    useCards();
  return (
    <QueryLoader
      queryState={{
        data: data?.Items,
        isLoading: isLoading,
        isError,
      }}
      messages={{
        error: "Failed to get endowments",
        loading: "Getting endowments..",
        empty: "No endowments found",
      }}
      classes={{
        container: `${classes} dark:text-white`,
      }}
    >
      {(endowments) => (
        <div
          className={`${classes} w-full grid ${
            endowments.length < 3
              ? "grid-cols-[repeat(auto-fill,minmax(255px,1fr))]"
              : "grid-cols-[repeat(auto-fit,minmax(245px,1fr))]"
          } gap-4 content-start`}
        >
          {endowments.map((endow) => (
            <Card {...endow} key={endow.id} />
          ))}

          {hasMore && (
            <button
              className="col-span-full btn-orange rounded-md p-2 text-sm w-full mt-6"
              onClick={loadNextPage}
              disabled={isLoading || isLoadingNextPage}
            >
              Load more organizations
            </button>
          )}
        </div>
      )}
    </QueryLoader>
  );
}
