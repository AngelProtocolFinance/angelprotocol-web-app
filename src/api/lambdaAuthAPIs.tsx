import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { aws_endpoint } from "constants/urls";

export const lambdaAuthAPIs = createApi({
  reducerPath: "lambdaAuthAPIs",
  baseQuery: fetchBaseQuery({
    baseUrl: aws_endpoint,
    mode: "cors",
    prepareHeaders: (headers) => {
      headers.set("Content-type", `application/x-www-form-urlencoded`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getLambdaAuthToken: builder.mutation<any, any>({
      query: () => {
        return {
          url: `TEST-jwt-generator`,
          method: "GET",
        };
      },
      transformResponse: (response: { data: any }) => response,
    }),
  }),
});

export const { useGetLambdaAuthTokenMutation } = lambdaAuthAPIs;
