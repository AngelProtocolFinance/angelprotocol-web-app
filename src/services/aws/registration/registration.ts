import { TEMP_JWT } from "constants/auth";
import { EMAIL_SUPPORT } from "constants/env";
import { logger } from "helpers";
import type { EndowClaim, InitApplication, RegV2 } from "types/aws";
import { version as v } from "../../helpers";
import type { FSASigner } from "../../types";
import { aws } from "../aws";

const registration_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    newApplication: builder.query<
      Pick<InitApplication, "Registration" | "ContactPerson">,
      { email: string; claim?: EndowClaim }
    >({
      query: ({ email, claim }) => ({
        url: `${v(6)}/registration`,
        method: "POST",
        body: { Email: email, ...(claim && { InitClaim: claim }) },
        headers: { authorization: TEMP_JWT },
      }),
    }),
    reg: builder.query<RegV2.Record, string>({
      providesTags: ["registration"],
      query: (uuid) => {
        return {
          url: `${v(6)}/registration/${uuid}`,
          params: { uuid },
          headers: { authorization: TEMP_JWT },
        };
      },
      transformResponse(res: RegV2.Record) {
        return { ...res, reqId: 0 };
      },
    }),
    fiscalSponsorshipAgreementSigningURL: builder.mutation<
      { url: string },
      FSASigner
    >({
      //no need to invalidate registration as latest would be fetched on redirect/success
      query: (signer) => {
        return {
          url: `${v(2)}/registration/fiscal-sponsorship-agreement`,
          method: "POST",
          body: {
            signer,
            redirectURL: `${window.location.origin}/register/sign-result`,
          },
        };
      },
    }),
    updateReg: builder.mutation<RegV2.Record, RegV2.Update>({
      query: ({ id, type, ...val }) => {
        return {
          url: `${v(7)}/registration/${id}`,
          method: "PATCH",
          body: { type, val },
          headers: { authorization: TEMP_JWT },
        };
      },
      transformErrorResponse(res, _meta, { type }) {
        return {
          status: res.status,
          data: `Failed to update ${type}. Please try again later.`,
        };
      },
      /** pessimistic manual cache update so not to GET fresh data */
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { id } = args;
          const { data } = await queryFulfilled;
          dispatch(
            registration_api.util.updateQueryData("reg", id, (draft) => {
              Object.assign(draft, data);
            })
          );
        } catch (err) {
          logger.error(err);
        }
      },
    }),
    submit: builder.mutation<RegV2.Submission, string>({
      invalidatesTags: ["registration"],
      query: (referenceID) => ({
        url: `${v(5)}/registration/${referenceID}/submit`,
        method: "POST",
      }),
      transformErrorResponse(err) {
        return {
          status: err.status,
          data: `Registration submission failed. Contact ${EMAIL_SUPPORT}`,
        };
      },
    }),
  }),
});
export const {
  //queries
  useRegQuery,
  useLazyRegQuery,
  useFiscalSponsorshipAgreementSigningURLMutation,

  //mutations
  useUpdateRegMutation,
  useNewApplicationQuery,
  useSubmitMutation,
} = registration_api;
