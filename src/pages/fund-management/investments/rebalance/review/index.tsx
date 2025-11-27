import { format } from "date-fns";
import { humanize } from "helpers/decimal";
import type { ILog } from "lib/nav";
import { ticker_colors } from "../../common";
import { prices_fn } from "../helpers";
import { type FV, ticker_nets } from "../types";
import { Diff } from "./diff";

interface Props {
  fv: FV;
  ltd: ILog;
  classes?: string;
}

export function Review(props: Props) {
  const nets = ticker_nets(props.fv.bals, props.fv.txs);
  const prices = prices_fn(props.fv.txs);

  const tickers = Object.values(props.ltd.composition)
    .map((t) => {
      const ps = prices[t.id] || [];
      const ps_sum = ps.reduce((a, b) => a + b, 0);
      const avg = ps.length > 0 ? ps_sum / ps.length : 0;
      const qty2 = nets[t.id] ?? t.qty;
      const price2 = avg || t.price;

      const value2 = qty2 * price2;

      return {
        ...t,
        pct: (t.value / props.ltd.value) * 100,
        qty2,
        price2,
        value2,
      };
    })
    .toSorted((a, b) => b.value2 - a.value2);

  const total_value_2 = tickers.reduce((a, b) => a + b.value2, 0);
  const tickers2 = tickers.map((t) => {
    return { ...t, pct2: (t.value2 / total_value_2) * 100 };
  });

  return (
    <div className={`overflow-x-auto ${props.classes || ""} p-8`}>
      <p className="text-gray text-sm font-semibold">Portfolio value</p>
      <Diff
        classes="text-2xl font-bold mb-4"
        el="div"
        a={props.ltd.value}
        b={total_value_2}
        formatter={(x) => `$${humanize(x)}`}
      />
      <p className="text-gray text-sm font-semibold">Unit price</p>
      <Diff
        classes="text-2xl font-bold mb-4"
        el="div"
        a={props.ltd.price}
        b={total_value_2 / props.ltd.units}
        formatter={(x) => `$${humanize(x)}`}
      />
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
          {tickers2.map((t) => (
            <tr key={t.id} className="text-sm text-gray-d4">
              <td
                style={{ color: ticker_colors[t.id] || "#64748b" }}
                className="font-bold"
              >
                {t.id}
              </td>
              <Diff
                el="td"
                classes="text-right"
                a={t.qty}
                b={t.qty2}
                formatter={(x) => humanize(x)}
              />
              <Diff
                el="td"
                classes="text-right"
                a={t.price}
                b={t.price2}
                formatter={(x) => `$${humanize(x)}`}
              />
              <td className="text-right">
                {t.price_date ? format(new Date(t.price_date), "PP") : "-"}
              </td>
              <Diff
                el="td"
                classes="text-right"
                a={t.value}
                b={t.value2}
                formatter={(x) => `$${humanize(x)}`}
              />
              <Diff
                el="td"
                classes="text-right"
                a={t.pct}
                b={t.pct2}
                formatter={(x) => `${humanize(x)}%`}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
