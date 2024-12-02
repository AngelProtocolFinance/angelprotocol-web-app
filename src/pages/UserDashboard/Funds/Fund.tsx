import type { UserFund } from "@better-giving/user";
import { Target, toTarget } from "components/target";
import { appRoutes } from "constants/routes";
import { expires } from "helpers/fundraiser";
import { Link } from "react-router-dom";

export const Fund = (props: UserFund) => {
  const [expired, expiresIn] = expires(props.expiration);
  const isActive = !expired && props.active;
  return (
    <div className="grid grid-rows-subgrid row-span-4 content-start gap-y-0 items-center border border-gray-l4 p-3 rounded-lg">
      <div className="flex items-start justify-between">
        <img
          src={props.logo}
          width={50}
          className="object-cover aspect-square rounded-full"
        />
        <div className="grid justify-items-end">
          <span
            className={`ml-1 relative bottom-px uppercase text-2xs rounded-full px-3 py-0.5 ${
              isActive ? "text-green bg-green-l4" : "text-red bg-red-l4"
            }`}
          >
            {isActive ? "active" : "closed"}
          </span>
          {expiresIn && (
            <div className="text-xs text-navy-l4 mt-1">{expiresIn}</div>
          )}
        </div>
      </div>

      <Link
        to={`${appRoutes.funds}/${props.id}`}
        className="mt-4 font-semibold text-navy-l1 hover:text-blue-d1 font-heading"
      >
        {props.name}
      </Link>

      <Target
        classes="mt-4"
        progress={props.donation_total_usd}
        target={toTarget(props.target)}
      />

      <Link
        aria-disabled={!isActive}
        className="btn btn-blue rounded-full text-xs px-6 py-2 justify-self-end mt-6"
        to={`${appRoutes.funds}/${props.id}/edit`}
      >
        Edit
      </Link>
    </div>
  );
};

// <div className="grid grid-cols-subgrid col-span-5 items-center gap-3 rounded border border-gray-l4">
//   <img src={props.logo} className="object-cover h-full w-10" />
//   <span className="mr-4 p-1.5 font-medium text-navy-l1">{props.name}</span>
//   <p
//     className={`uppercase justify-self-start text-2xs rounded-full px-3 py-0.5 ${
//       props.active ? "text-green bg-green-l4" : "text-red bg-red-l4"
//     }`}
//   >
//     {props.active ? "active" : "closed"}
//   </p>
//   <Link
//     aria-disabled={!props.active}
//     className="text-sm hover:text-blue-d1 text-blue uppercase p-3 aria-disabled:pointer-events-none aria-disabled:text-gray"
//     to={`${appRoutes.funds}/${props.id}/edit`}
//   >
//     edit
//   </Link>
//   <Link
//     className="text-sm hover:text-blue-d1 text-blue uppercase p-3"
//     to={`${appRoutes.funds}/${props.id}`}
//   >
//     view
//   </Link>
// </div>
