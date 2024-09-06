import QueryLoader from "components/QueryLoader";
import Table from "./Table";
import usePagination from "./usePagination";

interface Props {
  endowId: number;
  classes?: string;
}
export function PayoutHistory({ classes = "", endowId }: Props) {
  const {
    data,
    hasMore,
    isError,
    isLoading,
    isLoadingNextPage,
    loadNextPage,
    isFetching,
  } = usePagination(endowId);

  const isLoadingOrError = isLoading || isLoadingNextPage || isError;

  return (
    <div className={`${classes} grid content-start`}>
      <h4 className="text-lg mb-2">Allocation History</h4>

      <QueryLoader
        queryState={{
          data: data?.items,
          isLoading,
          isFetching,
          isError: isError,
        }}
        classes={{ container: classes }}
        messages={{
          loading: "Loading records...",
          error: "Failed to get records",
          empty: "No record found",
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
