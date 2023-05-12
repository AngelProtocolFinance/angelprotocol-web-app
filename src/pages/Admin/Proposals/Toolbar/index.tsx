import { Link } from "react-router-dom";
import { templates } from "pages/Admin/constants";
import { useLatestBlockQuery } from "services/juno";
import Icon from "components/Icon";
import { humanize } from "helpers";
import { adminRoutes } from "constants/routes";
import StatusSelector from "./StatusSelector";

export default function Toolbar({ classes = "" }: { classes?: string }) {
  const { data: block_height = "0" } = useLatestBlockQuery(10_000);
  return (
    <div
      className={`flex items-center gap-3 ${classes} border-b-2 pb-3 border-prim`}
    >
      <StatusSelector />
      <p className="ml-auto text-sm flex items-center mr-2 text-gray-d1 dark:text-gray">
        <span className="font-heading uppercase text-3xs mr-2">
          current block{" "}
        </span>
        <Icon type="Blockchain" className="mr-1" />
        <span>{humanize(+block_height, 0)}</span>
      </p>

      <Link
        to={`../${adminRoutes.templates}/${templates["multisig.owners"]}`}
        className="px-3 py-2 text-white bg-blue hover:bg-blue-l1 text-sm uppercase text-center rounded"
      >
        + Create a proposal
      </Link>
    </div>
  );
}
