import { Token } from "types/server/aws";
import createAuthToken from "helpers/createAuthToken";
import { apes } from "./apes";

const tokens_api = apes.injectEndpoints({
  endpoints: (builder) => ({
    tokens: builder.query<Token[], unknown>({
      query: () => {
        const generatedToken = createAuthToken("angelprotocol-web-app");
        return {
          url: "token/list",
          method: "GET",
          headers: { authorization: generatedToken },
        };
      },
    }),
  }),
});

export const { useTokensQuery } = tokens_api;
