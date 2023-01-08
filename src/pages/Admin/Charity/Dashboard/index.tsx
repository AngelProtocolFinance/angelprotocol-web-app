import { useAdminResources } from "pages/Admin/Guard";
import { useProposalsQuery } from "services/juno/cw3";
import { QueryLoader } from "components/admin";
import Balance from "./Balance";
import Donations from "./Donations";
import Table from "./Table";

export default function Dashboard() {
  const { cw3 } = useAdminResources();
  const queryState = useProposalsQuery({ contract: cw3, limit: 5 });

  return (
    <div className="grid content-start mt-6">
      <h3 className="uppercase font-extrabold text-2xl mb-1">Balances</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <Balance type="liquid" />
        <Balance type="locked" />
      </div>
      <h3 className="mt-10 mb-4 uppercase font-extrabold text-2xl">
        New Proposals
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
      <Donations classes="mt-10" />
    </div>
  );
}
