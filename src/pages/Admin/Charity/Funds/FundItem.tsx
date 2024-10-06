import type { FundItem as TFundItem } from "@better-giving/fundraiser";
import { appRoutes } from "constants/routes";
import { useAuthenticatedUser } from "contexts/Auth";
import { Link } from "react-router-dom";

export const FundItem = (props: TFundItem) => {
  const user = useAuthenticatedUser();
  const isActive = new Date().toISOString() <= props.expiration && props.active;
  const isEditor = user.funds.includes(props.id);

  return (
    <div className="grid grid-cols-subgrid col-span-5 items-center gap-3 rounded border border-gray-l4">
      <img src={props.logo} className="object-cover h-full w-10" />
      <span className="mr-4 p-1.5 font-medium text-navy-l1">{props.name}</span>
      <p
        className={`uppercase justify-self-start text-2xs rounded-full px-3 py-0.5 ${
          isActive ? "text-green bg-green-l4" : "text-red bg-red-l4"
        }`}
      >
        {isActive ? "active" : "closed"}
      </p>
      <Link
        aria-disabled={!isActive || !isEditor}
        className={`text-sm hover:text-blue-d1 text-blue uppercase p-3 aria-disabled:pointer-events-none aria-disabled:text-gray ${
          isEditor ? "" : "invisible"
        }`}
        to={`${appRoutes.funds}/${props.id}/edit`}
      >
        edit
      </Link>
      <Link
        className="text-sm hover:text-blue-d1 text-blue uppercase p-3"
        to={`${appRoutes.funds}/${props.id}`}
      >
        view
      </Link>
    </div>
  );
};
