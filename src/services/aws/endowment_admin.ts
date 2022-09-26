import { AWSQueryRes, Transaction } from "types/aws";
import { aws } from "./aws";

interface DonationQueryRes<T> {
  transactions: T;
}
const endowment_admin_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    depositTransactions: builder.query<Transaction[], string>({
      query: (endowmentAddr) => `v1/transactions/${endowmentAddr}`,
      transformResponse: (res: AWSQueryRes<Transaction[]>) => {
        return res.Items;
      },
    }),
    donationTransactions: builder.query<Transaction[], string>({
      query: (walletAddr) => `v1/transactions/user/${walletAddr}`,
      transformResponse: (res: DonationQueryRes<Transaction[]>) => {
        return res.transactions;
      },
    }),
  }),
});

export const { useDepositTransactionsQuery, useDonationTransactionsQuery } =
  endowment_admin_api;
