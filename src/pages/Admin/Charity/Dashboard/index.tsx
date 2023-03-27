import { useAdminResources } from "pages/Admin/Guard";
import { useQueryContract } from "services/contract";
import SWRLoader from "components/SWRLoader";
import DonationsTable from "../DonationsTable";
import Balances from "../common/Balances";
import Table from "./Table";

export default function Dashboard() {
  const { cw3 } = useAdminResources();
  const queryState = useQueryContract("cw3.proposals", {
    cw3,
    limit: 5,
  });

  return (
    <div className="grid content-start mt-6">
      <h3 className="uppercase font-extrabold text-2xl mb-4">Balances</h3>
      <Balances />
      <h3 className="mt-10 mb-4 uppercase font-extrabold text-2xl">
        New Proposals
      </h3>
      <SWRLoader
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
      </SWRLoader>
      <DonationsTable classes="mt-10" />
    </div>
  );
}
