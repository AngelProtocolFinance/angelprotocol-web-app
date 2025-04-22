import { ChevronDownIcon, ClipboardIcon } from "lucide-react";
import { useState } from "react";

export default function Referrals() {
  const [copied, setCopied] = useState({ id: false, link: false });
  const [expandedCard, setExpandedCard] = useState<number | null>(1);

  const copyToClipboard = (text: string, type: "id" | "link") => {
    navigator.clipboard.writeText(text);
    setCopied({ ...copied, [type]: true });
    setTimeout(() => setCopied({ ...copied, [type]: false }), 2000);
  };

  const earningsCards = [
    {
      id: 0,
      amount: "$100.00",
      payoutDate: "May 24, 2024",
      daysLeft: 2,
      hasPayoutMethod: false,
      payoutMethod: null,
    },
    {
      id: 1,
      amount: "$100.00",
      payoutDate: "May 24, 2024",
      daysLeft: 2,
      hasPayoutMethod: false,
      payoutMethod: null,
    },
    {
      id: 2,
      amount: "$100.00",
      payoutDate: "May 24, 2024",
      daysLeft: 2,
      hasPayoutMethod: true,
      payoutMethod: "Account ending in 12341",
    },
  ];

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
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          My referrals
        </h2>
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
          <div className="mb-4">
            <div className="text-sm font-medium text-gray-700 mb-1">
              REFERRAL ID
            </div>
            <div className="flex items-center">
              <div className="text-xl font-semibold mr-2">XYZ-1234</div>
              <button
                onClick={() => copyToClipboard("XYZ-1234", "id")}
                className="text-gray-400 hover:text-gray-600"
              >
                <ClipboardIcon className="h-5 w-5" />
              </button>
              {copied.id && (
                <span className="ml-2 text-xs text-green-600">Copied!</span>
              )}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-gray-700 mb-1">
              REFERRAL LINK
            </div>
            <div className="flex items-center">
              <div className="text-gray-900 truncate max-w-xs">
                https://better.giving...
              </div>
              <button
                onClick={() =>
                  copyToClipboard(
                    "https://better.giving.com/ref/XYZ-1234",
                    "link"
                  )
                }
                className="text-gray-400 hover:text-gray-600 ml-2"
              >
                <ClipboardIcon className="h-5 w-5" />
              </button>
              {copied.link && (
                <span className="ml-2 text-xs text-green-600">Copied!</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* My Earnings Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          My earnings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {earningsCards.map((card, index) => (
            <div
              key={card.id}
              className={`bg-gray-50 rounded-xl border border-gray-100 overflow-hidden ${index === 0 ? "md:col-span-3 lg:col-span-1" : ""}`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {card.amount}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      pays out {card.payoutDate}
                      <br />- in {card.daysLeft} days
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      setExpandedCard(expandedCard === card.id ? null : card.id)
                    }
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <ChevronDownIcon
                      className={`h-6 w-6 transform ${expandedCard === card.id ? "rotate-180" : ""} transition-transform duration-200`}
                    />
                  </button>
                </div>

                {card.hasPayoutMethod ? (
                  <div className="mt-4">
                    <div className="text-sm text-gray-700">Payout method:</div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-900">
                        {card.payoutMethod}
                      </div>
                      <button className="text-sm bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                        change
                      </button>
                    </div>
                  </div>
                ) : (
                  <button className="mt-4 text-sm border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100 transition-colors">
                    setup payout method
                  </button>
                )}
              </div>

              {/* Expanded Payout History */}
              {expandedCard === card.id && (
                <div className="border-t border-gray-200 px-6 py-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Payout history
                  </h3>

                  <div className="space-y-2">
                    <div className="grid grid-cols-3 text-sm font-medium text-gray-500">
                      <div>status</div>
                      <div>date</div>
                      <div>amount</div>
                    </div>

                    <div className="h-px bg-gray-200 w-full"></div>

                    {payoutHistory.length > 0 ? (
                      payoutHistory.map((payout, idx) => (
                        <div
                          key={idx}
                          className="grid grid-cols-3 text-sm text-gray-900"
                        >
                          <div>{payout.status}</div>
                          <div>{payout.date}</div>
                          <div>{payout.amount}</div>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-gray-500 py-4">
                        No payout history yet
                      </div>
                    )}

                    <div className="h-px bg-gray-200 w-full"></div>

                    <div className="text-center">
                      <button className="text-sm text-gray-600 hover:text-gray-900">
                        view more
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Onboarded Nonprofits Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Onboarded Nonprofits
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 text-left text-sm font-medium text-gray-500">
                  name
                </th>
                <th className="py-3 text-left text-sm font-medium text-gray-500">
                  earnings
                </th>
                <th className="py-3 text-left text-sm font-medium text-gray-500">
                  status
                </th>
              </tr>
            </thead>
            <tbody>
              {nonprofits.map((npo) => (
                <tr key={npo.id} className="border-b border-gray-200">
                  <td className="py-4 text-sm text-gray-900">{npo.name}</td>
                  <td className="py-4 text-sm text-gray-900">{npo.earnings}</td>
                  <td className="py-4 text-sm text-gray-900">{npo.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
