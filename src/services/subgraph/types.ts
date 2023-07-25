import { TransactionStatus } from "types/lists";

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
  multsigTransactions: TransactionRes[];
}>;

export type Transaction = {
  id: number;
  title: string;
  expiry: number;
  status: TransactionStatus;
  confirmations: string[];
  owners: string[];
};
