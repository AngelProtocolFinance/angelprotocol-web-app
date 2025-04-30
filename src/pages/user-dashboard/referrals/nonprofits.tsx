import { useState } from "react";

interface Nonprofit {
  id: number;
  name: string;
  earnings: string;
  status: string;
}

interface NonprofitsProps {
  classes?: string;
}

export function Nonprofits({ classes = "" }: NonprofitsProps) {
  const [nonprofits] = useState<Nonprofit[]>([
    { id: 1, name: "NPO1", earnings: "$10.00", status: "ends in 2 years" },
    { id: 2, name: "NPO2", earnings: "$10.00", status: "ended" },
    { id: 3, name: "NPO3", earnings: "$9.00", status: "ended" },
  ]);

  return (
    <div className={classes}>
      <h2 className="text-2xl font-semibold text-gray-d4 mb-4">
        Onboarded Nonprofits
      </h2>
      <div className="overflow-x-auto bg-white rounded-lg p-4">
        <table className="min-w-full [&_th,&_td]:p-2 [&_th,&_td]:text-left [&_tbody]:divide-y [&_tbody]:divide-gray-l3 divide-y divide-gray-l3">
          <thead>
            <tr>
              <th className="font-medium text-sm text-gray">name</th>
              <th className="font-medium text-sm text-gray">earnings</th>
              <th className="font-medium text-sm text-gray">status</th>
            </tr>
          </thead>
          <tbody>
            {nonprofits.map((npo) => (
              <tr key={npo.id}>
                <td className="text-sm text-gray-d4">{npo.name}</td>
                <td className="text-sm text-gray-d4">{npo.earnings}</td>
                <td
                  className={`text-sm ${
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
