import QueryLoader from "components/QueryLoader";
import Card from "./Card";
import useCards from "./useCards";

interface Props {
  classes?: string;
  search: string;
}

export default function Cards({ classes = "", search }: Props) {
  const {
    hasMore,
    isFetching,
    isLoading,
    isLoadingNextPage,
    loadNextPage,
    data,
    isError,
  } = useCards(search);
  return (
    <QueryLoader
      queryState={{
        data: data?.items || [],
        isLoading,
        isFetching,
        isError,
      }}
      messages={{
        error: "Failed to get fundraisers",
        loading: "Getting fundraisers..",
        empty: "No fundraiser found",
      }}
      classes={{
        container: `${classes} dark:text-white`,
      }}
    >
      {(funds) => (
        <div
          className={`${classes} w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 content-start`}
        >
          {funds.map((fund) => (
            <Card {...fund} key={fund.id} />
          ))}

          {hasMore && (
            <button
              className="col-span-full btn-blue rounded-md p-2 text-sm w-full mt-6"
              onClick={loadNextPage}
              disabled={isLoading || isLoadingNextPage}
            >
              Load more funds
            </button>
          )}
        </div>
      )}
    </QueryLoader>
  );
}
