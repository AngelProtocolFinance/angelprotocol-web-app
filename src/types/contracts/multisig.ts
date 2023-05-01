import { OmitIndexSignature } from "type-fest";
import { TransactionStatus } from "types/lists";
import { Tupleable } from "../evm";

export interface NewTransaction extends Tupleable {
  title: string;
  description: string;
  destination: string;
  value: string;
  data: string;
}

export interface Transaction {
  id: number; //added in decode step

  title: string;
  description: string;
  destination: string;
  value: string;
  data: string;
  status: TransactionStatus;

  //future?
  meta?: string;
}

export interface TransactionIDsPageOptions extends Tupleable {
  from: number;
  to: number;
  pending: boolean;
  executed: boolean;
}

export type PageOptions = {
  range: [number, number];
  status: TransactionStatus;
};

type Y = OmitIndexSignature<TransactionIDsPageOptions>;
