import { PropsWithChildren } from "react";
import { useParams } from "react-router-dom";
import { useProposal } from "services/terra/admin/queriers";
import { EmbeddedWasmMsg } from "contracts/types";
import useProposalDetails, { ProposalDetails } from "./useProposalDetails";
import PollAction from "./PollAction";
import Status from "./Status";
import VoteStat from "./VoteStat";
import Icon from "components/Icons/Icons";

export type ProposalIdParam = { id: string };
export default function Proposal() {
  const params = useParams<ProposalIdParam>();
  const proposalId = params.id;
  const { proposal } = useProposal(proposalId);
  const proposalDetails = useProposalDetails(proposal);

  return (
    <div className="grid content-start w-full min-h-screen">
      <div className="bg-white bg-opacity-10 text-white-grey text-opacity-80 rounded-md shadow-inner p-4">
        <div className="flex justify-between font-bold flex-wrap">
          <p className="font-mono">ID: {proposal.id}</p>
          <Status status={proposal.status} />
        </div>
        <div className="mt-8 mb-6 flex justify-between items-center border-b-2 border-opacity-20 pb-2">
          <h4 className="font-bold text-lg text-white">{proposal.title}</h4>
          <PollAction {...proposalDetails} />
        </div>
        <DetailLabel>end time</DetailLabel>
        <p className="flex items-center font-heading text-xs uppercase mt-1 mb-6">
          <span>block height </span>
          <Icon type="Blockchain" className="mx-2" />
          <span>{proposalDetails.blockHeight}</span>
        </p>
        <DetailLabel>description</DetailLabel>
        <p className="mb-6">{proposal.description}</p>

        <DetailLabel>raw messages</DetailLabel>
        {proposal.msgs.map((msg, i) => (
          <RawBlock key={i} {...msg} />
        ))}
        <h4 className="font-bold text-lg text-white py-2 border-b-2 border-opacity-10">
          <span className="uppercase">Votes</span>
          <span className="font-mono font-normal text-green-100 tracking-wide text-xs">
            {" "}
            {+proposal.threshold.absolute_percentage.percentage * 100}% YES to
            pass
          </span>
        </h4>
        <Votes {...proposalDetails} />
      </div>
    </div>
  );
}

function DetailLabel(props: PropsWithChildren<{}>) {
  return (
    <p className="text-xs font-bold text-white-grey uppercase font-heading">
      {props.children}
    </p>
  );
}

function RawBlock(props: EmbeddedWasmMsg) {
  return (
    <div className="bg-white bg-opacity-10 shadow-inner rounded-md p-2 my-2 text-sm">
      <code className="font-mono whitespace-pre">
        <span>to contract: {props.wasm.execute.contract_addr}</span>
        <br />
        {JSON.stringify(JSON.parse(atob(props.wasm.execute.msg)), null, 2)}
      </code>
    </div>
  );
}

function Votes(props: ProposalDetails) {
  return (
    <div className="flex justify-around text-lg p-4">
      <VoteStat
        title="yes:"
        value={props.numYes}
        pct={props.pctYes}
        textColor="text-green-300"
      />
      <VoteStat
        title="no:"
        value={props.numNo}
        pct={props.pctNo}
        textColor="text-red-200"
      />
      <VoteStat
        title="remaining:"
        value={props.numNotYet}
        pct={props.pctNotYet}
        textColor="text-white"
      />
    </div>
  );
}
