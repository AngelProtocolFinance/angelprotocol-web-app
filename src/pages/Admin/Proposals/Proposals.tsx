import { useState } from "react";
import {
  NUM_PROPOSALS_PER_PAGE,
  useFilteredProposals,
} from "services/juno/admin/queriers";
import Icon from "components/Icon";
import { useGetter } from "store/accessors";
import ProposalCard from "./ProposalCard";
import Toolbar from "./Toolbar/Toolbar";

export default function Proposals() {
  const [pageNum, setPageNum] = useState(1);

  const { activeGroup, activeStatus } = useGetter(
    (state) => state.admin.proposals
  );
  const { filteredProposals, isFilteredProposalsLoading } =
    useFilteredProposals(activeGroup, activeStatus, pageNum);

  function loadMoreProposals() {
    //no way to know when to stop
    //based on id: existing doesn't start in 1
    //based on max length, would need to query all to know how large the set is
    setPageNum((prev) => prev + 1);
  }

  const isLoadMoreShown =
    //don't show load more if num proposals doesn't even reach min
    filteredProposals.length >= NUM_PROPOSALS_PER_PAGE &&
    activeStatus === "all" &&
    activeGroup === "all";

  return (
    <div className="p-3 grid content-start bg-white/10 shadow-inner rounded-md">
      <Toolbar classes="mb-3" />

      {(filteredProposals.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 content-start">
          {filteredProposals.map((proposal) => (
            <ProposalCard key={proposal.id} {...proposal} />
          ))}
        </div>
      )) || (
        <p className="font-mono text-white place-self-start">
          {isFilteredProposalsLoading
            ? "loading proposals.."
            : "no proposals found"}
        </p>
      )}
      {isLoadMoreShown && (
        <button
          disabled={isFilteredProposalsLoading}
          className="mt-3 px-3 py-1 justify-self-center text-white/80 text-xs bg-angel-blue/80 disabled:bg-grey-accent uppecase font-heading uppercase rounded-sm"
          onClick={loadMoreProposals}
        >
          {isFilteredProposalsLoading ? (
            <Icon type="Loading" className="animate-spin" size={18} />
          ) : (
            "more"
          )}
        </button>
      )}
    </div>
  );
}
