import { ProposalStatusOptions } from "slices/admin/types";
import { useGetter, useSetter } from "store/accessors";
import { changeSelectedStatus } from "slices/admin/proposals";

export default function StatusSelector() {
  const dispatch = useSetter();
  const { activeStatus } = useGetter((state) => state.admin.proposals);

  function handleStatusChange(ev: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(changeSelectedStatus(ev.target.value as ProposalStatusOptions));
  }

  return (
    <div className="flex gap-2 items-center border p-2 border-prim rounded dark:bg-blue-d4">
      <label htmlFor="status_selector" className="uppercase text-sm font-bold">
        status :
      </label>
      <select
        value={activeStatus}
        onChange={handleStatusChange}
        id="status_selector"
        className="bg-transparent text-sm focus:outline-none uppercase "
      >
        {Object.entries(pollStatusOptions).map(
          ([optionValue, optionDescription]) => (
            <option
              key={optionValue}
              value={optionValue}
              className="text-sm uppercase p-1"
            >
              {optionDescription}
            </option>
          )
        )}
      </select>
    </div>
  );
}

const pollStatusOptions: { [key in ProposalStatusOptions]: string } = {
  all: "all",
  executed: "executed",
  open: "open",
  passed: "passed",
  pending: "pending",
  rejected: "rejected",
};
