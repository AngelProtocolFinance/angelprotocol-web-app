import { ProposalStatus } from "@types-server/contracts";
import { createContext, useContext, useState } from "react";
import {
  NUM_PROPOSALS_PER_PAGE,
  useFilteredProposals,
} from "services/terra/admin/queriers";
import Icon from "components/Icons/Icons";
import { ProposalGroup } from "../types";
import ProposalCard from "./ProposalCard";
import Toolbar from "./Toolbar/Toolbar";

export default function Proposals() {
  const [pageNum, setPageNum] = useState(1);

  const [proposalStatus, setProposalStatus] =
    useState<ProposalStatusOptions>("all");

  const [proposalGroup, setProposalGroup] =
    useState<ProposalGroupOptions>("all");

  const { filteredProposals, isFilteredProposalsLoading } =
    useFilteredProposals(proposalGroup, proposalStatus, pageNum);

  function handleStatusChange(ev: React.ChangeEvent<HTMLSelectElement>) {
    setProposalStatus(ev.target.value as ProposalStatusOptions);
  }

  function handleGroupChange(ev: React.ChangeEvent<HTMLSelectElement>) {
    setProposalGroup(ev.target.value as ProposalGroupOptions);
  }

  function loadMoreProposals() {
    //no way to know when to stop
    //based on id: existing doesn't start in 1
    //based on max length, would need to query all to know how large the set is
    setPageNum((prev) => prev + 1);
  }

  const isLoadMoreShown =
    //don't show load more if num proposals doesn't even reach min
    filteredProposals.length >= NUM_PROPOSALS_PER_PAGE &&
    proposalStatus === "all" &&
    proposalGroup === "all";

  return (
    <div className="p-3 grid content-start bg-white/10 shadow-inner rounded-md">
      <getContext.Provider
        value={{ activeStatus: proposalStatus, activeGroup: proposalGroup }}
      >
        <setContext.Provider value={{ handleStatusChange, handleGroupChange }}>
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

export type ProposalGroupOptions = ProposalGroup | "all";
export type ProposalStatusOptions = ProposalStatus | "all";
interface State {
  activeStatus: ProposalStatusOptions;
  activeGroup: ProposalGroupOptions;
}
interface Setters {
  handleStatusChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void;
  handleGroupChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void;
}

const initialState: State = {
  activeStatus: "all",
  activeGroup: "all",
};
const getContext = createContext<State>(initialState);
const setContext = createContext<Setters>({
  handleStatusChange: () => {},
  handleGroupChange: () => {},
});
//only use this hook inside PhantomProvider
export const useGetProposalsState = () => useContext(getContext);
export const useSetProposalsState = () => useContext(setContext);
