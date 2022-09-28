import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/query/react";
import { junoTags } from "./tags";

export const baseUrl = process.env.REACT_APP_JUNO_LCD_NODE;

const customBaseQuery: BaseQueryFn = retry(
  async (args, api, extraOptions) => {
    return fetchBaseQuery({ baseUrl })(args, api, extraOptions);
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
    junoTags.account,
    junoTags.custom,
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

export const {
  useLatestBlockQuery,
  util: { invalidateTags: invalidateJunoTags },
  endpoints: {
    latestBlock: { useLazyQuery: useLazyLatestBlockQuery },
  },
} = junoApi;
