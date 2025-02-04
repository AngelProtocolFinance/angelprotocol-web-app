import type { FundItem } from "@better-giving/fundraiser";
import { Link, NavLink, useLoaderData } from "@remix-run/react";
import { toText } from "components/rich-text";
import { Target, toTarget } from "components/target";
import { appRoutes } from "constants/routes";
import type { LoaderData } from "../api";

interface Props {
  classes?: string;
}
/** fundraisers that `endowId` is the only member of (not an index fund)  */
export function Fundraisers({ classes = "" }: Props) {
  const { funds } = useLoaderData<LoaderData>();

  if (funds.length === 0) return null;

  return (
    <div className={`${classes} p-8 border border-gray-l3 rounded-sm`}>
      <h3 className="mb-4 border-b border-gray-l3 pb-2">Fundraisers</h3>
      <div className="grid gap-y-8">
        {funds.map((f) => (
          <Fund key={f.id} {...f} />
        ))}
      </div>
    </div>
  );
}

function Fund(props: FundItem) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 py-2">
      <img
        src={props.logo}
        alt="fundraiser logo"
        width={40}
        height={40}
        className="row-span-2 shrink-0"
      />
      <Link
        className="hover:text-blue-d1"
        to={appRoutes.funds + `/${props.id}`}
      >
        {props.name}
      </Link>
      <p className="whitespace-pre-line text-gray text-sm">
        {toText(props.description)}
      </p>
      <Target
        classes="col-span-full mt-4"
        target={toTarget(props.target)}
        progress={props.donation_total_usd}
      />
      <NavLink
        to={`${appRoutes.donate_fund}/${props.id}`}
        className="btn btn-blue text-xs w-full col-span-full mt-4"
      >
        Donate
      </NavLink>
    </div>
  );
}
