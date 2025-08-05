import type { IComposition } from "@better-giving/nav-history";
import type { IBals } from "./types";

export const to_bals = (from: IComposition): IBals => {
  return Object.entries(from).reduce((acc, [ticker, { qty }]) => {
    acc[ticker] = qty;
    return acc;
  }, {} as IBals);
};
