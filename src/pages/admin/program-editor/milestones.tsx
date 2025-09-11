import type { IMilestone } from "@better-giving/endowment";
import { Info } from "components/status";
import { Plus } from "lucide-react";
import { useFetcher } from "react-router";
import Milestone from "./milestone";

type Props = {
  programId: string;
  milestones: IMilestone[];
};

export default function Milestones({ programId, milestones }: Props) {
  const fetcher = useFetcher();

  return (
    <div className="@container grid gap-6 p-4 @lg:p-6 border border-gray-l3 rounded-sm bg-white dark:bg-blue-d6">
      <div className="flex flex-col @md:flex-row items-center gap-3 justify-between">
        <h4 className="text-2xl">Milestones</h4>
        <input
          type="hidden"
          name="next-milestone-num"
          value={milestones.length + 1}
        />
        <button
          name="intent"
          value="add-milestone"
          disabled={fetcher.state !== "idle"}
          type="button"
          onClick={() =>
            fetcher.submit(
              {
                intent: "add-milestone",
                "next-milestone-num": milestones.length + 1,
              },
              { method: "POST", action: ".", encType: "application/json" }
            )
          }
          className="btn-outline btn text-sm w-full @md:w-52 py-2"
        >
          <Plus className="mr-2" size={16} />
          <span>
            {fetcher.state === "submitting" ? "Adding.." : "Add"} milestone
          </span>
        </button>
      </div>
      {milestones.length > 0 ? (
        <>
          <span className="text-sm text-gray dark:text-gray">
            Milestones will be publicly displayed in descending order by their
            date.
          </span>
          <div className="grid gap-6">
            {milestones.map((m) => (
              <Milestone {...m} key={m.id} programId={programId} />
            ))}
          </div>
        </>
      ) : (
        <Info classes="text-base">No milestones</Info>
      )}
    </div>
  );
}
