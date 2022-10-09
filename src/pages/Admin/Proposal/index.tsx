import { useParams } from "react-router-dom";
import { ProposalParams } from "pages/Admin/types";
import { Expiration } from "types/contracts";
import { useProposalDetailsQuery } from "services/juno/custom";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Icon from "components/Icon";
import { DetailLabel, QueryLoader, Status } from "components/admin";
import { useAdminResources } from "../Guard";
import ProposalContent from "./Content";
import PollAction from "./PollAction";
import Stats from "./Stats";
import Votes from "./Votes";

export default function Proposal() {
  const { wallet } = useGetWallet();
  const { cw3 } = useAdminResources();
  const params = useParams<ProposalParams>();
  const queryState = useProposalDetailsQuery(
    {
      id: params.id,
      cw3,
      voter: wallet?.address!,
    },
    { skip: !wallet }
  );

  return (
    <div className="grid content-start w-full min-h-screen text-white-grey/80">
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Getting proposal details",
          error: "Failed to get proposal details",
        }}
      >
        {(proposal) => (
          <div className="bg-white/10 rounded-md shadow-inner p-4">
            <div className="flex justify-between font-bold flex-wrap">
              <p className="font-mono">ID: {proposal.id}</p>
              <Status status={proposal.status} />
            </div>
            <div className="mt-8 mb-6 flex justify-between items-center border-b-2 border-white/20 pb-2">
              <h4 className="font-bold text-lg text-white">{proposal.title}</h4>
              <PollAction {...proposal} />
            </div>
            <DetailLabel>ends</DetailLabel>
            <Expiry {...proposal.expires} />
            <DetailLabel classes="mt-4">
              {proposal.proposal_type === "application"
                ? "Reason for rejection"
                : "Description"}
            </DetailLabel>
            <p className="mb-6">{proposal.description}</p>
            <ProposalContent {...proposal} />
            <h4 className="uppercase font-bold text-lg text-white py-2 border-b-2 border-white/10">
              Votes
            </h4>
            <Stats {...proposal} />
            {proposal.votes.length > 0 && <Votes proposalId={proposal.id} />}
          </div>
        )}
      </QueryLoader>
    </div>
  );
}

function Expiry(props: Expiration) {
  const isTime = "at_time" in props;
  return isTime ? (
    <span className="font-mono text-sm">
      {new Date(props.at_time / 1e6).toLocaleString()}
    </span>
  ) : (
    <div className="flex gap-1">
      <span className="font-mono">{props.at_height.toLocaleString()}</span>
      <Icon type="Blockchain" className="relative top-1" />
    </div>
  );
}
