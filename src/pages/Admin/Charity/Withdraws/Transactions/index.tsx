import QueryLoader from "components/QueryLoader";
import MobileTable from "./MobileTable";
import Table from "./Table";
import useTransactions from "./useTransactions";

export default function Transactions() {
  const { data, hasMore, isError, isLoading, isLoadingNextPage, loadNextPage } =
    useTransactions();

  return (
    <QueryLoader
      queryState={{
        isLoading: isLoading || isLoadingNextPage,
        isError,
        data: data.Items,
      }}
      messages={{
        loading: "Loading transactions...",
        error: "Failed to get transactions",
        empty: "No transactions found",
      }}
    >
      {(logs) => (
        <>
          <MobileTable
            withdraws={logs}
            classes="grid md:hidden"
            hasMore={hasMore}
            onLoadMore={loadNextPage}
            disabled={isLoading || isLoadingNextPage || isError}
            isLoading={isLoadingNextPage}
          />
          <Table
            withdraws={logs}
            classes="hidden md:table"
            hasMore={hasMore}
            onLoadMore={loadNextPage}
            disabled={isLoading || isLoadingNextPage || isError}
            isLoading={isLoadingNextPage}
          />
        </>
      )}
    </QueryLoader>
  );
}
