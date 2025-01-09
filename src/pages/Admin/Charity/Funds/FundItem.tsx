import type { FundItem as TFundItem } from "@better-giving/fundraiser";
import { Link, useFetcher } from "@remix-run/react";
import { FundCreator, FundStatus, statusFn } from "components/fundraiser";
import { Target, toTarget } from "components/target";
import { appRoutes } from "constants/routes";
import { useActionToast } from "hooks/use-action-toast";
import { LoaderCircle, Split } from "lucide-react";
import type { ActionData } from "types/action";
import { useAdminContext } from "../../../Admin/Context";
export const FundItem = (
  props: TFundItem & { endowId: number; isSelf: boolean }
) => {
  const fetcher = useFetcher<ActionData>({ key: `fund-${props.id}` });
  useActionToast(fetcher.data);
  const { user } = useAdminContext();
  const status = statusFn(
    props.expiration,
    props.active,
    props.donation_total_usd
  );
  const isEditor =
    user.funds.includes(props.id) || user.endowments.includes(props.endowId);

  return (
    <div className="grid grid-rows-subgrid row-span-6 content-start gap-y-0 items-center border border-gray-l4 p-3 rounded-lg">
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
        className="mt-4 font-semibold text-navy-l1 hover:text-blue-d1 font-heading"
      >
        {props.name}
      </Link>
      <div className="mb-2">
        <span className="text-xs mr-1">by</span>
        <FundCreator
          name={props.creator_name}
          id={props.creator_id}
          classes="text-sm inline"
        />
      </div>

      <Target
        classes="mt-4"
        progress={props.donation_total_usd}
        target={toTarget(props.target)}
      />

      <fetcher.Form
        method="POST"
        action="."
        className="flex items-center justify-between gap-x-6 mt-6"
      >
        {/** fund item won't show once NPO opted out of it: so no need to hide this button */}
        {!props.isSelf ? (
          <button
            name="fund_id"
            value={props.id}
            className="font-heading bg-amber enabled:hover:bg-amber-d1 text-white rounded-full px-4 py-2 text-xs flex items-center gap-1 disabled:bg-gray-l1"
            type="submit"
            disabled={fetcher.state !== "idle" || !props.active}
          >
            {fetcher.state === "submitting" ? (
              <LoaderCircle size={12} className="animate-spin" />
            ) : (
              <Split size={12} className="rotate-90" />
            )}

            <span>
              {fetcher.state === "submitting" ? "Opting out.." : "Opt out"}
            </span>
          </button>
        ) : (
          <div data-placeholder />
        )}
        <Link
          aria-disabled={!status.active}
          className={`btn btn-blue rounded-full text-xs px-6 py-2 ${
            isEditor ? "" : "invisible"
          }`}
          to={`${appRoutes.funds}/${props.id}/edit`}
        >
          Edit
        </Link>
      </fetcher.Form>
    </div>
  );
};
