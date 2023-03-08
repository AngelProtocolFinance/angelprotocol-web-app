import { useAdminResources } from "pages/Admin/Guard";
import { useWithdrawLogsQuery } from "services/apes";
import QueryLoader from "components/QueryLoader";
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
    >
      {(logs) => (
        <>
          <List withdraws={logs} classes="grid md:hidden" />
          <Table withdraws={logs} classes="hidden md:table" />
        </>
      )}
    </QueryLoader>
  );
  // return <Table withdraws={logs} classes="hidden md:table" />;
}
