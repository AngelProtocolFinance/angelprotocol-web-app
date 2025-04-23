import { ChevronDownIcon } from "lucide-react";
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
          <div className="flex justify-between items-start">
            <div>
              <div className="text-2xl font-bold text-gray-d4">
                {currentEarning.amount}
              </div>
              <div className="text-sm text-gray mt-1">
                pays out {currentEarning.payoutDate}
                <br />- in {currentEarning.daysLeft} days
              </div>
            </div>
          </div>

          {currentEarning.hasPayoutMethod ? (
            <div className="mt-4">
              <div className="text-sm text-gray-l1">Payout method:</div>
              <div className="flex gap-x-2 items-center">
                <div className="text-sm text-gray-d4">
                  {currentEarning.payoutMethod}
                </div>
                <button className="text-xs btn-blue bg-blue px-3 py-1 rounded-md ">
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
            className="text-gray hover:text-gray-d1 justify-self-end"
          >
            <ChevronDownIcon
              className={`size-6 transform ${isHistoryExpanded ? "rotate-180" : ""} transition-transform duration-200`}
            />
          </button>
        </div>

        {/* Expanded Payout History - Conditional rendering based on isHistoryExpanded */}
        {isHistoryExpanded && (
          <div className="border-t border-gray-l4 px-6 py-4">
            <h3 className="text-lg font-medium text-gray-d4 mb-4">
              Payout history
            </h3>

            <div className="space-y-2">
              <div className="grid grid-cols-3 text-sm font-medium text-gray">
                <div>status</div>
                <div>date</div>
                <div>amount</div>
              </div>

              <div className="h-px bg-gray-l4 w-full"></div>

              {payoutHistory.length > 0 ? (
                payoutHistory.map((payout, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-3 text-sm text-gray-d4"
                  >
                    <div>{payout.status}</div>
                    <div>{payout.date}</div>
                    <div>{payout.amount}</div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray py-4">
                  No payout history yet
                </div>
              )}

              <div className="h-px bg-gray-l4 w-full"></div>

              <div className="text-center">
                <button className="text-sm text-gray hover:text-gray-d4">
                  view more
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
