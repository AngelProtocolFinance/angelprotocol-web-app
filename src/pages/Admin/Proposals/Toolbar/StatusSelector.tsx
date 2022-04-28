import { ProposalStatusOptions } from "@types-page/admin";
import { useGetProposalsState, useSetProposalsState } from "../Proposals";

export default function StatusSelector() {
  const { activeStatus } = useGetProposalsState();
  const { handleStatusChange } = useSetProposalsState();
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

const pollStatusOptions: { [key in ProposalStatusOptions]: string } = {
  all: "all",
  executed: "executed",
  open: "open",
  passed: "passed",
  pending: "pending",
  rejected: "rejected",
};
