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
import type { ITicker, LoaderData } from "./api";
import { History } from "./history";

export { loader } from "./api";
export { clientLoader } from "api/cache";

export const colors: { [ticker: string]: string } = {
  BTC: "#f7931a",
  ETH: "#627eea",
  IEFA: "#8b5cf6",
  QQQ: "#06b6d4",
  BNDX: "#6b7280",
  CASH: "#22c55e",
  FLOT: "#3b82f6",
  FNDF: "#f59e0b",
  IVV: "#dc2626",
};

function pie_fn(composition: Record<string, ITicker>) {
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

function top_holders_fn(holders: Record<string, number>) {
  return Object.entries(holders)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
}

export default function Page() {
  const { ltd, logs } = useCachedLoaderData() as LoaderData;
  const pie_data = pie_fn(ltd.composition);
  const line_data = logs.map((x) => {
    const { date, units, price } = x;
    return {
      date: format(new Date(date), "yyyy-MM-dd"),
      units,
      price,
    };
  });
  const num_holders = Object.keys(ltd.holders).length;
  const top_holders = top_holders_fn(ltd.holders);

  return (
    <div className="@container w-full max-w-4xl grid content-start gap-8">
      <h3 className="font-bold text-2xl mb-4">Dashboard</h3>
      <div className="grid grid-cols-1 @xl:grid-cols-2 @4xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg">
          <p className="text-gray text-sm mb-2">Portfolio Value</p>
          <p className="text-3xl font-bold">${humanize(ltd.value)}</p>
        </div>
        <div className="bg-white">
          <p className="text-gray text-sm mb-2">Portfolio Units</p>
          <p className="text-3xl font-bold">{humanize(ltd.units)}</p>
        </div>
      </div>
      <div className="">
        <h4 className="font-bold text-lg mb-4">NAV Price & Units</h4>
        <div className="mb-4" />
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
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#10b981"
              tick={{ fontSize: 12, dx: 4 }}
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
            <RechartsTooltip
              contentStyle={{ fontSize: 12 }}
              formatter={(val, name) => [`${humanize(val as number)}`, name]}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="grid content-start">
        <h4 className="text-lg mb-2">Recent changes</h4>
        <History />
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
                      <td
                        style={{ color: colors[ticker.name] || "#64748b" }}
                        className="font-bold"
                      >
                        {ticker.name}
                      </td>
                      <td className="text-right">{humanize(ticker.units)}</td>
                      <td className="text-right">${humanize(ticker.price)}</td>
                      <td className="text-right">
                        {ticker.price_date
                          ? format(new Date(ticker.price_date), "PP")
                          : "-"}
                      </td>
                      <td className="text-right font-bold">
                        ${humanize(ticker.value)}
                      </td>
                      <td className="text-right">
                        {humanize(ticker.percent)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <div className="mt-6">
              <h5 className="font-bold text-md mb-2">
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
                    {top_holders.map(([holder, units]) => (
                      <tr key={holder} className="text-sm text-gray-d4">
                        <td>{holder}</td>
                        <td className="text-right">{humanize(units)}</td>
                        <td className="text-right font-bold">
                          ${humanize(units * ltd.price)}
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
