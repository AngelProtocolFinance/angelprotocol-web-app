import QueryLoader from "components/QueryLoader";
import OpenRequestsInfo from "./OpenRequestsInfo";
import Transactions from "./Transactions";
import Withdrawer from "./Withdrawer";
import useGetWithdrawLogs from "./useGetWithdrawLogs";

export default function Withdraws() {
  const { data, hasMore, isError, isLoading, isLoadingNextPage, loadNextPage } =
    useGetWithdrawLogs();

  // isLoadingNextPage should not affect the whole QueryLoader
  return (
    <div className="grid gap-8 justify-items-center">
      <OpenRequestsInfo />

      <h2 className="text-center font-bold text-3xl -mb-2">Withdraw</h2>

      <Withdrawer />

      <QueryLoader
        queryState={{ data: data?.Items, isLoading, isError }}
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
