import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { aws_endpoint } from "constants/urls";
import { RootState } from "store/store";

export const aws = createApi({
  reducerPath: "aws",
  baseQuery: fetchBaseQuery({
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
  endpoints: () => ({}),
});
