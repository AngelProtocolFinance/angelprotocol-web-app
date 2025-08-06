import type { IComposition } from "@better-giving/nav-history";
import type { IBals, Tx } from "./types";

export const to_bals = (from: IComposition): IBals => {
  return Object.entries(from).reduce((acc, [ticker, { qty }]) => {
    acc[ticker] = qty;
    return acc;
  }, {} as IBals);
};

export const prices_fn = (txs: Tx[]) => {
  return txs.reduce(
    (acc, tx) => {
      if (tx.in_id === "CASH") {
        acc[tx.out_id] ||= [];
        acc[tx.out_id].push(+tx.price);
        return acc;
      }
      //out_id is cash
      acc[tx.in_id] ||= [];
      acc[tx.in_id].push(+tx.price);
      return acc;
    },
    {} as { [ticker: string]: number[] }
  );
};
