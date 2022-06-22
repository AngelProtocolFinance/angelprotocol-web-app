import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/query/react";
import { junoLcdUrl } from "constants/urls";
import { junoTags } from "./tags";

const customBaseQuery: BaseQueryFn = retry(
  async (args, api, extraOptions) => {
    return fetchBaseQuery({ baseUrl: junoLcdUrl })(args, api, extraOptions);
  },
  { maxRetries: 1 }
);

type BlockLatest = {
  block_id: any;
  block: { header: { height: string } };
};

export const junoApi = createApi({
  reducerPath: "junoApi",
  baseQuery: customBaseQuery,
  tagTypes: [
    junoTags.gov,
    junoTags.indexfund,
    junoTags.registrar,
    junoTags.admin,
    junoTags.endowment,
    junoTags.multicall,
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

export const { invalidateTags: invalidateJunoTags } = junoApi.util;
