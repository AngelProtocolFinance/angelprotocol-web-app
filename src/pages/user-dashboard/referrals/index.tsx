import Copier from "components/copier";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

// Define an interface for the earning data structure
interface EarningData {
  id: number; // Keep id if needed for other logic, or remove if truly redundant
  amount: string;
  payoutDate: string;
  daysLeft: number;
  hasPayoutMethod: boolean;
  payoutMethod: string | null;
}

export default function Referrals() {
  // Simplified state for expansion, managing only one card's history
  const [isHistoryExpanded, setIsHistoryExpanded] = useState<boolean>(true); // Default to expanded or false as needed

  // State to hold the current earning data (replace with actual data fetching logic)
  const [currentEarning, setCurrentEarning] = useState<EarningData>({
    id: 1, // Example ID
    amount: "$100.00",
    payoutDate: "May 24, 2024",
    daysLeft: 2,
    hasPayoutMethod: true, // Example: Assume payout method is set up
    payoutMethod: "Account ending in 12341",
  });

  const nonprofits = [
    { id: 1, name: "NPO1", earnings: "$10.00", status: "ends in 2 years" },
    { id: 2, name: "NPO2", earnings: "$10.00", status: "ended" },
    { id: 3, name: "NPO3", earnings: "$9.00", status: "ended" },
  ];

  const payoutHistory: any[] = [
    // This would be populated with actual payout history data
    // { status: "completed", date: "April 24, 2024", amount: "$100.00" }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl">
      {/* My Referrals Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-d4 mb-4">
          My referrals
        </h2>
        <div className="bg-gray-l5 p-6 rounded-xl border border-gray-l4">
          <div className="mb-4">
            <div className="text-sm font-medium text-gray-l1 mb-1">
              REFERRAL ID
            </div>
            <div className="flex items-center">
              <div className="text-xl font-semibold mr-2">XYZ-1234</div>
              <Copier
                text="XYZ-1234"
                classes={{
                  container: "text-gray hover:text-gray-d1",
                  icon: "size-5",
                }}
                size={20}
              />
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-gray-l1 mb-1">
              REFERRAL LINK
            </div>
            <div className="flex items-center">
              <div className="text-gray-d4 truncate max-w-xs">
                https://better.giving...
              </div>
              <Copier
                text="https://better.giving.com/ref/XYZ-1234"
                classes={{
                  container: "text-gray hover:text-gray-d1 ml-2",
                  icon: "size-5",
                }}
                size={20}
              />
            </div>
          </div>
        </div>
      </div>

      {/* My Earnings Section - Refactored */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-d4 mb-4">
          My earnings
        </h2>

        {/* Removed grid layout, now rendering a single card */}
        <div
          key={currentEarning.id} // Use key if needed, e.g., if currentEarning changes identity
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
              <button
                onClick={() => setIsHistoryExpanded(!isHistoryExpanded)} // Toggle expansion state
                className="text-gray hover:text-gray-d1"
              >
                <ChevronDownIcon
                  className={`size-6 transform ${isHistoryExpanded ? "rotate-180" : ""} transition-transform duration-200`}
                />
              </button>
            </div>

            {currentEarning.hasPayoutMethod ? (
              <div className="mt-4">
                <div className="text-sm text-gray-l1">Payout method:</div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-d4">
                    {currentEarning.payoutMethod}
                  </div>
                  <button className="text-sm bg-blue text-white px-3 py-1 rounded-md hover:bg-blue-d1">
                    change
                  </button>
                </div>
              </div>
            ) : (
              <button className="mt-4 text-sm border border-gray-l3 rounded-md px-4 py-2 hover:bg-gray-l5 transition-colors">
                setup payout method
              </button>
            )}
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

      {/* Onboarded Nonprofits Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-d4 mb-4">
          Onboarded Nonprofits
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-l4">
                <th className="py-3 text-left text-sm font-medium text-gray">
                  name
                </th>
                <th className="py-3 text-left text-sm font-medium text-gray">
                  earnings
                </th>
                <th className="py-3 text-left text-sm font-medium text-gray">
                  status
                </th>
              </tr>
            </thead>
            <tbody>
              {nonprofits.map((npo) => (
                <tr key={npo.id} className="border-b border-gray-l4">
                  <td className="py-4 text-sm text-gray-d4">{npo.name}</td>
                  <td className="py-4 text-sm text-gray-d4">{npo.earnings}</td>
                  <td className="py-4 text-sm text-gray-d4">{npo.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
