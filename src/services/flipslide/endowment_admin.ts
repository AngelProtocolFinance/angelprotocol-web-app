import { Transaction } from "types/server/aws";
import { flipside } from "./flipslide";

const endowment_admin_api = flipside.injectEndpoints({
  endpoints: (builder) => ({
    depositTransactions: builder.query<Transaction[], string>({
      query: (endowmentId) => `/endowment_donation_transactions/${endowmentId}`,
    }),
    donationTransactions: builder.query<Transaction[], string>({
      query: (walletAddr) => `/donator_transactions?donator=${walletAddr}`,
    }),
  }),
});

export const { useDepositTransactionsQuery, useDonationTransactionsQuery } =
  endowment_admin_api;
