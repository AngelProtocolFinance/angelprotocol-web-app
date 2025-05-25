import type { IItem } from "@better-giving/banking-applications";
import { Link, Outlet } from "@remix-run/react";
import { Info } from "components/status";
import { endOfMonth, format, formatDistance } from "date-fns";
import { humanize } from "helpers/decimal";
import { ArrowRightIcon, HistoryIcon } from "lucide-react";
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
  payout?: IItem;
  payout_ltd: number;
  payout_min?: number;
}

export function Earnings({
  classes = "",
  earnings,
  pendings,
  payout,
  payout_min = config.pay_min,
  payout_ltd,
}: Props) {
  const now = new Date();
  const end = endOfMonth(now);

  return (
    <div className={classes}>
      <h2 className="text-2xl mb-4 capitalize">My earnings</h2>

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
              aria-disabled={payout_ltd === 0}
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
                ${humanize(payout_ltd, 3)}
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
              </div>
            </div>
          )}
          {payout ? (
            <div className="mt-4">
              <p className="text-sm text-gray">Default Payout Method</p>

              <Link to="../banking" className="text-blue hover:text-blue-d1">
                {payout.bankSummary}
              </Link>
            </div>
          ) : (
            <div className="flex items-center mt-4">
              <Info>No default payout method</Info>
              <Link
                to="../banking"
                className="text-sm text-blue hover:text-blue-d1"
              >
                Setup
              </Link>
            </div>
          )}

          <EarningsHistory {...earnings} classes="mt-6" />
        </div>
      </div>
      {/** payout min form */}
      <Outlet />
    </div>
  );
}
