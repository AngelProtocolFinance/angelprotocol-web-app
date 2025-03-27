"use client";

import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { useState } from "react";

export function Docs({ classes = "" }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 ${classes}`}>
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <Info className="w-6 h-6 text-gray" />
          <h2 className="text-2xl font-bold font-heading">
            Calculation Details
          </h2>
        </div>
        {isExpanded ? (
          <ChevronUp size={24} className="" />
        ) : (
          <ChevronDown size={24} className="" />
        )}
      </div>

      {isExpanded && (
        <div className="mt-8 space-y-8">
          <section>
            <h3 className="text-xl font-semibold mb-4">
              Better Giving Platform
            </h3>
            <ul className="space-y-4 list-disc pl-6">
              <li className="text-gray">
                Better Giving doesn't charge processing fees, but third-party
                services charge an average of 2% (no platform fees)
              </li>
              <li className="text-gray">
                80% of donors opt to cover processing fees (based on platform
                data)
              </li>
              <li className="text-gray">
                Better Giving accepts all donation types (credit cards, ACH,
                digital wallets, crypto, stocks, DAF)
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4">
              Donation Type Calculation
            </h3>
            <p className="text-gray mb-4">
              These are approximate percentages for U.S.-based nonprofits,
              annualized and projected for 2025 based on trends. Our
              calculations assume 50% of donors will not proceed to make a
              donation if their preferred donation method is unavailable.
            </p>
            <ul className="space-y-4 list-disc pl-6">
              <li className="text-gray">
                Credit card donations: 63% of total volume
              </li>
              <li className="text-gray">
                ACH/Bank Transfer donations: 10% of total volume
              </li>
              <li className="text-gray">
                Digital Wallet donations: 7% of total volume
              </li>
              <li className="text-gray">
                Cryptocurrency donations: 2% of total volume
              </li>
              <li className="text-gray">Stock donations: 6% of total volume</li>
              <li className="text-gray">DAF donations: 12% of total volume</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4">Investment Returns</h3>
            <ul className="space-y-4 list-disc pl-6">
              <li className="text-gray">Savings Account: 4% annual yield</li>
              <li className="text-gray">
                Sustainability Fund: 20% average annual return
              </li>
              <li className="text-gray">Returns compound daily</li>
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}
