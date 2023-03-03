import QueryLoader from "components/QueryLoader";
import OpenRequestsInfo from "./OpenRequestsInfo";
import Transactions from "./Transactions";
import Withdrawer from "./Withdrawer";
import useGetWithdrawLogs from "./useGetWithdrawLogs";

export default function Withdraws() {
  const { data, hasMore, isError, isLoading, isLoadingNextPage, loadNextPage } =
    useGetWithdrawLogs();

  // isLoadingNextPage should not affect the whole QueryLoader
  const queryState = { isLoading, isError, data: data.Items };

  return (
    <div className="grid gap-8 justify-items-center">
      <QueryLoader
        queryState={queryState}
        messages={{}}
        filterFn={(item) => item.proposal_status === "open"}
      >
        {/** Will display the warning only if there are any open proposals */}
        {(_) => <OpenRequestsInfo />}
      </QueryLoader>

      <h2 className="text-center font-bold text-3xl -mb-2">Withdraw</h2>

      <Withdrawer />

      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Loading transactions...",
          error: "Failed to get transactions",
          empty: "No transactions found",
        }}
      >
        {(logs) => (
          <Transactions
            withdraws={logs}
            hasMore={hasMore}
            onLoadMore={loadNextPage}
            isLoading={isLoadingNextPage}
          />
        )}
      </QueryLoader>
    </div>
  );
}
