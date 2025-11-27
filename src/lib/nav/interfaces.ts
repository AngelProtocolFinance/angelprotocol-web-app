import type { IPageKeyed } from "@better-giving/types/api";
export type { INpoSeriesOpts, NpoSeriesRange } from "./schemas";

export type {
  IBals,
  IRebalanceTx,
  IRebalancePayload,
  IRebalanceLog,
} from "./schemas.js";

export interface ITicker {
  /** uppercase ticker */
  id: string;
  qty: number;
  price_date: string;
  price: number;
  /** qty * price */
  value: number;
}

/** ticker: uppercase, ITicker */
export interface IComposition extends Record<string, ITicker> {}

export interface ILog {
  /** rebalance, purchase, redemption */
  reason: string;
  date: string;
  units: number;
  price: number;
  /** modified by price updator */
  price_updated: string;
  composition: IComposition;
  /** total value of composition */
  value: number;
  /** holder-id, units */
  holders: Record<string, number>;
}

export interface IPage<T> extends IPageKeyed<T> {}
export interface IPageOptions {
  limit?: number;
  /** base64 */
  next?: string;
  fields?: string[];
  consistent?: boolean;
}

export interface ISeries {
  week?: boolean;
  day?: boolean;
}

export interface ISeriesPoint {
  date: string;
  value: number;
  price: number;
  units: number;
}

export type LogRecordFn = <T>(log: ILog, series?: ISeries) => T;
