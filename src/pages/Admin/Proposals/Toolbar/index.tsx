import { Link } from "react-router-dom";
import { templates } from "pages/Admin/constants";
import { useLatestBlockQuery } from "services/juno";
import Icon from "components/Icon";
import { humanize } from "helpers";
import { adminRoutes } from "constants/routes";
import GroupSelector from "./GroupSelector";
import StatusSelector from "./StatusSelector";

export default function Toolbar(props: { classes?: string }) {
  const { data: block_height = "0" } = useLatestBlockQuery(null, {
    pollingInterval: 10_000, //ms
  });
  return (
    <div className={`flex items-center gap-3 ${props.classes || ""}`}>
      <StatusSelector />
      <GroupSelector />
      <p className="ml-auto text-white/80 font-heading text-sm flex items-center mr-2">
        <span className="font-heading uppercase text-3xs mr-2">
          current block{" "}
        </span>
        <Icon type="Blockchain" className="mr-1" />
        <span>{humanize(+block_height, 0)}</span>
      </p>

      <Link
        to={`../${adminRoutes.templates}/${templates.cw4_members}`}
        className="px-3 pt-1.5 pb-1 text-white bg-blue hover:bg-blue-l1 font-heading text-sm uppercase text-center rounded-md"
      >
        + Create a proposal
      </Link>
    </div>
  );
}
