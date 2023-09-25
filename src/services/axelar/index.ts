import { axelar } from "./axelar";

export { axelar };

export const {
  useTransactionsQuery,
  useLazyTransactionsQuery,
  useGasFeeEstimateQuery,
  util: { updateQueryData },
} = axelar;

export { default as usePaginatedTransactions } from "./usePaginatedTransactions";
