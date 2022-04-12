import { aws } from "../aws";
import { Transaction, DonationQueryRes } from "./types";
import { AWSQueryRes } from "services/aws/types";

const endowment_admin_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    depositTransactions: builder.query<Transaction[], string>({
      query: (endowmentAddr) => `transactions/${endowmentAddr}`,
      transformResponse: (res: AWSQueryRes<Transaction[]>) => {
        return res.Items;
      },
    }),
    donationTransactions: builder.query<Transaction[], string>({
      query: (walletAddr) => `transactions/user/${walletAddr}`,
      transformResponse: (res: DonationQueryRes<Transaction[]>) => {
        return res.transactions;
      },
    }),
  }),
});

export const { useDepositTransactionsQuery, useDonationTransactionsQuery } =
  endowment_admin_api;
