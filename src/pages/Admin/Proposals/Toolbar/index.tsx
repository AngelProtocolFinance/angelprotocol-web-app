import { Link } from "react-router-dom";
import { templates } from "pages/Admin/constants";
import { adminRoutes } from "constants/routes";
import StatusSelector from "./StatusSelector";

export default function Toolbar({ classes = "" }: { classes?: string }) {
  return (
    <div className={`flex items-center gap-3 ${classes} pb-3`}>
      <h1 className="text-2xl">Decision Center</h1>
      <StatusSelector classes="ml-auto" />

      <Link
        to={`../${adminRoutes.templates}/${templates["multisig.owners"]}`}
        className="text-xs uppercase text-center rounded text-blue dark:text-blue-l2"
      >
        + Create a proposal
      </Link>
    </div>
  );
}
