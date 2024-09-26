import type { FsaPayload } from "@better-giving/registration/fsa";
import type { Submission } from "@better-giving/registration/models";
import type { Reg, Step1 } from "@better-giving/registration/step";
import type { NewReg, Update } from "@better-giving/registration/update";
import { TEMP_JWT } from "constants/auth";
import { EMAIL_SUPPORT } from "constants/env";
import { logger } from "helpers";
import { version as v } from "../../helpers";
import { aws } from "../aws";

const registration_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    newApplication: builder.query<Step1, NewReg>({
      query: (payload) => ({
        url: `${v(1)}/registrations`,
        method: "POST",
        body: payload,
        headers: { authorization: TEMP_JWT },
      }),
    }),
    reg: builder.query<Reg, string>({
      providesTags: ["registration"],
      query: (uuid) => {
        return {
          url: `${v(1)}/registrations/${uuid}`,
          params: { uuid },
          headers: { authorization: TEMP_JWT },
        };
      },
      transformResponse(res: Reg) {
        return { ...res, reqId: 0 };
      },
    }),
    fiscalSponsorshipAgreementSigningURL: builder.mutation<
      { url: string },
      FsaPayload["signer"]
    >({
      //no need to invalidate registration as latest would be fetched on redirect/success
      query: (signer) => {
        return {
          url: `${v(1)}/registration-fsa`,
          method: "POST",
          body: {
            signer,
            redirectUrl: `${window.location.origin}/register/sign-result`,
          } satisfies FsaPayload,
          headers: { authorization: TEMP_JWT },
        };
      },
    }),
    updateReg: builder.mutation<Reg, Update & { id: string }>({
      query: ({ id, ...payload }) => {
        return {
          url: `${v(1)}/registrations/${id}`,
          method: "PATCH",
          body: payload,
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
            registration_api.util.updateQueryData("reg", id, () => data)
          );
        } catch (err) {
          logger.error(err);
        }
      },
    }),
    submit: builder.mutation<Submission, string>({
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
