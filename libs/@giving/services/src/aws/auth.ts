import { aws } from "./aws";

const auth_api = aws.injectEndpoints({
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

export const { useGetLambdaAuthTokenMutation } = auth_api;
