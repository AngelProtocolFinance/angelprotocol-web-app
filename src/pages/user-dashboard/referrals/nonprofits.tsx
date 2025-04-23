import { useState } from "react";

interface Nonprofit {
  id: number;
  name: string;
  earnings: string;
  status: string;
}

export function Nonprofits() {
  const [nonprofits] = useState<Nonprofit[]>([
    { id: 1, name: "NPO1", earnings: "$10.00", status: "ends in 2 years" },
    { id: 2, name: "NPO2", earnings: "$10.00", status: "ended" },
    { id: 3, name: "NPO3", earnings: "$9.00", status: "ended" },
  ]);

  return (
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
                <td
                  className={`py-4 text-sm ${
                    npo.status === "ended" ? "text-red" : "text-green"
                  }`}
                >
                  {npo.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
