import { Link } from "react-router-dom";
import { Expiration, Proposal } from "types/contracts";
import Icon from "components/Icon";
import { Status } from "components/admin";
import { adminRoutes } from "constants/routes";

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

      <Expiry {...props.expires} />
    </Link>
  );
}

function Expiry(props: Expiration) {
  const isTime = "at_time" in props;
  return (
    <div className="flex gap-1 items-baseline text-white/80 mt-2 justify-self-end">
      <span className="inline-block font-heading uppercase text-xs text-right mr-1">
        ends
      </span>
      {isTime ? (
        <span className="font-mono">
          {new Date(props.at_time / 1e6).toLocaleString()}
        </span>
      ) : (
        <>
          <span>{props.at_height.toLocaleString()}</span>
          <Icon type="Blockchain" className="relative top-0.5" />
        </>
      )}
    </div>
  );
}
