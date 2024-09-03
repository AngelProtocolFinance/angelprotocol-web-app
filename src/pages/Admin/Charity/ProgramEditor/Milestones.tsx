import Icon from "components/Icon";
import { Info } from "components/Status";
import { useErrorContext } from "contexts/ErrorContext";
import { isEmpty } from "helpers";
import { useAdminContext } from "pages/Admin/Context";
import { useNewMilestoneMutation } from "services/aws/milestones";
import type { Milestone as TMilestone } from "types/aws";
import Milestone from "./Milestone";

type Props = {
  programId: string;
  milestones: TMilestone[];
};

export default function Milestones({ programId, milestones }: Props) {
  const { id } = useAdminContext();

  const { handleError } = useErrorContext();
  const [createMilestone, { isLoading }] = useNewMilestoneMutation();

  async function handleCreateMilestone() {
    try {
      await createMilestone({
        endowId: id,
        programId,
        title: `Milestone ${milestones.length + 1}`,
        description: "program description",
        date: new Date().toISOString(),
      }).unwrap();
    } catch (err) {
      handleError(err, { context: "creating milestone" });
    }
  }

  return (
    <div className="@container grid gap-6 p-4 @lg:p-6 border border-gray-l4 rounded bg-white dark:bg-blue-d6">
      <div className="flex flex-col @md:flex-row items-center gap-3 justify-between">
        <h4 className="text-2xl">Milestones</h4>
        <button
          disabled={isLoading}
          onClick={handleCreateMilestone}
          type="button"
          className="btn-outline-filled text-sm w-full @md:w-52 py-2"
        >
          <Icon type="Plus" className="mr-2" size={16} />
          <span>{isLoading ? "Adding.." : "Add"} milestone</span>
        </button>
      </div>
      {!isEmpty(milestones) ? (
        <>
          <span className="text-sm text-navy-l1 dark:text-navy-l2">
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
