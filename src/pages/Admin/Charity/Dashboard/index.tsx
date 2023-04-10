import { useAdminResources } from "pages/Admin/Guard";
import { useProposalsQuery } from "services/juno/custom";
import QueryLoader from "components/QueryLoader";
import DonationsTable from "../DonationsTable";
import Balances from "../common/Balances";
import Table from "./Table";

export default function Dashboard() {
  const { multisig } = useAdminResources();
  const { data, ...rest } = useProposalsQuery({
    multisig,
    status: "pending",
    page: 1,
  });

  return (
    <div className="grid content-start mt-6">
      <h3 className="uppercase font-extrabold text-2xl mb-4">Balances</h3>
      <Balances />
      <h3 className="mt-10 mb-4 uppercase font-extrabold text-2xl">
        New Proposals
      </h3>
      <QueryLoader
        queryState={{ ...rest, data: data?.proposals || [] }}
        messages={{
          loading: "Getting recent proposals..",
          error: "Failed to get proposals",
          empty: "No new open proposals",
        }}
        classes={{ container: "mt-2" }}
      >
        {(proposals) => <Table proposals={proposals} />}
      </QueryLoader>
      <DonationsTable classes="mt-10" />
    </div>
  );
}
