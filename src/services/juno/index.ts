import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/query/react";
import { JUNO_LCD } from "constants/urls";
import { rootTags } from "./tags";

const customBaseQuery: BaseQueryFn = retry(
  async (args, api, extraOptions) => {
    return fetchBaseQuery({ baseUrl: JUNO_LCD })(args, api, extraOptions);
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
  tagTypes: rootTags,
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
