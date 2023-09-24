import { axelar } from "./axelar";

export { axelar };

export const {
  useTransactionsQuery,
  useLazyTransactionsQuery,
  useLazyGasFeeEstimateQuery,
  util: { updateQueryData },
} = axelar;

export { default as usePaginatedTransactions } from "./usePaginatedTransactions";
