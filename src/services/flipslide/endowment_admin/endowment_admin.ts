import { flipside } from "../flipslide";
import { Transaction } from "./types";

const endowment_admin_api = flipside.injectEndpoints({
  endpoints: (builder) => ({
    depositTransactions: builder.query<Transaction[], string>({
      query: (endowmentAddr) =>
        `/endowment_donation_transactions/${endowmentAddr}`,
    }),
    donationTransactions: builder.query<Transaction[], string>({
      query: (walletAddr) => `/donator_transactions?donator=${walletAddr}`,
    }),
  }),
});

export const { useDepositTransactionsQuery, useDonationTransactionsQuery } =
  endowment_admin_api;
