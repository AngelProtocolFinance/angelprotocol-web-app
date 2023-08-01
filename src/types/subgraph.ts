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

export type SingleTransactionRes = GraphQLRes<{
  multiSigTransaction: TransactionRes;
}>;

export type Paginated<T extends any[]> = {
  items: T;
  next?: number;
};
