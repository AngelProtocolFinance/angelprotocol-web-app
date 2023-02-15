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
    <div className="flex gap-2 items-center border p-2 border-prim rounded dark:bg-blue-d4">
      <label htmlFor="group_selector" className="uppercase text-sm font-bold">
        group :
      </label>
      <select
        value={activeGroup}
        onChange={handleGroupChange}
        id="group_selector"
        className="bg-transparent text-sm rounded focus:outline-none uppercase "
      >
        {Object.entries(groupOptions).map(
          ([optionValue, optionDescription]) => (
            <option
              key={optionValue}
              value={optionValue}
              className="text-sm text-gray-d2 uppercase p-1"
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
