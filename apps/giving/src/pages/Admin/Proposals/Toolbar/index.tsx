import Icon from "@giving/components/Icon";
import { adminRoutes } from "@giving/constants/routes";
import { humanize } from "@giving/helpers";
import { Link } from "react-router-dom";
import { templates } from "pages/Admin/constants";
import { useLatestBlockQuery } from "services/juno";
import GroupSelector from "./GroupSelector";
import StatusSelector from "./StatusSelector";

export default function Toolbar({ classes = "" }: { classes?: string }) {
  const { data: block_height = "0" } = useLatestBlockQuery(null, {
    pollingInterval: 10_000, //ms
  });
  return (
    <div
      className={`flex items-center gap-3 ${classes} border-b-2 pb-3 border-prim`}
    >
      <StatusSelector />
      <GroupSelector />
      <p className="ml-auto text-sm flex items-center mr-2 text-gray-d1 dark:text-gray">
        <span className="font-heading uppercase text-3xs mr-2">
          current block{" "}
        </span>
        <Icon type="Blockchain" className="mr-1" />
        <span>{humanize(+block_height, 0)}</span>
      </p>

      <Link
        to={`../${adminRoutes.templates}/${templates.cw4_members}`}
        className="px-3 py-2 text-white bg-blue hover:bg-blue-l1 text-sm uppercase text-center rounded"
      >
        + Create a proposal
      </Link>
    </div>
  );
}
