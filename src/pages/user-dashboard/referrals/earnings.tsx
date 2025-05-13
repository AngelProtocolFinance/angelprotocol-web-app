import type { V2RecipientAccount } from "@better-giving/wise";
import { Link, Outlet } from "@remix-run/react";
import { endOfMonth, format, formatDistance } from "date-fns";
import { humanize } from "helpers/decimal";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import type { PendingEarnings } from "types/referrals";
import {
  EarningsHistory,
  type Props as IEarningsHistory,
} from "./earnings-history/table";

// Define an interface for the earning data structure
interface EarningData {
  id: number;
  amount: string;
  payoutDate: string;
  daysLeft: number;
  hasPayoutMethod: boolean;
  payoutMethod: string | null;
}

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
  payout_min = 50,
}: Props) {
  const now = new Date();
  const end = endOfMonth(now);

  const [currentEarning] = useState<EarningData>({
    id: 1, // Example ID
    amount: "$100.00",
    payoutDate: "May 24, 2024",
    daysLeft: 2,
    hasPayoutMethod: true, // Example: Assume payout method is set up
    payoutMethod: "Account ending in 12341",
  });

  return (
    <div className={classes}>
      <h2 className="text-2xl font-semibold text-gray-d4 mb-4">My earnings</h2>

      <div
        key={currentEarning.id}
        className="bg-gray-l5 rounded-xl border border-gray-l4 overflow-hidden"
      >
        <div className="p-6">
          <div className="flex items-center gap-x-2">
            <div className="text-2xl font-bold text-gray-d4">
              ${humanize(pendings.total, 3)}
            </div>
            <p className="text-sm text-gray mt-1">
              pays out {format(end, "PP")}- in {formatDistance(end, now)}.
            </p>
          </div>

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
          {payout && (
            <div className="mt-4">
              <p className="text-sm text-gray">Payout threshold</p>
              <div className="flex gap-x-1 items-center">
                <p className="text-sm text-gray-d4">
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
          <EarningsHistory {...earnings} classes="mt-6" />
        </div>
      </div>
      {/** payout min form */}
      <Outlet />
    </div>
  );
}
