import { aws } from "../aws";
import { DepositTransactions, QueryRes } from "./types";

const endowment_admin_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    depositTransactions: builder.query<DepositTransactions[], string>({
      query: (endowmentAddr) => `transactions/${endowmentAddr}`,
      transformResponse: (res: QueryRes<DepositTransactions[]>) => {
        return res.Items;
      },
    }),
  }),
});

export const { useDepositTransactionsQuery } = endowment_admin_api;
