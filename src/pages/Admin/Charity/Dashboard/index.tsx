import { useAdminResources } from "pages/Admin/Guard";
import { useProposalsQuery } from "services/juno/cw3";
import { QueryLoader } from "components/admin";
import Balance from "./Balance";
import Table from "./Table";

export default function Dashboard() {
  const { cw3 } = useAdminResources();
  const queryState = useProposalsQuery({ contract: cw3, limit: 5 });

  return (
    <div className="grid content-start">
      <h3>Balances</h3>
      <div>
        <Balance type="liquid" />
        <Balance type="locked" />
      </div>
      <h3 className="uppercase text-2xl text-zinc-50 font-bold mt-6">
        New proposals
      </h3>
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Getting recent proposals..",
          error: "Failed to get proposals",
          empty: "No new open proposals",
        }}
        classes={{ container: "mt-2" }}
        filterFn={(proposal) => proposal.status === "open"}
      >
        {(proposals) => <Table proposals={proposals} />}
      </QueryLoader>
    </div>
  );
}
