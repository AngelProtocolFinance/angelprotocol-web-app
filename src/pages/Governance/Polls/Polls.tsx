import { useMemo, useState } from "react";
import { PollFilterOptions } from "../types";
import { useGovPollsQuery } from "services/juno/gov/gov";
import { queryObject } from "services/juno/queryContract/queryObjects";
import { contracts } from "constants/contracts";
import PollCard from "./PollCard";
import Toolbar from "./Toolbar";

export default function Polls() {
  const [pollFilter, setPollFilter] = useState<PollFilterOptions>("all");
  const { data: govPolls = [], isLoading } = useGovPollsQuery({
    address: contracts.gov,
    msg: queryObject.govPolls,
  });

  const filteredPolls = useMemo(() => {
    if (pollFilter === "all") {
      return govPolls;
    } else {
      return govPolls.filter((poll) => poll.status === pollFilter);
    }
  }, [govPolls, pollFilter]);

  return (
    <div className="mt-4 bg-white/5 p-3 rounded-md">
      <Toolbar pollFilter={pollFilter} setPollFilter={setPollFilter} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {(filteredPolls.length > 0 &&
          filteredPolls.map((poll) => (
            <PollCard key={poll.id} poll_id={poll.id} />
          ))) || (
          <p className="font-mono text-white-grey ml-3">
            {isLoading ? "Loading polls.." : "no polls found"}
          </p>
        )}
      </div>
    </div>
  );
}
