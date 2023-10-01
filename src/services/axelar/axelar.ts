import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/query/react";
import { QueryRes, Transaction } from "types/axelar";
import { contracts } from "constants/contracts";
import { axelarAPIurl } from "./constants";

const customBaseQuery: BaseQueryFn = retry(
  async (args, api, extraOptions) => {
    return fetchBaseQuery({
      baseUrl: axelarAPIurl,
    })(args, api, extraOptions);
  },
  { maxRetries: 1 }
);

//https://docs.axelarscan.io/interchain/searchGMP
type Transactions = {
  items: Transaction[];
  next: number | undefined;
};

const TX_PER_PAGE = 5;
export const axelar = createApi({
  reducerPath: "axelar",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    transactions: builder.query<Transactions, { page: number }>({
      query: ({ page }) => ({
        method: "POST",
        body: JSON.stringify({
          method: "searchGMP",
          contractMethod: "callContractWithToken",
          sourceChain: "polygon",
          sourceContractAddress: contracts["accounts"],
          from: (page - 1) * TX_PER_PAGE,
          size: TX_PER_PAGE,
        }),
      }),
      transformResponse(res: QueryRes<Transaction>, meta, { page: currPage }) {
        return {
          items: res.data,
          next: currPage * TX_PER_PAGE < res.total ? currPage + 1 : undefined,
        };
      },
    }),
  }),
});
