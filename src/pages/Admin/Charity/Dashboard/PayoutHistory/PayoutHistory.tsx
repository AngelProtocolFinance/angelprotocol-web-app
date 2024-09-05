import QueryLoader from "components/QueryLoader";
import Table from "./Table";
import usePagination from "./usePagination";

interface Props {
  endowId: number;
}
export function PayoutHistory(props: Props) {
  const {
    data,
    hasMore,
    isError,
    isLoading,
    isLoadingNextPage,
    loadNextPage,
    isFetching,
  } = usePagination(props.endowId);

  const isLoadingOrError = isLoading || isLoadingNextPage || isError;

  return (
    <div className="grid content-start gap-y-4 lg:gap-y-8 lg:gap-x-3 relative padded-container py-20 lg:pt-10">
      <h1 className="text-center text-3xl col-span-full max-lg:mb-4">
        Payout history
      </h1>

      <QueryLoader
        queryState={{
          data: data?.items,
          isLoading,
          isFetching,
          isError: isError,
        }}
        messages={{
          loading: "Loading applications...",
          error: "Failed to get applications",
          empty: "No applications found.",
        }}
      >
        {(records) => (
          <div className="grid col-span-full overflow-x-auto">
            <Table
              records={records}
              hasMore={hasMore}
              onLoadMore={loadNextPage}
              disabled={isLoadingOrError}
              isLoading={isLoadingNextPage}
            />
          </div>
        )}
      </QueryLoader>
    </div>
  );
}
