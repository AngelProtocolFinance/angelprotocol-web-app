import {
  CreateRecipientRequest,
  V1RecipientAccount,
  V2RecipientAccount,
} from "types/aws";
import { aws } from "../aws/aws";
import { version as v } from "../helpers";

export const wise = aws.injectEndpoints({
  endpoints: (builder) => ({
    createRecipient: builder.mutation<
      V1RecipientAccount,
      CreateRecipientRequest
    >({
      query: (payload) => {
        return {
          url: `/${v(1)}/wise-proxy/v1/accounts`,
          method: "POST",
          body: payload,
          headers: { "Content-Type": "application/json" },
        };
      },
    }),
    recipient: builder.query<V2RecipientAccount, string>({
      query: (id: string) => `/${v(1)}/wise-proxy/v2/accounts/${id}`,
    }),
  }),
});

export const { useCreateRecipientMutation, useRecipientQuery } = wise;
