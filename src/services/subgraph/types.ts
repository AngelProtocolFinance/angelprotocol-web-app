import { TransactionStatus } from "types/lists";

export type TransactionsArgs = {
  multisigId: string;
  page: number;
  status?: TransactionStatus;
};
