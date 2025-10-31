import { Info } from "components/status";
import { format } from "date-fns";
import { humanize } from "helpers/decimal";
import { to_usd } from "helpers/to-usd";
import { Link, Outlet, href } from "react-router";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import type { Route } from "./+types";
import { Status } from "./status";

export { ErrorBoundary } from "components/error";
export { loader } from "./api";
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();

export default CacheRoute(Page);
function Page({ loaderData: { subs } }: Route.ComponentProps) {
  const rows = subs.map((s) => {
    const can_cancel = s.status === "active" || s.status === "trialing";

    return (
      <tr key={s.id}>
        <td className="text-sm text-gray-d4">
          <Link
            to={
              s.recipient.type === "fund"
                ? href("/fundraisers/:fundId", { fundId: s.recipient.id })
                : href("/marketplace/:id", { id: s.recipient.id })
            }
            className="text-blue hover:text-blue-d1"
          >
            {s.recipient.name}
          </Link>
        </td>
        <td className="text-sm text-gray-d4">
          <div className="flex items-baseline gap-x-2">
            <span className="text-xs text-gray-d1 font-semibold">
              {s.denom}
            </span>
            <span>{humanize(s.amount, 2)}</span>
            {s.denom !== "USD" && (
              <span className="text-xs text-gray-d1">
                ({to_usd(s.amount_usd)})
              </span>
            )}
          </div>
        </td>
        <td>
          <Status status={s.status} />
        </td>

        <td className="text-sm text-gray-d4">
          {s.status === "active" ? format(new Date(s.next_payment), "PP") : ""}
        </td>

        <td className="text-sm">
          {can_cancel ? (
            <Link
              to={`cancel/${s.id}?recipient=${encodeURIComponent(s.recipient.name)}`}
              className="btn btn-red text-xs px-3 py-1 inline-block"
            >
              Cancel
            </Link>
          ) : null}
        </td>
      </tr>
    );
  });

  return (
    <div className="grid px-6 py-4 md:px-10 md:py-8">
      <h2 className="text-3xl">Recurring Donations</h2>

      {rows.length > 0 ? (
        <div className="overflow-x-auto bg-white rounded-lg mt-8">
          <table className="min-w-full [&_th,&_td]:p-2 [&_th,&_td]:first:pl-0 [&_th,&_td]:text-left [&_tbody]:divide-y [&_tbody]:divide-gray-l3 divide-y divide-gray-l3">
            <thead>
              <tr>
                <th className="font-medium text-sm text-gray">Recipient</th>
                <th className="font-medium text-sm text-gray">Amount</th>
                <th className="font-medium text-sm text-gray">Status</th>
                <th className="font-medium text-sm text-gray">Next Payment</th>
                <th className="font-medium text-sm text-gray">Actions</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      ) : (
        <Info classes="mt-8">No recurring donations found</Info>
      )}
      {/** cancel prompt */}
      <Outlet />
    </div>
  );
}
