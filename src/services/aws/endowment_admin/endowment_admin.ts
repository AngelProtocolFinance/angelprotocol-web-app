import { AWSQueryRes } from "types/services/aws";
import {
  DonationQueryRes,
  Transaction,
} from "types/services/aws/endowment_admin";
import { aws } from "../aws";

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
