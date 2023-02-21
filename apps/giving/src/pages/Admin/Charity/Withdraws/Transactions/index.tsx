import QueryLoader from "@ap/components/query-loader";
import { useAdminResources } from "@ap/contexts/admin";
import { useWithdrawLogsQuery } from "@ap/services/apes";
import List from "./List";
import Table from "./Table";

export default function Transactions() {
  const { cw3 } = useAdminResources();
  const queryState = useWithdrawLogsQuery(cw3);
  return (
    <QueryLoader
      queryState={queryState}
      messages={{
        loading: "Loading transactions...",
        error: "Failed to get transactions",
        empty: "No transactions found",
      }}
      classes={{ container: "mt-2" }}
    >
      {(logs) => (
        <>
          <List withdraws={logs} classes="grid md:hidden mt-4" />
          <Table withdraws={logs} classes="hidden md:table" />
        </>
      )}
    </QueryLoader>
  );
  // return <Table withdraws={logs} classes="hidden md:table" />;
}
