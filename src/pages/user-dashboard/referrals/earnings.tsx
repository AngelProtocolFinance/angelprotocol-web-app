import type { V2RecipientAccount } from "@better-giving/wise";
import { Link, Outlet } from "@remix-run/react";
import { endOfHour, format, formatDistance } from "date-fns";
import { humanize } from "helpers/decimal";
import { ArrowRightIcon, HistoryIcon, PencilIcon } from "lucide-react";
import type { PendingEarnings } from "types/referrals";
import { config } from "./config";
import {
  EarningsHistory,
  type Props as IEarningsHistory,
} from "./earnings-history/table";

interface Props {
  classes?: string;
  earnings: IEarningsHistory;
  pendings: PendingEarnings;
  payout?: V2RecipientAccount;
  payout_min?: number;
}

export function Earnings({
  classes = "",
  earnings,
  pendings,
  payout,
  payout_min = config.pay_min,
}: Props) {
  const now = new Date();
  const end = endOfHour(now);

  return (
    <div className={classes}>
      <h2 className="text-2xl font-semibold text-gray-d4 mb-4">My earnings</h2>

      <div className="bg-gray-l5 rounded-xl border border-gray-l4 overflow-hidden">
        <div className="p-6 @container">
          <div className="flex flex-wrap items-center justify-between gap-x-2">
            <div className="flex items-center gap-x-2 flex-wrap">
              <div className="text-2xl font-bold text-gray-d4">
                ${humanize(pendings.total, 3)}
              </div>
              <p className="text-sm text-gray mt-1">
                pays out {format(end, "PP")}- in {formatDistance(end, now)}.
              </p>
            </div>
            <Link
              to="payouts"
              className="group flex items-center @max-lg:mt-2 gap-x-1 text-blue hover:text-blue-d1"
            >
              <HistoryIcon
                size={20}
                className="group-hover:hidden @max-lg:hidden"
              />
              <ArrowRightIcon
                size={20}
                className=" @max-lg:hidden hidden @lg:group-hover:block group-active:translate-x-0.5"
              />
              <div className="text-xl font-bold text-gray-d">
                ${humanize(0, 3)}
              </div>
              <span className="text-sm mt-1">paid out</span>
            </Link>
          </div>
          {payout && (
            <div className="mt-4">
              <p className="text-sm text-gray">Payout threshold</p>
              <div className="flex gap-x-1 items-center">
                <p className="font-semibold text-amber-d1">
                  ${humanize(payout_min, 3)}
                </p>
                <Link
                  to={{ pathname: "payout-min", search: `?min=${payout_min}` }}
                  replace
                  preventScrollReset
                  className="text-xs"
                >
                  <PencilIcon size={12} />
                </Link>
              </div>
            </div>
          )}
          {payout ? (
            <div className="mt-4">
              <p className="text-sm text-gray">Payout method</p>
              <div className="flex gap-x-2 items-center">
                <p className="text-sm text-gray-d4">
                  {payout.longAccountSummary}
                </p>
                <Link
                  to="payout"
                  className="text-xs btn-blue px-3 py-1 rounded-md"
                >
                  Change
                </Link>
              </div>
            </div>
          ) : (
            <Link
              to="payout"
              className="mt-2 inline-block text-sm rounded-md px-4 py-2 btn-blue"
            >
              setup payout method
            </Link>
          )}

          <EarningsHistory {...earnings} classes="mt-6" />
        </div>
      </div>
      {/** payout min form */}
      <Outlet />
    </div>
  );
}
