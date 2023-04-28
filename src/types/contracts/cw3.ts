import { TransactionStatus } from "types/lists";

export type PageOptions = {
  range: [number, number];
  status: TransactionStatus;
};
