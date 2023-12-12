import { CreateRecipientRequest, V1RecipientAccount } from "types/aws";
import { aws } from "services/aws/aws";
import { version as v } from "../helpers";

export const wise = aws.injectEndpoints({
  endpoints: (builder) => ({
    account: builder.mutation<V1RecipientAccount, CreateRecipientRequest>({
      query: (payload) => {
        return {
          url: `/${v(1)}/wise-proxy/v1/accounts`,
          method: "POST",
          body: payload,
          headers: { "Content-Type": "application/json" },
        };
      },
    }),
  }),
});

export const { useAccountMutation } = wise;
