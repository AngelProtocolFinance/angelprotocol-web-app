import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { aws_endpoint } from "constants/urls";
import { TStore } from "Redux/store";

export const aws = createApi({
  reducerPath: "aws",
  baseQuery: fetchBaseQuery({
    baseUrl: aws_endpoint,
    mode: "cors",
    prepareHeaders: (headers, { getState }) => {
      const userData: any = (getState() as TStore).user.userData;
      if (userData.token) {
        headers.set("authorization", `${userData.token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
