import { adminRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import { Program } from "types/aws";
import Milestones from "./Milestones";
import ProgramInfo from "./ProgramInfo";

export default function Content(props: Program) {
  return (
    <div className="@container w-full max-w-4xl justify-self-center grid content-start gap-6 mt-6">
      <ProgramInfo {...props} />
      <Milestones programId={props.id} milestones={props.milestones} />

      <div className="flex gap-3 group-disabled:hidden">
        <Link
          to={"../" + adminRoutes.programs}
          className="px-6 btn-outline-filled text-sm"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
