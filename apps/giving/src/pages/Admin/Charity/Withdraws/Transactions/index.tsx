import QueryLoader from "@giving/components/QueryLoader";
import { useAdminResources } from "@giving/contexts/admin";
import { useWithdrawLogsQuery } from "@giving/services/apes";
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
