// import { useAdminResources } from "pages/Admin/Guard";
// import { useWithdrawLogsQuery } from "services/apes";
import QueryLoader from "components/QueryLoader";
import MobileTable from "./MobileTable";
import Table from "./Table";
import useTransactions from "./useTransactions";

export default function Transactions() {
  // const { cw3 } = useAdminResources();
  // const queryState = useWithdrawLogsQuery(cw3);
  const { data, hasMore, isError, isLoading, isLoadingNextPage, loadNextPage } =
    useTransactions();

  return (
    <QueryLoader
      // queryState={queryState}
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
  // return <Table withdraws={logs} classes="hidden md:table" />;
}
