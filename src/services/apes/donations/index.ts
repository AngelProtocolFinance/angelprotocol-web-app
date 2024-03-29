import { donations_api } from "./donations";

export const {
  useRequestReceiptMutation,
  useDonationsQuery,
  useCurrenciesQuery,
  endpoints: {
    donations: { useLazyQuery: useLazyDonationsQuery },
  },
  util: { updateQueryData: updateDonationsQueryData },
} = donations_api;

export { default as usePaginatedDonationRecords } from "./usePaginatedDonations";
