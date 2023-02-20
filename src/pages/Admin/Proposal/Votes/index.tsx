import { useState } from "react";
import Icon from "components/Icon";
import TableSection, { Cells } from "components/TableSection";
import { VOTES_PER_PAGE, useVoteList } from "./useVotesList";

export default function Votes(props: { proposalId: number; classes?: string }) {
  const [pageNum, setPageNum] = useState(0);
  const { votes, isVoteListLoading } = useVoteList(props.proposalId, pageNum);

  const loadMoreVotes = () => setPageNum(pageNum + 1);
  const isLoadMoreShown = votes.length >= VOTES_PER_PAGE;
  return (
    <div>
      <table className={`${props.classes ?? ""} w-full overflow-hidden`}>
        <TableSection
          type="thead"
          rowClass="sm:visible invisible sm:flex sm:inline-block mb-2"
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
          rowClass="border border-prim divide-x divide-prim hover:bg-blue hover:bg-blue/10 mb-6 sm:mb-0 flex flex-row flex-wrap sm:flex-no-wrap"
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
                  vote.vote === "yes" ? "text-green-l1" : "text-red"
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
          className="mt-3 px-3 py-1 justify-self-center text-white/80 text-xs bg-blue/80 disabled:bg-gray uppecase font-heading uppercase rounded-sm"
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
