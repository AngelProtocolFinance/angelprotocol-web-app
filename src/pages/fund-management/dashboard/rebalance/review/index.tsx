import type { ILog } from "@better-giving/nav-history";
import { format } from "date-fns";
import { humanize } from "helpers/decimal";
import { ticker_colors } from "../../common";
import { type FV, ticker_nets } from "../types";

interface Props {
  fv: FV;
  ltd: ILog;
  classes?: string;
}

interface IDiff {
  a: number;
  b: number;
  formatter: (a: number | string) => string | number;
}
const Diff = ({ formatter, a, b }: IDiff) => {
  const diff = b - a;
  if (diff === 0) {
    return <td className="text-right">{formatter(b)}</td>;
  }

  if (diff > 0) {
    return (
      <td className="text-right text-green">
        {formatter(b)} <span className="text-2xs">(+{formatter(diff)})</span>
      </td>
    );
  }
  return (
    <td className="text-right text-red">
      {formatter(b)} <span className="text-2xs">({formatter(diff)})</span>
    </td>
  );
};

export function Review(props: Props) {
  const nets = ticker_nets(props.fv.bals, props.fv.txs);
  const prices = props.fv.txs.reduce(
    (acc, tx) => {
      // if (tx.in_id === "CASH" || tx.out_id === "CASH") return acc;
      acc[tx.in_id] ||= [];
      acc[tx.out_id] ||= [];
      acc[tx.in_id].push(+tx.price);
      acc[tx.out_id].push(+tx.price);
      return acc;
    },
    {} as { [ticker: string]: number[] }
  );

  const tickers = Object.values(props.ltd.composition).map((t) => {
    const ps = prices[t.id] || [];
    const ps_sum = ps.reduce((a, b) => a + b, 0);
    const avg = ps.length > 0 ? ps_sum / ps.length : 0;
    const qty2 = nets[t.id] ?? t.qty;
    const price2 = avg || t.price;

    const qty_change = (qty2 - t.qty) / t.qty;
    const price_change = (price2 - t.price) / t.price;
    const value2 = qty2 * price2;
    const value_change = (value2 - t.value) / t.value;

    return {
      ...t,
      pct: (t.value / props.ltd.value) * 100,
      qty2,
      qty_change,
      price2,
      price_change,
      value2,
      value_change,
      changed: t.id in prices || t.id in nets,
    };
  });

  return (
    <div className={`overflow-x-auto ${props.classes || ""} p-8`}>
      <table className="min-w-full [&_th,&_td]:p-2 [&_th,&_td]:first:pl-0 [&_th,&_td]:text-left [&_tbody]:divide-y [&_tbody]:divide-gray-l2 divide-y divide-gray-l2 text-sm">
        <thead>
          <tr>
            <th className="font-medium text-sm text-gray">Symbol</th>
            <th className="font-medium text-sm text-gray">Units</th>
            <th className="font-medium text-sm text-gray">Price</th>
            <th className="font-medium text-sm text-gray">Price Date</th>
            <th className="font-medium text-sm text-gray">Value</th>
            <th className="font-medium text-sm text-gray">%</th>
          </tr>
        </thead>
        <tbody>
          {tickers.map((t) => (
            <tr key={t.id} className="text-sm text-gray-d4">
              <td
                style={{ color: ticker_colors[t.id] || "#64748b" }}
                className="font-bold"
              >
                {t.id}
              </td>
              <Diff a={t.qty} b={t.qty2} formatter={(x) => humanize(x)} />
              {/* <td className="text-right">{humanize(t.qty)}</td> */}
              <Diff
                a={t.price}
                b={t.price2}
                formatter={(x) => `$${humanize(x)}`}
              />
              {/* <td className="text-right">${humanize(t.price)}</td> */}
              <td className="text-right">
                {t.price_date ? format(new Date(t.price_date), "PP") : "-"}
              </td>
              <Diff
                a={t.value}
                b={t.value2}
                formatter={(x) => `$${humanize(x)}`}
              />
              {/* <td className="text-right font-bold">${humanize(t.value)}</td> */}
              <td className="text-right">{humanize(t.pct)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
