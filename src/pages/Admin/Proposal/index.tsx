import { APP_NAME, DAPP_URL } from "constant/env";
import { adminRoutes } from "constant/routes";
import { useParams } from "react-router-dom";
import { ProposalParams } from "../types";
import { useProposalQuery } from "services/subgraph";
import QueryLoader from "components/QueryLoader";
import Seo from "components/Seo";
import { DetailLabel, Status, Tooltip } from "components/admin";
import { isTooltip, useAdminContext } from "../Context";
import Content from "./Content";
import PollAction from "./PollAction";
import Stats from "./Stats";
import Votes from "./Votes";

export default function Proposal() {
  const { txResource } = useAdminContext();
  const { id = "" } = useParams<ProposalParams>();
  const queryState = useProposalQuery({ recordId: id }, { skip: !id });

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
              title={`Proposal ${proposal.recordId} - ${APP_NAME}`}
              description={proposal.meta?.description?.slice(0, 140)}
              name={proposal.meta?.title}
              url={`${DAPP_URL}/${adminRoutes.proposal}/${proposal.recordId}`}
            />
            {isTooltip(txResource) && proposal.status !== "approved" ? (
              <Tooltip tooltip={txResource} classes="mb-4" />
            ) : null}
            <div className="flex justify-between flex-wrap">
              <p>ID : {proposal.transactionId}</p>
              <Status status={proposal.status} />
            </div>
            <div className="mt-8 mb-6 flex justify-between items-center border-b-2 border-prim pb-2">
              <h4 className="text-lg">
                {proposal.meta?.title ?? "Multisig transaction"}
              </h4>
              <PollAction {...proposal} />
            </div>
            <DetailLabel>description</DetailLabel>
            <p className="mb-6 text-gray-d1 dark:text-gray">
              {proposal.meta?.description ?? "No description provided"}
            </p>
            <Content {...proposal} />
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
