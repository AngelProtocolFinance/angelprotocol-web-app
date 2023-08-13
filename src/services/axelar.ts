import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/query/react";
import { contracts } from "constants/contracts";
import { IS_TEST } from "constants/env";

const customBaseQuery: BaseQueryFn = retry(
  async (args, api, extraOptions) => {
    return fetchBaseQuery({
      baseUrl: IS_TEST
        ? "https://testnet.api.gmp.axelarscan.io"
        : "https://api.gmp.axelarscan.io",
    })(args, api, extraOptions);
  },
  { maxRetries: 1 }
);

type Res<T> = {
  data: T[];
  total: number;
  time_spent: 21;
};

type Transaction = {
  symbol: string;
  amount: number;
  status: string;
  call: {
    transactionHash: string;
  };
};

export const axelar = createApi({
  reducerPath: "axelar",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    //implementation endpoint of useQueryHook
    transactions: builder.query<Transaction[], unknown>({
      query: () => ({
        method: "POST",
        body: JSON.stringify({
          method: "searchGMP",
          contractMethod: "callContractWithToken",
          sourceChain: "polygon",
          sourceContractAddress: contracts["accounts"],
          from: 0,
          size: 5,
        }),
      }),
      transformResponse(res: Res<Transaction>) {
        return res.data;
      },
    }),
  }),
});

export const { useTransactionsQuery } = axelar;
