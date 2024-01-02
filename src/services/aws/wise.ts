import {
  AccountRequirements,
  CreateRecipientRequest,
  Quote,
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
    requirements: builder.query<
      AccountRequirements[],
      { amount: number; currency: string }
    >({
      async queryFn(arg, api, extraOptions, baseQuery) {
        const quoteRes = await baseQuery({
          url: `/${v(1)}/wise-proxy/v3/profiles/{{profileId}}/quotes`,
          method: "POST",
          body: {
            sourceCurrency: "USD",
            targetCurrency: arg.currency,
            sourceAmount: arg.amount,
          },
        });

        if (quoteRes.error) {
          return { error: { status: 500, data: "failed to get quote" } };
        }
        const quote = quoteRes.data as Quote;

        const requirementsRes = await baseQuery({
          url: `/${v(1)}/wise-proxy/v1/quotes/${quote.id}/account-requirements`,
          headers: { "Accept-Minor-Version": "1" },
        });

        const requirements = requirementsRes.data as AccountRequirements[];

        if (requirementsRes.error) {
          return { error: { status: 500, data: "failed to get quote" } };
        }

        return { data: requirements };
      },
    }),
  }),
});

export const {
  useCreateRecipientMutation,
  useRecipientQuery,
  useCurrencisQuery,
  useRequirementsQuery,
} = wise;
