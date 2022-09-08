import { useAdminResources } from "pages/Admin/Guard";
import { useWithdrawLogsQuery } from "services/apes";
import { QueryLoader } from "components/admin";
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
      }}
      classes={{ container: "mt-6" }}
    >
      {(logs) =>
        logs.length > 0 ? (
          <Table withdraws={logs} />
        ) : (
          <div className="text-zinc-50/80">No transactions found</div>
        )
      }
    </QueryLoader>
  );
}
