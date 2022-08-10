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
    <div className="flex gap-2 items-center">
      <label
        htmlFor="status_selector"
        className="uppercase text-white text-sm font-heading font-bold"
      >
        status
      </label>
      <select
        value={activeStatus}
        onChange={handleStatusChange}
        id="status_selector"
        className="bg-white/10 text-white-grey p-2 text-sm rounded-md focus:outline-none uppercase "
      >
        {Object.entries(pollStatusOptions).map(
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

const pollStatusOptions: { [key in ProposalStatusOptions]: string } = {
  all: "all",
  executed: "executed",
  open: "open",
  passed: "passed",
  pending: "pending",
  rejected: "rejected",
};
