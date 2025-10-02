import type { IFund } from "@better-giving/fundraiser";
import { FundStatus, status_fn } from "components/fundraiser";
import { Target, to_target } from "components/target";
import { app_routes } from "constants/routes";
import { Link } from "react-router";

export const Fund = (props: IFund) => {
  const status = status_fn(
    props.expiration,
    props.active,
    props.donation_total_usd
  );
  return (
    <div className="grid grid-rows-subgrid row-span-4 content-start gap-y-0 items-center border border-gray-l3 p-3 rounded-lg">
      <div className="flex items-start justify-between">
        <img
          src={props.logo}
          width={50}
          className="object-cover aspect-square rounded-full"
        />

        <FundStatus
          status={status}
          classes={{
            container: "px-3 py-1 rounded-full text-xs",
            active: "",
            inactive: "bg-red-l4 text-red",
            expired: "bg-gray-l4 text-gray",
            completed: "bg-green-l4 text-green",
          }}
        />
      </div>

      <Link
        to={`${app_routes.funds}/${props.id}`}
        className="mt-4 font-semibold text-gray hover:text-blue-d1 "
      >
        {props.name}
      </Link>

      <Target
        classes="mt-4"
        progress={props.donation_total_usd}
        target={to_target(props.target)}
      />

      <Link
        aria-disabled={!status.active}
        className="btn btn btn-blue rounded-full text-xs px-6 py-2 justify-self-end mt-6"
        to={`${app_routes.funds}/${props.id}/edit`}
      >
        Edit
      </Link>
    </div>
  );
};
