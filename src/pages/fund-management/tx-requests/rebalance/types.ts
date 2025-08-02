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
  to_id: ticker,
  from_id: ticker,
  to_qty: amount({ required: true }),
  from_qty: amount({ required: true }),
  price: amount({ required: true }),
  fee: amount(),
});

export const tx = v.pipe(
  tx_raw,
  v.forward(
    v.partialCheck(
      [["to_id"], ["from_id"]],
      (x) => x.from_id !== x.to_id,
      "tickers must be different"
    ),
    ["from_id"]
  )
);

/** internal */
const bals = v.record(ticker, v.number());
export interface IBals extends v.InferOutput<typeof bals> {}

const tx_log_raw = v.object({
  txs: v.array(tx),
  /** internal */
  bals: v.record(v.string(), v.number()),
});

export const tx_log = v.pipe(
  tx_log_raw,
  v.forward(
    v.partialCheck(
      [["txs"], ["bals"]],
      (x) => {
        //calculate total reduction from bals
        const ticker_nets = x.txs.reduce(
          (prev, tx) => {
            //init from bals
            prev[tx.from_id] ||= x.bals[tx.from_id];
            prev[tx.to_id] ||= x.bals[tx.to_id];

            prev[tx.from_id] = prev[tx.from_id] - +tx.from_qty;
            prev[tx.to_id] = prev[tx.to_id] + +tx.from_qty;
            return prev;
          },
          {} as { [ticker: string]: number }
        );
        return Object.entries(ticker_nets).every(([, net]) => net >= 0);
      },
      "tickers must have non-negative balance"
    ),
    ["txs"]
  )
);

export interface Tx extends v.InferOutput<typeof tx> {}
export interface Schema extends v.InferOutput<typeof tx_log> {}
