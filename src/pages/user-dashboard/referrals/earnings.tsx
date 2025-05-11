import { endOfMonth, format, formatDistance } from "date-fns";
import { humanize } from "helpers/decimal";
import { useState } from "react";
import type { Earning, PendingEarnings } from "types/referrals";
import { EarningsHistory } from "./earnings-history/table";

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
  earnings: Earning[];
  pendings: PendingEarnings;
}

export function Earnings({ classes = "", earnings, pendings }: Props) {
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

          {currentEarning.hasPayoutMethod ? (
            <div className="mt-4">
              <p className="text-sm text-gray-l1">Payout method:</p>
              <div className="flex gap-x-2 items-center">
                <p className="text-sm text-gray-d4">
                  {currentEarning.payoutMethod}
                </p>
                <button className="text-xs btn-blue bg-blue px-3 py-1 rounded-md">
                  Change
                </button>
              </div>
            </div>
          ) : (
            <button className="mt-4 text-sm border border-gray-l3 rounded-md px-4 py-2 hover:bg-gray-l5 transition-colors">
              setup payout method
            </button>
          )}
          <EarningsHistory items={earnings} classes="mt-6" />
        </div>
      </div>
    </div>
  );
}
