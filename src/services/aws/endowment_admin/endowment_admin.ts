import { aws } from "../aws";
import { DepositTransactions } from "./types";
import { AWSQueryRes } from "services/aws/types";

const endowment_admin_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    depositTransactions: builder.query<DepositTransactions[], string>({
      query: (endowmentAddr) => `transactions/${endowmentAddr}`,
      transformResponse: (res: AWSQueryRes<DepositTransactions[]>) => {
        return res.Items;
      },
    }),
  }),
});

export const { useDepositTransactionsQuery } = endowment_admin_api;
