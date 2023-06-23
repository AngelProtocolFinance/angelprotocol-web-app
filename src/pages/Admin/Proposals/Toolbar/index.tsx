import { Link } from "react-router-dom";
import { adminRoutes } from "constants/routes";
import { templates } from "../../constants";
import StatusSelector from "./StatusSelector";

export default function Toolbar({ classes = "" }: { classes?: string }) {
  return (
    <div
      className={`grid justify-center @xl:flex items-center gap-3 ${classes}`}
    >
      <h1 className="text-2xl mb-3 @xl:mb-0 text-center @xl:text-left">
        Decision Center
      </h1>
      <StatusSelector classes="@xl:ml-auto" />

      <Link
        to={`../${adminRoutes.templates}/${templates["multisig.fund-transfer"]}`}
        className="mb-4 @xl:mb-0 text-xs uppercase text-center rounded text-blue dark:text-blue-l2"
      >
        + New decision
      </Link>
    </div>
  );
}
