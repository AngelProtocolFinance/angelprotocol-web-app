import { useMemo, useState } from "react";
import { PollStatus } from "types/services/terra/gov";
import { useGovPolls } from "services/terra/gov/queriers";
import PollCard from "./PollCard";
import Toolbar from "./Toolbar";

export type PollFilterOptions = PollStatus | "all";

export default function Polls() {
  const [pollFilter, setPollFilter] = useState<PollFilterOptions>("all");
  const { govPolls, isGovPollsLoading } = useGovPolls();

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
            {isGovPollsLoading ? "Loading polls.." : "no polls found"}
          </p>
        )}
      </div>
    </div>
  );
}
