import { FormMilestone } from "../types";

export default function Milestone({ milestone_title }: FormMilestone) {
  return (
    <div className="py-3 px-4 rounded border border-prim text-center dark:bg-blue-d7">
      <span className="text-xl font-bold font-heading">{milestone_title}</span>
    </div>
  );
}
