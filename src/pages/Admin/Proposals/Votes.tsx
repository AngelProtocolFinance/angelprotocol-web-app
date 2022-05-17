import { useState } from "react";
import { VOTES_PER_PAGE, useVoteList } from "services/terra/admin/queriers";
import Icon from "components/Icon";
import TableSection, { Cells } from "components/TableSection/TableSection";

export default function VotesTable(props: { proposalId: number }) {
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
          rowClass="border border-white/10 divide-x divide-white/10 hover:bg-angel-blue hover:bg-angel-blue/10 mb-6 sm:mb-0 flex flex-row flex-wrap sm:flex-no-wrap"
        >
          {votes.map((vote, i) => (
            <Cells
              type="td"
              cellClass="p-2 first:pl-0 last:pr-0 group pl-4 pt-8 sm:pt-2 pb-2 text-left relative w-full sm:flex-1"
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
