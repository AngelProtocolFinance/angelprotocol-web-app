import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { aws_endpoint } from "constants/urls";

export const lambdaAuthAPIs = createApi({
  reducerPath: "lambdaAuthAPIs",
  baseQuery: fetchBaseQuery({
    baseUrl: aws_endpoint,
    mode: "cors",
  }),
  endpoints: (builder) => ({
    getLambdaAuthToken: builder.mutation<any, any>({
      query: () => {
        return {
          url: `TEST-jwt-generator`,
          method: "GET",
          headers: {
            "content-type": "text/plain",
          },
          responseHandler: (response) => response.text(),
        };
      },
    }),
  }),
});

export const { useGetLambdaAuthTokenMutation } = lambdaAuthAPIs;
