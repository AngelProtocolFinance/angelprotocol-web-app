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
        error: "Failed to get organisations",
        loading: "Getting organisations..",
        empty: "No organisations found",
      }}
      classes={{
        container: `${classes} dark:text-white`,
      }}
    >
      {(endowments) => (
        <div
          className={`${classes} w-full grid min-[600px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 content-start`}
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
