import { NpoName } from "components/npo-name";
import { format } from "date-fns";
import { humanize } from "helpers/decimal";
import { NavLink, Outlet, useNavigate } from "react-router";
import {
  Legend,
  Line,
  LineChart,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import type { Route } from "./+types";
import { BalanceHistoryTable } from "./history-table-balance";
import { InterestHistoryTable } from "./history-table-interest";

export { loader } from "./api";
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();
function top_holders_fn(holders: Record<string, number>) {
  return Object.entries(holders)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
}

export default CacheRoute(Page);
function Page({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const { logs_intr, logs_bal } = loaderData;
  const ltd = logs_bal[0];

  const line_data = logs_bal.toReversed().map((x) => {
    const { date, total } = x;
    return {
      date: format(new Date(date), "yyyy-MM-dd"),
      total,
    };
  });
  const num_holders = Object.keys(ltd.balances).length;
  const top_holders = top_holders_fn(ltd.balances);

  return (
    <div className="@container w-full max-w-4xl grid content-start">
      <h3 className="font-bold text-2xl mb-4">Savings</h3>

      <div className="bg-white">
        <p className="text-gray text-sm mb-2">Total Value</p>
        <p className="text-3xl font-bold">${humanize(ltd.total)}</p>
      </div>

      <h4 className="font-bold text-lg mb-4 mt-8">NAV Price & Units</h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={line_data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <Legend wrapperStyle={{ fontSize: 14, paddingTop: 10 }} />
          <XAxis dataKey="date" tick={{ fontSize: 12, dy: 4 }} />
          <YAxis
            yAxisId="left"
            orientation="left"
            stroke="#2d89c8"
            tick={{ fontSize: 12, dx: -4 }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="total"
            stroke="#2d89c8"
            name="Savings Balance"
            dot={{ r: 3 }}
            isAnimationActive={false}
          />

          <RechartsTooltip
            contentStyle={{ fontSize: 12 }}
            formatter={(val, name) => [`${humanize(val as number)}`, name]}
          />
        </LineChart>
      </ResponsiveContainer>

      <h4 className="text-lg mb-4 mt-8">Recent balance snapshots</h4>
      <BalanceHistoryTable
        items={logs_bal}
        load_next={() => {
          navigate("balance-history");
        }}
      />

      <div className="flex items-center gap-x-2 mt-8 mb-4">
        <h4 className="font-bold text-lg">Recent interests</h4>
        <NavLink
          replace
          preventScrollReset
          to="log-interest"
          className="btn-blue text-xs px-2 py-1 roundes-xs"
        >
          Log interest
        </NavLink>
      </div>
      <InterestHistoryTable
        items={logs_intr}
        load_next={
          logs_intr.length > 0
            ? () => {
                navigate("interest-history");
              }
            : undefined
        }
      />

      <div className="overflow-x-auto">
        <h5 className="font-bold text-md mt-8 mb-2">
          Top Holders{" "}
          <span className="text-sm text-gray">( of {num_holders} )</span>
        </h5>
        <div className="overflow-x-auto">
          <table className="min-w-full [&_th,&_td]:p-2 [&_th,&_td]:first:pl-0 [&_th,&_td]:text-left [&_tbody]:divide-y [&_tbody]:divide-gray-l2 divide-y divide-gray-l2 text-sm">
            <thead>
              <tr>
                <th className="font-medium text-sm text-gray">Holder</th>
                <th className="font-medium text-sm text-gray">Units</th>
                <th className="font-medium text-sm text-gray">Value</th>
              </tr>
            </thead>
            <tbody>
              {top_holders.map(([holder, balance]) => (
                <tr key={holder} className="text-sm text-gray-d4">
                  <td>
                    <NpoName id={holder} />
                  </td>
                  <td className="text-right">${humanize(balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
