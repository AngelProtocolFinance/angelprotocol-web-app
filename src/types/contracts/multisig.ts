import { TransactionStatus } from "../lists";

export type NewTransaction = {
  destination: string;
  value: string;
  data: string;
  meta: string;
};

export type PageOptions = {
  range: [number, number];
  status: TransactionStatus;
};
