import {
  BaseQueryFn,
  TypedUseQueryHookResult,
  createApi,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/query/react";
import {
  ContractQueries as Q,
  ContractQueryTypes as QT,
  QueryOptions,
} from "./queryContract/types";
import { POLYGON_RPC } from "constants/env";
import { queryContract } from "./queryContract";
import { tags } from "./tags";

type BlockLatest = {
  block_id: any;
  block: { header: { height: string } };
};

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
      query: () => "/blocks/latest",
      transformResponse: (res: BlockLatest) => {
        return res.block.header.height;
      },
    }),
  }),
});

export const {
  useLatestBlockQuery,
  util: { invalidateTags: invalidateJunoTags },
} = junoApi;

type Base = BaseQueryFn<any, unknown, unknown, {}, {}>;
export function useContractQuery<T extends QT>(
  type: T,
  options: QueryOptions<T>
): TypedUseQueryHookResult<ReturnType<Q[T]["transform"]>, any, Base> {
  return junoApi.endpoints.contract.useQuery({ type, options }) as any;
}
