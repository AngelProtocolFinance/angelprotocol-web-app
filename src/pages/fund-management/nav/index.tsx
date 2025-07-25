import { format } from "date-fns";
import { humanize } from "helpers/decimal";
import {
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { useCachedLoaderData } from "remix-client-cache";
import type { ILog, ITicker, LoaderData } from "./api";

export { loader } from "./api";
export { clientLoader } from "api/cache";

export const colors: { [ticker: string]: string } = {
  BTC: "#f7931a",
  ETH: "#10b981",
  IEFA: "#f59e0b",
  QQQ: "#ef4444",
  BNDX: "#64748b",
  CASH: "#10b981",
  FLOT: "#c5192d",
  FNDF: "#fbc412",
  IVV: "#a31c44",
};

function get_portfolio_metrics(log: ILog) {
  const { value, units, composition, holders } = log;
  return {
    value,
    units,
    composition,
    holders,
  };
}

function get_composition_pie_data(composition: Record<string, ITicker>) {
  const tickers = Object.values(composition);
  const total_value = tickers.reduce((sum, t) => sum + t.value, 0);
  return tickers
    .map((ticker) => ({
      name: ticker.id,
      value: ticker.value,
      units: ticker.qty,
      price: ticker.price,
      price_date: ticker.price_date,
      percent: total_value ? (ticker.value / total_value) * 100 : 0,
    }))
    .sort((a, b) => b.value - a.value); // sort by value descending
}

function get_nav_line_data(logs: ILog[]) {
  return logs.map((log) => ({
    date: format(new Date(log.date), "yyyy-MM-dd"),
    units: log.units,
    price: log.price,
  }));
}

function get_top_holders(holders: Record<string, number>) {
  return Object.entries(holders)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
}

export default function Page() {
  const data = useCachedLoaderData() as LoaderData;
  const metrics = get_portfolio_metrics(data.ltd);
  const pie_data = get_composition_pie_data(metrics.composition);
  const line_data = get_nav_line_data(data.logs);
  const num_holders = Object.keys(metrics.holders).length;
  const top_holders = get_top_holders(metrics.holders);

  return (
    <div className="@container w-full max-w-4xl grid content-start gap-8">
      <h3 className="font-bold text-2xl mb-4">NAV</h3>
      <div className="grid grid-cols-1 @xl:grid-cols-2 @4xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-gray text-sm mb-2">Portfolio Value</span>
          <span className="text-3xl font-bold">
            {metrics.value.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-gray text-sm mb-2">Portfolio Units</span>
          <span className="text-3xl font-bold">{humanize(metrics.units)}</span>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-gray text-sm mb-2">Holders</span>
          <span className="text-3xl font-bold">{num_holders}</span>
        </div>
      </div>
      <div className="mb-8">
        <div className="grid grid-cols-1 @6xl:grid-cols-2 gap-8">
          <div className="bg-white">
            <h4 className="font-bold text-lg mb-4">Portfolio Composition</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pie_data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  label={({ name }) => name}
                >
                  {pie_data.map((ticker) => (
                    <Cell
                      key={ticker.name}
                      fill={colors[ticker.name] || "#64748b"} // default gray
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-6">
              <h5 className="font-bold text-md mb-2">Tickers</h5>
              <div className="overflow-x-auto">
                <table className="min-w-full [&_th,&_td]:p-2 [&_th,&_td]:first:pl-0 [&_th,&_td]:text-left [&_tbody]:divide-y [&_tbody]:divide-gray-l2 divide-y divide-gray-l2 text-sm">
                  <thead>
                    <tr>
                      <th className="font-medium text-sm text-gray">Symbol</th>
                      <th className="font-medium text-sm text-gray">Units</th>
                      <th className="font-medium text-sm text-gray">Price</th>
                      <th className="font-medium text-sm text-gray">
                        Price Date
                      </th>
                      <th className="font-medium text-sm text-gray">Value</th>
                      <th className="font-medium text-sm text-gray">%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pie_data.map((ticker) => (
                      <tr key={ticker.name} className="text-sm text-gray-d4">
                        <td>{ticker.name}</td>
                        <td className="text-right">{humanize(ticker.units)}</td>
                        <td className="text-right">
                          {ticker.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </td>
                        <td className="text-right">
                          {ticker.price_date
                            ? format(new Date(ticker.price_date), "PP")
                            : "-"}
                        </td>
                        <td className="text-right font-bold">
                          {ticker.value.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </td>
                        <td className="text-right">
                          {ticker.percent.toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="">
            <h4 className="font-bold text-lg mb-4">
              NAV Units & Price Over Time
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={line_data}>
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  stroke="#2d89c8"
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#10b981"
                  tick={{ fontSize: 12 }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="units"
                  stroke="#2d89c8"
                  name="Units"
                  dot={{ r: 3 }}
                  isAnimationActive={false}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="price"
                  stroke="#10b981"
                  name="Price"
                  dot={{ r: 3 }}
                  isAnimationActive={false}
                />
                <Legend />
                <RechartsTooltip
                  formatter={(val, name) => [
                    typeof val === "number"
                      ? val.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })
                      : val,
                    name,
                  ]}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-6">
              <h5 className="font-bold text-md mb-2">Top 10 Holders</h5>
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
                    {top_holders.map(([holder, units]) => (
                      <tr key={holder} className="text-sm text-gray-d4">
                        <td>{holder}</td>
                        <td className="text-right">{humanize(units)}</td>
                        <td className="text-right font-bold">
                          {(
                            (units * metrics.value) /
                            metrics.units
                          ).toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
