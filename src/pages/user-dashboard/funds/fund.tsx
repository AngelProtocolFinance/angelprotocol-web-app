import type { IFund } from "@better-giving/fundraiser";
import { FundStatus, statusFn } from "components/fundraiser";
import { Target, toTarget } from "components/target";
import { appRoutes } from "constants/routes";
import { Link } from "react-router";

export const Fund = (props: IFund) => {
  const status = statusFn(
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
        to={`${appRoutes.funds}/${props.id}`}
        className="mt-4 font-semibold text-gray hover:text-blue-d1 font-heading"
      >
        {props.name}
      </Link>

      <Target
        classes="mt-4"
        progress={props.donation_total_usd}
        target={toTarget(props.target)}
      />

      <Link
        aria-disabled={!status.active}
        className="btn btn btn-blue rounded-full text-xs px-6 py-2 justify-self-end mt-6"
        to={`${appRoutes.funds}/${props.id}/edit`}
      >
        Edit
      </Link>
    </div>
  );
};
