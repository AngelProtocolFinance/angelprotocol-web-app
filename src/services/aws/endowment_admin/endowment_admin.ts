import { AWSQueryRes } from "types/services/aws";
import {
  DepositTransactions,
  DonationQueryRes,
  DonationTransactions,
} from "types/services/aws/endowment_admin";
import { aws } from "../aws";

const endowment_admin_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    depositTransactions: builder.query<DepositTransactions[], string>({
      query: (endowmentAddr) => `transactions/${endowmentAddr}`,
      transformResponse: (res: AWSQueryRes<DepositTransactions[]>) => {
        return res.Items;
      },
    }),
    donationTransactions: builder.query<DonationTransactions[], string>({
      query: (walletAddr) => `transactions/user/${walletAddr}`,
      transformResponse: (res: DonationQueryRes<DonationTransactions[]>) => {
        return res.transactions;
      },
    }),
  }),
});

export const { useDepositTransactionsQuery, useDonationTransactionsQuery } =
  endowment_admin_api;
