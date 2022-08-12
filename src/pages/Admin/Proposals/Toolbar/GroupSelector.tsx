import { ProposalGroupOptions } from "slices/admin/types";
import { useGetter, useSetter } from "store/accessors";
import { changeSelectedGroup } from "slices/admin/proposals";

export default function GroupSelector() {
  const dispatch = useSetter();
  const { activeGroup } = useGetter((state) => state.admin.proposals);

  function handleGroupChange(ev: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(changeSelectedGroup(ev.target.value as ProposalGroupOptions));
  }

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
              className="text-sm text-angel-grey uppercase p-1"
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
  if: "index fund",
  cw3: "admin",
  cw4: "admin group",
  acc: "endowment",
  reg: "registrar",
};
