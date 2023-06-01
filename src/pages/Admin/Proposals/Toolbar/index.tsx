import { Link } from "react-router-dom";
import { templates } from "pages/Admin/constants";
import { adminRoutes } from "constants/routes";
import StatusSelector from "./StatusSelector";

export default function Toolbar({ classes = "" }: { classes?: string }) {
  return (
    <div
      className={`flex items-center gap-3 ${classes} border-b-2 pb-3 border-prim`}
    >
      <StatusSelector />

      <Link
        to={`../${adminRoutes.templates}/${templates["multisig.owners"]}`}
        className="px-3 py-2 text-white bg-blue hover:bg-blue-l1 text-sm uppercase text-center rounded"
      >
        + Create a proposal
      </Link>
    </div>
  );
}
