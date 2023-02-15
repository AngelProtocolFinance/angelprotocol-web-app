import { Link } from "react-router-dom";
import { Expiration, Proposal } from "types/contracts";
import Icon from "components/Icon";
import { Status } from "components/admin";
import { adminRoutes } from "constants/routes";

export default function ProposalCard(props: Proposal) {
  return (
    <Link
      to={`../${adminRoutes.proposal.url}/${props.id}`}
      className="p-4 rounded grid border border-prim bg-orange-l6 dark:bg-blue-d6 hover:bg-orange-l5 hover:dark:bg-blue-d7"
    >
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm">ID: {props.id}</p>
        <Status status={props.status} />
      </div>
      <span className="pb-2 font-semibold mt-2 border-b-2 border-prim line-clamp-2">
        {props.title}
      </span>

      <Expiry {...props.expires} />
    </Link>
  );
}

function Expiry(props: Expiration) {
  const isTime = "at_time" in props;
  return (
    <div className="flex gap-1 items-baseline mt-2 justify-self-end">
      <span className="inline-block font-heading uppercase text-xs text-right mr-1">
        ends
      </span>
      {isTime ? (
        <span className="text-sm">
          {new Date(props.at_time / 1e6).toLocaleString()}
        </span>
      ) : (
        <>
          <span className="text-sm">{props.at_height.toLocaleString()}</span>
          <Icon type="Blockchain" className="relative top-0.5" />
        </>
      )}
    </div>
  );
}
