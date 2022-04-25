import React from "react";
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
  executed: "executed",
  expired: "expired",
  failed: "failed",
  in_progress: "in progress",
  passed: "passed",
  rejected: "rejected",
};
