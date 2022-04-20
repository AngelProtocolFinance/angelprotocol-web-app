import {
  ProposalGroupOptions,
  useGetProposalsState,
  useSetProposalsState,
} from "../Proposals";

export default function GroupSelector() {
  const { activeGroup } = useGetProposalsState();
  const { handleGroupChange } = useSetProposalsState();

  return (
    <div className="flex gap-2 items-center">
      <label
        htmlFor="group_selector"
        className="uppercase text-white text-sm font-heading font-bold"
      >
        group
      </label>
      <select
        value={activeGroup}
        onChange={handleGroupChange}
        id="group_selector"
        className="bg-white/10 text-white-grey p-2 text-sm rounded-md focus:outline-none uppercase "
      >
        {Object.entries(groupOptions).map(
          ([optionValue, optionDescription]) => (
            <option
              key={optionValue}
              value={optionValue}
              className={`text-sm text-angel-grey uppercase p-1`}
            >
              {optionDescription}
            </option>
          )
        )}
      </select>
    </div>
  );
}

const groupOptions: { [key in ProposalGroupOptions]: string } = {
  all: "all",
  indexfund: "index fund",
  "admin-group": "admin group",
  endowment: "endowment",
  registrar: "registrar",
};
