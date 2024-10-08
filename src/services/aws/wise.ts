import type {
  AccountRequirements,
  CreateRecipientRequest,
  Quote,
  V1RecipientAccount,
  V2RecipientAccount,
  WiseCurrency,
} from "types/aws";
import type { Currency } from "types/components";
import { aws } from "../aws/aws";
import { version as v } from "../helpers";

const baseURL = `/${v(1)}/wise-proxy`;

const wise = aws.injectEndpoints({
  endpoints: (builder) => ({
    createRecipient: builder.mutation<
      V1RecipientAccount,
      CreateRecipientRequest
    >({
      query: (payload) => {
        return {
          url: `${baseURL}/v1/accounts`,
          method: "POST",
          body: payload,
          headers: { "Content-Type": "application/json" },
        };
      },
    }),
    recipient: builder.query<V2RecipientAccount, string>({
      query: (id: string) => `${baseURL}/v2/accounts/${id}`,
    }),
    wiseCurrencies: builder.query<Currency[], unknown>({
      query: () => `${baseURL}/v1/currencies`,
      transformResponse: (res: WiseCurrency[]) =>
        res.map((r) => ({ rate: null, code: r.code, name: r.name })),
    }),

    newRequirements: builder.mutation<
      AccountRequirements[],
      {
        quoteId: string;
        request: CreateRecipientRequest;
        amount: number;
        currency: string;
      }
    >({
      query: ({ quoteId, request }) => {
        return {
          method: "POST",
          url: `${baseURL}/v1/quotes/${quoteId}/account-requirements`,
          headers: { "Accept-Minor-Version": "1" },
          body: request,
        };
      },
      async onQueryStarted({ currency, amount }, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(
          wise.util.updateQueryData(
            "requirements",
            { currency, amount },
            (draft) => {
              draft.requirements = data;
            }
          )
        );
      },
    }),

    requirements: builder.query<
      { requirements: AccountRequirements[]; quoteId: string },
      { amount: number; currency: string }
    >({
      async queryFn(arg, _api, _extraOptions, baseQuery) {
        const quoteRes = await baseQuery({
          url: `${baseURL}/v3/profiles/{{profileId}}/quotes`,
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
          url: `${baseURL}/v1/quotes/${quote.id}/account-requirements`,
          headers: { "Accept-Minor-Version": "1" },
        });

        const requirements = requirementsRes.data as AccountRequirements[];

        if (requirementsRes.error) {
          return { error: { status: 500, data: "failed to get quote" } };
        }

        return { data: { requirements, quoteId: quote.id } };
      },
    }),
  }),
});

export const {
  useCreateRecipientMutation,
  useRecipientQuery,
  useWiseCurrenciesQuery,
  useRequirementsQuery,
  useNewRequirementsMutation,
} = wise;
