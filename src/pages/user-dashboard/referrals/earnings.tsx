import { DrawerIcon } from "components/icon";
import { endOfMonth, format, formatDistance } from "date-fns";
import { useState } from "react";

// Define an interface for the earning data structure
interface EarningData {
  id: number;
  amount: string;
  payoutDate: string;
  daysLeft: number;
  hasPayoutMethod: boolean;
  payoutMethod: string | null;
}

interface EarningsProps {
  classes?: string;
}

export function Earnings({ classes = "" }: EarningsProps) {
  const now = new Date();
  const end = endOfMonth(now);

  // Simplified state for expansion, managing only one card's history
  const [isHistoryExpanded, setIsHistoryExpanded] = useState<boolean>(false);

  // State to hold the current earning data (replace with actual data fetching logic)
  const [currentEarning] = useState<EarningData>({
    id: 1, // Example ID
    amount: "$100.00",
    payoutDate: "May 24, 2024",
    daysLeft: 2,
    hasPayoutMethod: true, // Example: Assume payout method is set up
    payoutMethod: "Account ending in 12341",
  });

  const payoutHistory: any[] = [
    // This would be populated with actual payout history data
    // { status: "completed", date: "April 24, 2024", amount: "$100.00" }
  ];

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
              {currentEarning.amount}
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
          <button
            onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
            className="text-gray hover:text-gray-d1 justify-self-end mt-8"
          >
            <DrawerIcon isOpen={isHistoryExpanded} />
          </button>
        </div>

        {/* Expanded Payout History - Conditional rendering based on isHistoryExpanded */}
        {isHistoryExpanded && (
          <div className="border-t-2 border-gray-l3 px-6 py-4">
            <h3 className="text-lg font-medium text-gray-d4 mb-4">
              Payout history
            </h3>

            <div className="overflow-x-auto">
              <table className="min-w-full [&_th,&_td]:p-2 [&_th,&_td]:text-left [&_tbody]:divide-y [&_tbody]:divide-gray-l2 divide-y divide-gray-l2">
                <thead>
                  <tr>
                    <th className="font-medium text-sm text-gray">status</th>
                    <th className="font-medium text-sm text-gray">date</th>
                    <th className="font-medium text-sm text-gray">amount</th>
                  </tr>
                </thead>
                <tbody>
                  {payoutHistory.length > 0 ? (
                    payoutHistory.map((payout, idx) => (
                      <tr key={idx} className="text-sm text-gray-d4">
                        <td>{payout.status}</td>
                        <td>{payout.date}</td>
                        <td>{payout.amount}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={3}
                        className="text-sm text-gray py-4 text-center"
                      >
                        No payout history yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="text-center mt-4">
              <button className="text-sm text-gray hover:text-gray-d4">
                view more
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
