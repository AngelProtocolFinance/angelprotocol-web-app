import { UserTypes } from "services/user/types";
import createAuthToken from "helpers/createAuthToken";
import { Token } from "constants/currency";
import { apes } from "./apes";

const currencies_api = apes.injectEndpoints({
  endpoints: (builder) => ({
    getTerraTokens: builder.query<Token[], unknown>({
      query: () => {
        const generatedToken = createAuthToken(UserTypes.WEB_APP);
        return {
          url: "terra-token/list",
          method: "GET",
          headers: { authorization: generatedToken },
        };
      },
    }),
    getTerraToken: builder.query<Token, string>({
      query: (symbol: string) => {
        const generatedToken = createAuthToken(UserTypes.WEB_APP);
        return {
          url: `terra-token/${symbol}`,
          method: "GET",
          headers: { authorization: generatedToken },
        };
      },
    }),
  }),
});

export const { useGetTerraTokensQuery, useGetTerraTokenQuery } = currencies_api;
