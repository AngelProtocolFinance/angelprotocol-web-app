import { Link } from "react-router-dom";
import Icon from "components/Icon";
import QueryLoader from "components/QueryLoader";
import { adminRoutes } from "constants/routes";
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
      <QueryLoader queryState={queryState} messages={{}}>
        {(_) => (
          <div className="flex place-content-center py-2 gap-3 w-full dark:bg-blue-d6 border border-prim rounded">
            <Icon type="Info" className="w-6 h-6" />
            <span className="text-sm">
              There are open requests that need your attention.{" "}
              <Link
                to={adminRoutes.proposals}
                className="text-orange hover:text-orange-l2 active:text-orange-d1 underline"
              >
                Check them out now
              </Link>
            </span>
          </div>
        )}
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
            disabled={isLoading || isLoadingNextPage || isError}
            isLoading={isLoadingNextPage}
          />
        )}
      </QueryLoader>
    </div>
  );
}
