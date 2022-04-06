import { createContext, useContext, useState } from "react";
import { useFilteredProposals } from "services/terra/admin/queriers";
import { ProposalStatus } from "services/terra/admin/types";
import ProposalCard from "./ProposalCard";
import Toolbar from "./Toolbar/Toolbar";

export default function Proposals() {
  const [proposalStatus, setProposalStatus] =
    useState<ProposalStatusOptions>("all");
  //TODO:add proposal type

  const { filteredProposals, isFilteredProposalsLoading } =
    useFilteredProposals(proposalStatus);

  function handleStatusChange(ev: React.ChangeEvent<HTMLSelectElement>) {
    setProposalStatus(ev.target.value as ProposalStatusOptions);
  }

  return (
    <div className="p-3 grid grid-rows-a1 bg-white/10 shadow-inner rounded-md">
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
        <p className="font-mono text-white place-self-center">
          {isFilteredProposalsLoading
            ? "loading proposals.."
            : "no proposals found"}
        </p>
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
