import React from "react";
import { PollStatus } from "types/server/contracts";
import { PollFilterOptions } from "./Polls";

export default function PollSelector(props: {
  pollFilter: PollFilterOptions;
  setPollFilter: React.Dispatch<React.SetStateAction<PollFilterOptions>>;
}) {
  function handlePollFilterChange(ev: React.ChangeEvent<HTMLSelectElement>) {
    props.setPollFilter(ev.target.value as PollFilterOptions);
  }
  return (
    <select
      value={props.pollFilter}
      onChange={handlePollFilterChange}
      id="poll_filter"
      className="bg-white/10 text-white-grey p-2 text-sm rounded-md focus:outline-none uppercase "
    >
      {Object.entries(pollFilterOptions).map(
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

const pollFilterOptions: { [key in PollFilterOptions]: string } = {
  all: "all",
  [PollStatus.executed]: "executed",
  [PollStatus.executed]: "executed",
  [PollStatus.expired]: "expired",
  [PollStatus.failed]: "failed",
  [PollStatus.in_progress]: "in progress",
  [PollStatus.passed]: "passed",
  [PollStatus.rejected]: "rejected",
};
