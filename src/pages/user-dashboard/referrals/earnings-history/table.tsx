import { Link } from "@remix-run/react";
import { appRoutes } from "constants/routes";
import { format } from "date-fns";
import type { Earning } from "types/referrals";

interface Props {
  items: Earning[];
  classes?: string;
}
export function EarningsHistory({ items, classes = "" }: Props) {
  if (items.length === 0) null;
  return (
    <div
      className={`border-t-2 border-gray-l3 px-6 py-4 ${classes} overflow-x-auto`}
    >
      <table className="min-w-full [&_th,&_td]:p-2 [&_th,&_td]:text-left [&_tbody]:divide-y [&_tbody]:divide-gray-l2 divide-y divide-gray-l2">
        <thead>
          <tr>
            <th className="font-medium text-sm text-gray">NPO</th>
            <th className="font-medium text-sm text-gray">date</th>
            <th className="font-medium text-sm text-gray">amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((payout, idx) => (
            <tr key={idx} className="text-sm text-gray-d4">
              <td>
                <Link to={`${appRoutes.marketplace}/${payout.donation.to_id}`}>
                  {payout.donation.to_name}
                </Link>
              </td>
              <td>{format(payout.date, "PP")}</td>
              <td>{payout.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
