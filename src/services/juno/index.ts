import {
  BaseQueryFn,
  TypedUseQueryHookResult,
  createApi,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/query/react";
import { POLYGON_RPC } from "constant/urls";
import Decimal from "decimal.js";
import {
  ContractQueries as Q,
  ContractQueryTypes as QT,
  QueryOptions,
} from "./queryContract/types";
import { queryContract } from "./queryContract";
import { tags } from "./tags";

type Result = { result: string };

const customBaseQuery: BaseQueryFn = retry(
  async (args, api, extraOptions) => {
    return fetchBaseQuery({ baseUrl: POLYGON_RPC })(args, api, extraOptions);
  },
  { maxRetries: 1 }
);

export const junoApi = createApi({
  reducerPath: "junoApi",
  baseQuery: customBaseQuery,
  tagTypes: tags,
  endpoints: (builder) => ({
    //implementation endpoint of useQueryHook
    contract: builder.query<boolean, { type: any; options: any }>({
      providesTags(result, error, args) {
        return result ? [args.type] : [];
      },
      async queryFn({ type, options }) {
        return { data: await queryContract(type, options) };
      },
    }),
    latestBlock: builder.query<string, unknown>({
      query: () => ({
        method: "POST",
        body: { jsonrpc: "2.0", id: 1, method: "eth_blockNumber", params: [] },
      }),
      transformResponse: (res: Result) => {
        return new Decimal(res.result).toString();
      },
    }),
  }),
});

export const {
  useLatestBlockQuery,
  util: { invalidateTags: invalidateJunoTags },
  endpoints: {
    latestBlock: { useLazyQuery: useLazyLatestBlockQuery },
  },
} = junoApi;

type Base = BaseQueryFn<any, unknown, unknown, {}, {}>;
export function useContractQuery<T extends QT>(
  type: T,
  options: QueryOptions<T>,
  skip?: boolean
): TypedUseQueryHookResult<ReturnType<Q[T]["transform"]>, any, Base> {
  return junoApi.endpoints.contract.useQuery(
    { type, options },
    { skip }
  ) as any;
}
