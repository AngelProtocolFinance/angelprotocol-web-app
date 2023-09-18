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

export type GraphQLTransactionsRes = GraphQLRes<{
  multiSigTransactions: TransactionRes[];
}>;

export type MultisigRes = {
  id: string; //record-id
  owners: { owner: Owner }[];
  address: string;
  approvalsRequired: string;
  requireExecution: boolean;
  transactionExpiry: string;
};

export type MultisigOwnersRes = Pick<MultisigRes, "owners">;

export type GraphQLTransactionRes = GraphQLRes<{
  multiSigTransaction: TransactionRes;
}>;

export type ApplicationProposalRes = {
  id: string;
  confirmations: Confirmation[];
  executed: boolean;
  expiry: number;
};

export type GraphQLApplicationProposalRes = GraphQLRes<{
  applicationProposal: ApplicationProposalRes;
}>;

export type Paginated<T extends any[]> = {
  items: T;
  next?: number;
};
