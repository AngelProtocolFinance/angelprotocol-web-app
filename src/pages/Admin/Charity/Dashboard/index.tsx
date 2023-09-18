import { IS_AST } from "constant/env";
import { useProposalsQuery } from "services/subgraph";
import QueryLoader from "components/QueryLoader";
import { useAdminContext } from "../../Context";
import Seo from "../Seo";
import Balances from "../common/Balances";
import Table from "./Table";

export default function Dashboard() {
  const { multisig, type, id } = useAdminContext<"charity">();
  const { data, ...rest } = useProposalsQuery({
    multisigId: type === "charity" ? `${id}` : multisig,
    status: "open",
    page: 1,
  });

  return (
    <div className="grid content-start mt-6">
      <Seo title={`${!IS_AST ? "Endowment" : "AST"} Dashboard`} />
      <h3 className="uppercase font-extrabold text-2xl mb-4">Balances</h3>
      <Balances />
      <h3 className="mt-10 mb-4 uppercase font-extrabold text-2xl">
        New Proposals
      </h3>
      <QueryLoader
        queryState={{ ...rest, data: data?.items || [] }}
        messages={{
          loading: "Getting recent proposals..",
          error: "Failed to get proposals",
          empty: "No new open proposals",
        }}
        classes={{ container: "mt-2" }}
      >
        {(proposals) => <Table proposals={proposals} />}
      </QueryLoader>
    </div>
  );
}
