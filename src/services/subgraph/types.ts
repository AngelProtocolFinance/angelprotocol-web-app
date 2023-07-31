import { TransactionStatus } from "types/lists";
import { TxMeta } from "types/tx";

type GraphQLRes<T> = { data: T };
type Confirmation = { owner: { id: string } };
type Owner = { id: string };
type TransactionRes = {
  executed: boolean;
  expiry: number;
  transactionId: number;
  confirmations: Confirmation[];
  multiSig: { owners: Owner[] };
  metadata: string;
};

export type TransactionsRes = GraphQLRes<{
  multiSigTransactions: TransactionRes[];
}>;

export type Paginated<T extends any[]> = {
  items: T;
  next?: number;
};

export type TransactionsArgs = {
  multisigId: string;
  page: number;
  status?: TransactionStatus;
};

export type Transaction = {
  id: number;
  expiry: number;
  status: TransactionStatus;
  confirmations: string[];
  owners: string[];
  meta?: TxMeta;
};
