import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "store/store";
import { terra_lcds } from "constants/urls";
import { terraTags } from "./tags";

const customBaseQuery: BaseQueryFn = retry(
  async (args, api, extraOptions) => {
    const chainID = (api.getState() as RootState).chain.terra;
    const base_url = terra_lcds[chainID];
    return fetchBaseQuery({ baseUrl: base_url })(args, api, extraOptions);
  },
  { maxRetries: 1 }
);

type BlockLatest = {
  block_id: any;
  block: { header: { height: string } };
};

export const terra = createApi({
  reducerPath: "terra",
  baseQuery: customBaseQuery,
  tagTypes: [
    terraTags.gov,
    terraTags.indexfund,
    terraTags.registrar,
    terraTags.admin,
    terraTags.endowment,
    terraTags.multicall,
  ],
  endpoints: (builder) => ({
    latestBlock: builder.query<string, unknown>({
      query: () => "/blocks/latest",
      transformResponse: (res: BlockLatest) => {
        return res.block.header.height;
      },
    }),
  }),
});
