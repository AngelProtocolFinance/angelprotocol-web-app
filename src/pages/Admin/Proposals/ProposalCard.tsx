import { Link } from "react-router-dom";
import { Proposal } from "types/server/contracts";
import Icon from "components/Icon";
import toCurrency from "helpers/toCurrency";
import { adminRoutes } from "constants/routes";
import Status from "../common/Status";

export default function ProposalCard(props: Proposal) {
  return (
    <Link
      to={`../${adminRoutes.proposal}/${props.id}`}
      className="bg-white/10 hover:bg-white/20 p-4 rounded-md shadow-inner"
    >
      <div className="font-mono font-bold flex justify-between items-center text-white-grey/80">
        <p className="text-sm">ID: {props.id}</p>
        <Status status={props.status} />
      </div>
      <p className="text-white pb-1 font-heading font-bold mt-2 border-b-2 border-white/40 line-clamp-2">
        {props.title}
      </p>

      <div className="text-white/80">
        <p className="font-heading uppercase text-xs text-right mb-1">
          voting ends
        </p>
        <p className="flex items-center justify-end">
          <Icon type="Blockchain" className="mr-2" />
          <span className="font-heading text-sm">
            {toCurrency(props.expires.at_height, 0)}
          </span>
          <span className="font-heading uppercase text-2xs ml-1">blocks</span>
        </p>
      </div>
    </Link>
  );
}
