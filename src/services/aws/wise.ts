import {
  CreateRecipientRequest,
  V1RecipientAccount,
  V2RecipientAccount,
} from "types/aws";
import { aws } from "../aws/aws";
import { version as v } from "../helpers";

type ValidationError = {
  code: string;
  message: string;
  arguments: string[];
};

type ValidationContent = {
  errors: ValidationError[];
};

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
      transformErrorResponse(res) {
        if (res.status === 422) {
          return (res.data as ValidationContent).errors[0].message;
        }
        return "Failed to create recipient";
      },
    }),
    recipient: builder.query<V2RecipientAccount, string>({
      query: (id: string) => `/${v(1)}/wise-proxy/v2/accounts/${id}`,
    }),
  }),
});

export const { useCreateRecipientMutation, useRecipientQuery } = wise;
