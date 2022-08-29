import { useParams } from "react-router-dom";
import { ProposalParams } from "pages/Admin/types";
import { Expiration } from "types/contracts";
import { useProposalDetailsQuery } from "services/juno/custom";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Icon from "components/Icon";
import { DetailLabel, Status } from "components/admin";
import { useAdminResources } from "../Guard";
import ProposalContent from "./Content";
import PollAction from "./PollAction";
import Stats from "./Stats";
import Votes from "./Votes";

export default function Proposal() {
  const { wallet } = useGetWallet();
  const { cw3 } = useAdminResources();
  const params = useParams<ProposalParams>();
  const {
    data: proposal,
    isLoading,
    isError,
  } = useProposalDetailsQuery(
    {
      id: params.id,
      cw3,
      voter: wallet?.address!,
    },
    { skip: !wallet }
  );

  if (isLoading) {
    return (
      <p className="text-white-grey flex gap-2">
        <Icon
          type="Loading"
          className="animate-spin relative top-1"
          size={18}
        />
        <span>Loading proposal..</span>
      </p>
    );
  }

  if (isError || !proposal) {
    return (
      <p className="text-rose-300 flex gap-1">
        <Icon type="Warning" className="relative top-0.5" size={18} />
        <span>Error getting proposal</span>
      </p>
    );
  }

  return (
    <div className="grid content-start w-full min-h-screen">
      <div className="bg-white/10 text-white-grey/80 rounded-md shadow-inner p-4">
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
        <DetailLabel classes="mt-4">description</DetailLabel>
        <p className="mb-6">{proposal.description}</p>
        <ProposalContent {...proposal} />
        <h4 className="uppercase font-bold text-lg text-white py-2 border-b-2 border-white/10">
          Votes
        </h4>
        <Stats {...proposal} />
        {proposal.votes.length > 0 && <Votes proposalId={proposal.id} />}
      </div>
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
