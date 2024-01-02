import {
  CreateRecipientRequest,
  V1RecipientAccount,
  V2RecipientAccount,
  WiseCurrency,
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
    currencis: builder.query<WiseCurrency[], unknown>({
      query: () => `/${v(1)}/wise-proxy/v1/currencies`,
    }),
  }),
});

export const {
  useCreateRecipientMutation,
  useRecipientQuery,
  useCurrencisQuery,
} = wise;
