import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { awsTags } from "types/services/aws";
import { RootState } from "store/store";
import { aws_endpoint } from "constants/urls";

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
  tagTypes: [awsTags.cha, awsTags.airdrop],
  reducerPath: "aws",
  baseQuery: awsBaseQuery,
  endpoints: () => ({}),
});
