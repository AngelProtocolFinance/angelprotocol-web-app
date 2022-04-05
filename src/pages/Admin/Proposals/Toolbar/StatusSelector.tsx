import {
  ProposalStatusOptions,
  useGetProposalsState,
  useSetProposalsState,
} from "../Proposals";

export default function StatusSelector() {
  const { activeStatus } = useGetProposalsState();
  const { handleStatusChange } = useSetProposalsState();
  return (
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
