import { axelar } from "./axelar";

export const {
  useTransactionsQuery,
  useLazyTransactionsQuery,
  util: { updateQueryData },
} = axelar;

export { default as usePaginatedTransactions } from "./usePaginatedTransactions";
export { axelar };
export { axelarAPIurl } from "./constants";
