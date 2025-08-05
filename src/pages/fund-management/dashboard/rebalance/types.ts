import { produce } from "immer";
import * as v from "valibot";
import { tickers } from "../common";

const required_str = v.pipe(
  v.string("required"),
  v.trim(),
  v.nonEmpty("required")
);

export const amount = ({ required = false }: { required?: boolean } = {}) =>
  v.lazy((x) => {
    if (!x && required) return required_str;
    if (!x) return v.string();

    return v.pipe(
      required_str,
      v.transform((x) => +x),
      v.number("invalid number"),
      v.minValue(0, "must be > 0"),
      v.transform((x) => x.toString())
    );
  });

export const ticker = v.lazy((x) => {
  if (!x) return required_str;
  return v.pipe(
    v.string(),
    v.toUpperCase(),
    v.picklist(tickers, "invalid ticker")
  );
});

const tx_raw = v.object({
  tx_id: required_str,
  in_id: ticker,
  out_id: ticker,
  in_qty: amount({ required: true }),
  out_qty: amount({ required: true }),
  price: amount({ required: true }),
  fee: amount(),
});

export interface Tx extends v.InferOutput<typeof tx_raw> {}

export const tx = v.pipe(
  tx_raw,
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

const tx_log_raw = v.object({
  txs: v.pipe(v.array(tx), v.minLength(1, "at least one tx")),
  /** internal */
  bals: v.record(v.string(), v.number()),
});

export const ticker_nets = (bals: IBals, txs: Tx[]) => {
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

export const tx_log = v.pipe(
  tx_log_raw,
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

export interface FV extends v.InferOutput<typeof tx_log> {}

export interface FormState {
  type: "form";
  data?: FV;
}

export interface ReviewState {
  type: "review";
  data: FV;
}

export type State = FormState | ReviewState;
