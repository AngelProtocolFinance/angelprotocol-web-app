import { useParams } from "react-router-dom";
import {
  useProposal,
  useVoteList,
  VOTES_PER_PAGE,
} from "services/terra/admin/queriers";
import useProposalDetails, { ProposalDetails } from "./useProposalDetails";
import PollAction from "./PollAction";
import Status from "./Status";
import VoteStat from "./VoteStat";
import Icon from "components/Icons/Icons";
import DetailLabel from "./DetailLabel";
import ProposalContent from "./ProposalContent/ProposalContent";
import TableSection, { Cells } from "components/TableSection/TableSection";
import { useState } from "react";

export type ProposalIdParam = { id: string };
export default function Proposal() {
  const params = useParams<ProposalIdParam>();
  const proposalId = params.id;
  const { proposal } = useProposal(proposalId);
  const proposalDetails = useProposalDetails(proposal);

  return (
    <div className="grid content-start w-full min-h-screen">
      <div className="bg-white/10 text-white-grey/80 rounded-md shadow-inner p-4">
        <div className="flex justify-between font-bold flex-wrap">
          <p className="font-mono">ID: {proposal.id}</p>
          <Status status={proposal.status} />
        </div>
        <div className="mt-8 mb-6 flex justify-between items-center border-b-2 border-white/20 pb-2">
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
        <ProposalContent {...proposal} />
        <h4 className="font-bold text-lg text-white py-2 border-b-2 border-white/10">
          <span className="uppercase">Votes</span>
          <span className="font-mono font-normal text-green-100 tracking-wide text-xs">
            {" "}
            {+proposal.threshold.absolute_percentage.percentage * 100}% YES to
            pass
          </span>
        </h4>
        <Votes {...proposalDetails} />
        {proposalDetails.votes?.length > 0 && (
          <VotesTable proposalId={proposal.id} />
        )}
      </div>
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
        textColor="text-green-300/80"
      />
      <VoteStat
        title="no:"
        value={props.numNo}
        pct={props.pctNo}
        textColor="text-red-200/80"
      />
      <VoteStat
        title="remaining:"
        value={props.numNotYet}
        pct={props.pctNotYet}
        textColor="text-white/80"
      />
    </div>
  );
}

function VotesTable(props: { proposalId: number | number }) {
  const [pageNum, setPageNum] = useState(0);
  const { votes, isVoteListLoading } = useVoteList(props.proposalId, pageNum);

  const loadMoreVotes = () => setPageNum(pageNum + 1);
  const isLoadMoreShown = votes.length >= VOTES_PER_PAGE;
  return (
    <div>
      <table className="mt-4 w-full text-white/80 mt-4 overflow-hidden">
        <TableSection
          type="thead"
          rowClass="sm:visible invisible  sm:flex sm:inline-block mb-2"
        >
          <Cells
            type="th"
            cellClass="px-2 first:pl-0 last:pr-0 text-left flex-1"
          >
            <>Addresses</>
            <>Vote</>
          </Cells>
        </TableSection>
        <TableSection
          type="tbody"
          rowClass="border-white/10 hover:bg-angel-blue hover:bg-angel-blue/10 mb-6 sm:mb-0 flex flex-row flex-wrap sm:flex-no-wrap"
        >
          {votes.map((vote, i) => (
            <Cells
              type="td"
              cellClass="p-2 first:pl-0 last:pr-0 group pl-4 pt-8 sm:pt-2 pb-2 text-left relative w-full border-t border-l border-b border-r sm:flex-1"
              key={i}
            >
              <p className="pl-2">{vote.voter}</p>
              <p
                className={`pl-2 ${
                  vote.vote === "yes" ? "text-bright-green" : "text-failed-red"
                }`}
              >
                {vote.vote}
              </p>
            </Cells>
          ))}
        </TableSection>
      </table>
      {isLoadMoreShown && (
        <button
          disabled={isVoteListLoading}
          className="mt-3 px-3 py-1 justify-self-center text-white/80 text-xs bg-angel-blue/80 disabled:bg-grey-accent uppecase font-heading uppercase rounded-sm"
          onClick={loadMoreVotes}
        >
          {isVoteListLoading ? (
            <Icon type="Loading" className="animate-spin" size={18} />
          ) : (
            "more"
          )}
        </button>
      )}
    </div>
  );
}
