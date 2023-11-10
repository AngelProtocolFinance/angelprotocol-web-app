import {
  AccountRequirements,
  CreateRecipientRequest,
  EndowmentProfile,
  Quote,
  WiseCurrency,
} from "types/aws";
import { aws } from "services/aws/aws";
import { version as v } from "../helpers";

export const bank_details_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    createQuote: builder.mutation<
      Quote,
      { targetCurrency: string; sourceAmount: number }
    >({
      query: ({ targetCurrency, sourceAmount }) => ({
        url: `/${v(1)}/wise`,
        method: "POST",
        body: {
          // AWS will replace `{{profileId}}` with the actual profile ID
          url: "/v3/profiles/{{profileId}}/quotes",
          method: "POST",
          payload: JSON.stringify({
            sourceCurrency: "USD",
            targetCurrency,
            sourceAmount,
          }),
        },
      }),
    }),
    createRecipientAccount: builder.mutation<
      EndowmentProfile,
      { PK: number; request: CreateRecipientRequest }
    >({
      query: ({ PK, request }) => ({
        url: `/${v(1)}/wise`,
        method: "POST",
        body: {
          method: "POST",
          url: "/v1/accounts",
          PK,
          payload: JSON.stringify(request),
        },
      }),
    }),
    getAccountRequirements: builder.mutation<AccountRequirements[], string>({
      query: (quoteId) => ({
        url: `/${v(1)}/wise`,
        method: "POST",
        body: {
          method: "GET",
          url: `/v1/quotes/${quoteId}/account-requirements`,
          headers: { "Accept-Minor-Version": "1" },
        },
      }),
    }),
    /**
     * Temporary endpoint to use until Wise API token is fixed.
     *
     * TODO: ONCE {@link getAccountRequirements} IS IN USE, THIS ENDPOINT CAN BE DELETED
     */
    getAccountRequirementsForRoute: builder.mutation<
      AccountRequirements[],
      { targetCurrency: string; sourceAmount: number }
    >({
      queryFn: ({ targetCurrency, sourceAmount }) =>
        fetch(
          `https://api.sandbox.transferwise.tech/v1/account-requirements?source=USD&target=${targetCurrency}&sourceAmount=${sourceAmount}`,
          { headers: { "Content-Type": "application/json" } }
        )
          .then<AccountRequirements[]>((res) => res.json())
          .then((value) => ({ data: value }))
          .catch((error) => ({
            error: {
              status: "CUSTOM_ERROR",
              error: "Error getting requirements",
              data: error,
            },
          })),
    }),
    getCurrencies: builder.mutation<WiseCurrency[], undefined>({
      query: () => ({
        url: `/${v(1)}/wise`,
        method: "POST",
        body: {
          method: "GET",
          url: `/v1/currencies`,
        },
      }),
    }),
    /**
     * This endpoint should be used to check whether additional requirement fields need to be loaded.
     *
     * As per docs:
     *    Use the GET endpoint to learn what datapoints are required to send a payment to your beneficiary.
     *    As you build that form, use the POST endpoint to learn if any additional datapoints are required as
     *    a result of passing a field that has "refreshRequirementsOnChange": true' in the GET Response.
     *    You should be posting the same recipient account payload that will be posted to v1/accounts.
     *
     * For more details see https://docs.wise.com/api-docs/api-reference/recipient#account-requirements
     */
    postAccountRequirements: builder.mutation<
      AccountRequirements,
      { quoteId: string; request: CreateRecipientRequest }
    >({
      query: ({ quoteId, request }) => ({
        url: `/${v(1)}/wise`,
        method: "POST",
        body: {
          method: "POST",
          url: `/v1/quotes/${quoteId}/account-requirements`,
          headers: { "Accept-Minor-Version": "1" },
          payload: JSON.stringify(request),
        },
      }),
    }),
  }),
});

export const {
  useCreateQuoteMutation,
  useCreateRecipientAccountMutation,
  useGetAccountRequirementsForRouteMutation,
  useGetAccountRequirementsMutation,
  useGetCurrenciesMutation,

  usePostAccountRequirementsMutation,
} = bank_details_api;
