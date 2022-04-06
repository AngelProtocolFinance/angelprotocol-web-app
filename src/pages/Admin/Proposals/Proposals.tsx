import Icon from "components/Icons/Icons";
import { createContext, useContext, useState } from "react";
import {
  NUM_PROPOSALS_PER_PAGE,
  useFilteredProposals,
} from "services/terra/admin/queriers";
import { ProposalStatus } from "services/terra/admin/types";
import ProposalCard from "./ProposalCard";
import Toolbar from "./Toolbar/Toolbar";

export default function Proposals() {
  const [pageNum, setPageNum] = useState(1);

  const [proposalStatus, setProposalStatus] =
    useState<ProposalStatusOptions>("all");
  //TODO:add proposal type

  const { filteredProposals, isFilteredProposalsLoading } =
    useFilteredProposals(proposalStatus, pageNum);

  function handleStatusChange(ev: React.ChangeEvent<HTMLSelectElement>) {
    setProposalStatus(ev.target.value as ProposalStatusOptions);
  }

  function loadMoreProposals() {
    setPageNum((prev) => prev + 1);
  }

  return (
    <div className="p-3 grid content-start bg-white/10 shadow-inner rounded-md">
      <getContext.Provider value={{ activeStatus: proposalStatus }}>
        <setContext.Provider value={{ handleStatusChange }}>
          <Toolbar classes="mb-3" />
        </setContext.Provider>
      </getContext.Provider>
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
      {filteredProposals.length >= NUM_PROPOSALS_PER_PAGE &&
        proposalStatus === "all" && (
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

export type ProposalStatusOptions = ProposalStatus | "all";
interface State {
  activeStatus: ProposalStatusOptions;
}
interface Setters {
  handleStatusChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void;
}

const initialState: State = {
  activeStatus: "all",
};
const getContext = createContext<State>(initialState);
const setContext = createContext<Setters>({
  handleStatusChange: () => {},
  // setProposalType: () => void,
});
//only use this hook inside PhantomProvider
export const useGetProposalsState = () => useContext(getContext);
export const useSetProposalsState = () => useContext(setContext);
