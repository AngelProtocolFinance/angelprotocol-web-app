import { Link } from "@remix-run/react";
import { Info } from "components/status";
import { appRoutes } from "constants/routes";
import { format } from "date-fns";
import { humanize } from "helpers/decimal";
import type { Referred } from "types/referrals";

interface Props {
  classes?: string;
  npos: Referred[];
}

export function Nonprofits({ classes = "", npos }: Props) {
  const rows = npos.map((npo) => {
    const now = new Date();
    const expiry = new Date(npo.up_until);

    return (
      <tr key={npo.id}>
        <td className="text-sm text-gray-d4">
          <Link
            to={`${appRoutes.marketplace}/${npo.id}`}
            className="text-blue hover:text-blue-d1"
          >
            {npo.name}
          </Link>
        </td>
        <td className="text-sm text-gray-d4">${humanize(npo.ltd)}</td>
        <td className={`text-sm ${now > expiry ? "text-red" : "text-green"}`}>
          {now > expiry ? "Ended" : `ends in ${format(expiry, "PP")}`}
        </td>
      </tr>
    );
  });
  return (
    <div className={classes}>
      <h2 className="text-2xl mb-4">Onboarded Nonprofits</h2>
      {rows.length > 0 ? (
        <div className="overflow-x-auto bg-white rounded-lg">
          <table className="min-w-full [&_th,&_td]:p-2 [&_th,&_td]:first:pl-0 [&_th,&_td]:text-left [&_tbody]:divide-y [&_tbody]:divide-gray-l3 divide-y divide-gray-l3">
            <thead>
              <tr>
                <th className="font-medium text-sm text-gray">Name</th>
                <th className="font-medium text-sm text-gray">Earnings</th>
                <th className="font-medium text-sm text-gray">Status</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      ) : (
        <Info>No nonprofits onboarded yet</Info>
      )}
    </div>
  );
}
