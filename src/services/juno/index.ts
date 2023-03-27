import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/query/react";
import { JUNO_LCD } from "constants/env";
import { rootTags } from "./tags";

const customBaseQuery: BaseQueryFn = retry(
  async (args, api, extraOptions) => {
    return fetchBaseQuery({ baseUrl: JUNO_LCD })(args, api, extraOptions);
  },
  { maxRetries: 1 }
);

export const junoApi = createApi({
  reducerPath: "junoApi",
  baseQuery: customBaseQuery,
  tagTypes: rootTags,
  endpoints: () => ({}),
});

export const {
  util: { invalidateTags: invalidateJunoTags },
} = junoApi;
