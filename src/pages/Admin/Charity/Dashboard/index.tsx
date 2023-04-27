import { useAdminResources } from "pages/Admin/Guard";
import { useProfileQuery } from "services/aws/aws";
import { useProposalsQuery } from "services/juno/custom";
import QueryLoader from "components/QueryLoader";
import Seo from "components/Seo";
import { APP_NAME, DAPP_DOMAIN } from "constants/common";
import Balances from "../common/Balances";
import Table from "./Table";

export default function Dashboard() {
  const { id, endow_type, multisig } = useAdminResources<"charity">();
  const { data: profile } = useProfileQuery(id);
  const { data, ...rest } = useProposalsQuery({
    multisig,
    status: "pending",
    page: 1,
  });

  return (
    <div className="grid content-start mt-6">
      <Seo
        title={`${
          endow_type === "charity" ? "Endowment" : "AST"
        } Dashboard - ${APP_NAME}`}
        description={(profile?.overview ?? "").slice(0, 140)}
        name={profile?.name}
        image={profile?.logo}
        url={`${DAPP_DOMAIN}/admin/${id}`}
      />
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
    </div>
  );
}
