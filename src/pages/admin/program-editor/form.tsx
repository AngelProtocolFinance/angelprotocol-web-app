import type { IProgram } from "@better-giving/endowment";
import { Milestones } from "./milestones";
import { ProgramInfo } from "./program-info";

export default function Content(props: IProgram) {
  return (
    <div className="@container w-full max-w-4xl grid content-start gap-6 mt-6">
      <ProgramInfo {...props} />
      <Milestones programId={props.id} milestones={props.milestones} />
    </div>
  );
}
