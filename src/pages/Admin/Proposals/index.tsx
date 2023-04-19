import { useState } from "react";
import { useProposalsQuery } from "services/juno/custom";
import Icon from "components/Icon";
import { useGetter } from "store/accessors";
import { useAdminResources } from "../Guard";
import ProposalCard from "./ProposalCard";
import Toolbar from "./Toolbar";

export default function Proposals() {
  const { multisig } = useAdminResources();
  const [pageNum, setPageNum] = useState(1);
  const { activeStatus } = useGetter((state) => state.admin.proposals);

  const {
    data: { proposals, next } = { proposals: [], next: undefined },
    error,
    isLoading,
  } = useProposalsQuery({
    multisig,
    page: pageNum,
    status: activeStatus,
  });

  console.log(error);

  function loadMoreProposals() {
    //loadMore button will be hidden if next page is undefined
    setPageNum((prev) => prev + 1);
  }

  return (
    <div className="grid content-start rounded font-work">
      <Toolbar classes="mb-6" />

      {(proposals.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 content-start">
          {proposals.map((proposal) => (
            <ProposalCard key={proposal.id} {...proposal} />
          ))}
        </div>
      )) || (
        <p className="place-self-start">
          {isLoading ? "loading proposals.." : "no proposals found"}
        </p>
      )}
      {next && (
        <button
          disabled={isLoading}
          className="mt-3 px-3 py-1 justify-self-center text-xs bg-blue disabled:bg-gray uppecase font-heading uppercase rounded-sm"
          onClick={loadMoreProposals}
        >
          {isLoading ? (
            <Icon type="Loading" className="animate-spin" size={18} />
          ) : (
            "more"
          )}
        </button>
      )}
    </div>
  );
}
