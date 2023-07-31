import { TransactionStatus } from "types/lists";
import { TxMeta } from "types/tx";

type GraphQLRes<T> = { data: T };
type Owner = { id: string };
type Confirmation = { owner: Owner };
type TransactionRes = {
  id: string; //record-id
  executed: boolean;
  expiry: string;
  transactionId: string;
  confirmations: Confirmation[];
  multiSig: { owners: { owner: Owner }[] };
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
  transactionId: number;
  recordId: string;
  expiry: number;
  status: TransactionStatus;
  confirmations: string[];
  owners: string[];
  meta?: TxMeta;
};
