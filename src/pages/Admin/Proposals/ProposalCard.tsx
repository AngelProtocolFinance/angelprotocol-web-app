import { Link } from "react-router-dom";
import { Proposal } from "types/server/contracts";
import { adminRoutes } from "constants/routes";
import Status from "../common/Status";

export default function ProposalCard(props: Proposal) {
  return (
    <Link
      to={`../${adminRoutes.proposal}/${props.id}`}
      className="bg-white/10 hover:bg-white/20 p-4 rounded-md shadow-inner grid"
    >
      <div className="font-mono font-bold flex justify-between items-center text-white-grey/80">
        <p className="text-sm">ID: {props.id}</p>
        <Status status={props.status} />
      </div>
      <span className="text-white pb-1 font-heading font-bold mt-2 border-b-2 border-white/40 line-clamp-2">
        {props.title}
      </span>

      <div className="flex gap-1 items-baseline text-white/80 mt-2 justify-self-end">
        <span className="inline-block font-heading uppercase text-xs text-right mr-1">
          ends
        </span>
        <span className="font-heading text-sm">
          {new Date(props.expires.at_time / 1e6).toLocaleString()}
        </span>
      </div>
    </Link>
  );
}
