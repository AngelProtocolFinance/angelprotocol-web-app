import usePaginatedTransactions from "services/axelar/usePaginatedTransactions";
import QueryLoader from "components/QueryLoader";
import Table from "./Table";

export default function Transactions() {
  const {
    items,
    hasMore,
    isError,
    isLoading,
    isLoadingNextPage,
    loadNextPage,
  } = usePaginatedTransactions();

  return (
    <QueryLoader
      queryState={{
        data: items,
        isLoading: isLoading,
        isError: isError,
      }}
      messages={{
        loading: "Loading recent transactions",
        empty: "No recent transactions",
        error: "Failed to get recent transactions",
      }}
    >
      {(transactions) => (
        <Table
          txs={transactions}
          onLoadMore={loadNextPage}
          hasMore={hasMore}
          disabled={isLoading || isLoadingNextPage || isError}
          isLoading={isLoading}
        />
      )}
    </QueryLoader>
  );
}
