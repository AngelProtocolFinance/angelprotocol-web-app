import { Link } from "react-router-dom";
import { Transaction } from "types/contracts/multisig";
import { adminRoutes } from "constants/routes";
import { Status } from "../components";

export default function ProposalCard(props: Transaction) {
  return (
    <Link
      to={`../${adminRoutes.proposal}/${props.id}`}
      className="p-4 rounded grid border border-prim bg-orange-l6 dark:bg-blue-d6 hover:bg-orange-l5 hover:dark:bg-blue-d7"
    >
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm">ID: {props.id}</p>
        <Status status={props.status} />
      </div>
      <span className="pb-2 font-semibold mt-2 border-b-2 border-prim line-clamp-2">
        {props.title}
      </span>
    </Link>
  );
}
