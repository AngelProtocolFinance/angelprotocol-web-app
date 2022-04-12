import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { aws_endpoint } from "constants/urls";
import { RootState } from "store/store";
import { tags } from "./tags";

const awsBaseQuery = retry(
  fetchBaseQuery({
    baseUrl: aws_endpoint,
    mode: "cors",
    prepareHeaders: (headers, { getState }) => {
      const { user } = getState() as RootState;
      // const userData: any = (getState() as TStore).user.userData;
      if (user.token) {
        headers.set("authorization", `${user.token}`);
      }
      return headers;
    },
  }),
  // current default for all endpoints, change if necessary
  { maxRetries: 0 }
);

export const aws = createApi({
  tagTypes: [tags.cha, tags.airdrop, tags.alliance, tags.admin],
  reducerPath: "aws",
  baseQuery: awsBaseQuery,
  endpoints: () => ({}),
});
