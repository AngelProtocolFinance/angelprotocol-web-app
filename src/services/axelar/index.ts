import { axelar } from "./axelar";

export { axelar };

export const {
  useTransactionsQuery,
  useLazyTransactionsQuery,
  util: { updateQueryData },
} = axelar;

export { default as usePaginatedTransactions } from "./usePaginatedTransactions";
