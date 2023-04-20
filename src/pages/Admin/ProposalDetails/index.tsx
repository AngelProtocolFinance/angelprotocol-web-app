import { useProposalDetailsQuery } from "services/juno/custom";
import QueryLoader from "components/QueryLoader";
import { useAdminResources } from "../Guard";
import Content from "./Content";
import Stats from "./Stats";

export default function ProposalDetails({ id }: { id: number }) {
  const { multisig } = useAdminResources();
  const queryState = useProposalDetailsQuery({
    id: id.toString(),
    multisig,
  });
  return (
    <td colSpan={6} className="border border-prim  dark:bg-blue-d6 bg-white">
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Getting proposal details",
          error: "Failed to get proposal details",
        }}
      >
        {(proposal) => (
          <div className="rounded p-4">
            <Content {...proposal} />
            <Stats {...proposal} />
          </div>
        )}
      </QueryLoader>
    </td>
  );
}
