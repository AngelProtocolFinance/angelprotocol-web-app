import { $num_gt0_fn, $req } from "@better-giving/schemas";
import { produce } from "immer";
import * as v from "valibot";

export const tickers: string[] = [
  "IVV",
  "FLOT",
  "QQQ",
  "BNDX",
  "FNDF",
  "IEFA",
  "CASH",
  "ETH",
  "BTC",
];

export const ticker = v.lazy((x) => {
  if (!x) return $req;
  return v.pipe(
    v.string(),
    v.toUpperCase(),
    v.picklist(tickers, "invalid ticker")
  );
});

const rebalance_tx_raw = v.object({
  tx_id: $req,
  in_id: ticker,
  out_id: ticker,
  in_qty: $num_gt0_fn({ required: true }),
  out_qty: $num_gt0_fn({ required: true }),
  price: $num_gt0_fn({ required: true }),
  fee: $num_gt0_fn(),
});

export interface IRebalanceTx extends v.InferOutput<typeof rebalance_tx_raw> {}

export const rebalance_tx = v.pipe(
  rebalance_tx_raw,
  v.forward(
    v.partialCheck(
      [["in_id"], ["out_id"]],
      (x) => x.out_id !== x.in_id,
      "tickers must be different"
    ),
    ["out_id"]
  ),
  v.forward(
    v.partialCheck(
      [["in_id"], ["out_id"]],
      (x) => [x.in_id, x.out_id].includes("CASH"),
      "one of in/out must be cash"
    ),
    ["in_id"]
  )
);

/** internal */
const bals = v.record(ticker, v.number());
export interface IBals extends v.InferOutput<typeof bals> {}

const rebalance_log_raw = v.object({
  txs: v.pipe(v.array(rebalance_tx), v.minLength(1, "at least one tx")),
  /** internal */
  bals: v.record(v.string(), v.number()),
});

export const ticker_nets = (bals: IBals, txs: IRebalanceTx[]) => {
  const a = txs.reduce(
    (prev, tx) => {
      const n = produce(prev, (o) => {
        //init from bals
        o[tx.out_id] ??= bals[tx.out_id];
        o[tx.in_id] ??= bals[tx.in_id];

        o[tx.out_id] -= +tx.out_qty;
        o[tx.in_id] += +tx.in_qty;
      });
      return n;
    },
    {} as { [ticker: string]: number }
  );
  return a;
};

export const rebalance_log = v.pipe(
  rebalance_log_raw,
  v.forward(
    v.partialCheck(
      [["txs"], ["bals"]],
      (x) => {
        //calculate total reduction from bals
        const n = ticker_nets(x.bals, x.txs);
        return Object.entries(n).every(([, net]) => net >= 0);
      },
      "tickers must have non-negative balance"
    ),
    ["txs"]
  )
);

export interface IRebalancePayload
  extends v.InferOutput<typeof rebalance_log> {}

export interface IRebalanceLog extends IRebalancePayload {
  id: string;
  date: string;
}

export const npo_series_ranges = ["week", "month", "quarter", "year"] as const;
export const npo_series_range = v.picklist(
  npo_series_ranges,
  "invalid npo series range"
);

export type NpoSeriesRange = v.InferOutput<typeof npo_series_range>;
export const npo_series_opts = v.object({
  range: v.optional(npo_series_range),
});

export interface INpoSeriesOpts extends v.InferOutput<typeof npo_series_opts> {}
