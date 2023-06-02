import { useParams } from "react-router-dom";
import { ProposalParams } from "pages/Admin/types";
import { useProposalDetailsQuery } from "services/juno/custom";
import QueryLoader from "components/QueryLoader";
import Seo from "components/Seo";
import { DetailLabel, Status } from "components/admin";
import { APP_NAME, DAPP_URL } from "constants/env";
import { adminRoutes } from "constants/routes";
import { useAdminResources } from "../Guard";
import PollAction from "./PollAction";
import Stats from "./Stats";
import Votes from "./Votes";

export default function Proposal() {
  const { multisig } = useAdminResources();
  const params = useParams<ProposalParams>();
  const queryState = useProposalDetailsQuery({
    id: params.id,
    multisig,
  });

  return (
    <div className="grid content-start w-full min-h-screen font-work">
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Getting proposal details",
          error: "Failed to get proposal details",
        }}
      >
        {(proposal) => (
          <div className="rounded p-4 border border-prim dark:bg-blue-d6 bg-white">
            <Seo
              title={`Proposal ${proposal.id} - ${APP_NAME}`}
              description={proposal.description.slice(0, 140)}
              name={proposal.title}
              url={`${DAPP_URL}/${adminRoutes.proposal}/${proposal.id}`}
            />
            <div className="flex justify-between flex-wrap">
              <p>ID : {proposal.id}</p>
              <Status status={proposal.status} />
            </div>
            <div className="mt-8 mb-6 flex justify-between items-center border-b-2 border-prim pb-2">
              <h4 className="text-lg">{proposal.title}</h4>
              <PollAction {...proposal} />
            </div>
            <DetailLabel>description</DetailLabel>
            <p className="mb-6 text-gray-d1 dark:text-gray">
              {proposal.description}
            </p>
            <h4 className="mt-6 uppercase text-lg py-2 border-b-2 border-prim">
              Votes
            </h4>
            <Stats {...proposal} />
            <Votes {...proposal} classes="mt-4" />
          </div>
        )}
      </QueryLoader>
    </div>
  );
}
