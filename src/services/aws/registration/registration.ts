import { FiscalSponsorhipAgreementSigner } from "../../types";
import {
  InitApplication,
  RegistrationUpdate,
  SavedRegistration,
  SubmitResult,
} from "types/aws";
import { adminTags } from "services/aws/tags";
import { TEMP_JWT } from "constants/auth";
import { EMAIL_SUPPORT } from "constants/env";
import { version as v } from "../../helpers";
import { aws } from "../aws";

const registration_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    newApplication: builder.mutation<
      Pick<InitApplication, "Registration" | "ContactPerson">,
      { email: string }
    >({
      invalidatesTags: [{ type: "admin", id: adminTags.registration }],
      query: ({ email }) => ({
        url: `${v(4)}/registration`,
        method: "POST",
        body: { Email: email },
        headers: { authorization: TEMP_JWT },
      }),
    }),
    reg: builder.query<SavedRegistration, string>({
      providesTags: [{ type: "admin", id: adminTags.registration }],
      query: (uuid) => {
        return {
          url: "v1/registration",
          params: { uuid },
        };
      },
      transformResponse(res: SavedRegistration) {
        return { ...res, reqId: 0 };
      },
    }),
    fiscalSponsorshipAgreementSigningURL: builder.mutation<
      { url: string },
      FiscalSponsorhipAgreementSigner
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
    updateReg: builder.mutation<any, RegistrationUpdate>({
      invalidatesTags: [{ type: "admin", id: adminTags.registration }],
      query: ({ reference, ...payload }) => {
        return {
          url: `v5/registration/${reference}`,
          method: "PUT",
          body: payload,
        };
      },
      transformErrorResponse(res, _meta, { type }) {
        return {
          status: res.status,
          data: `Failed to update ${type}. Please try again later.`,
        };
      },
    }),

    submit: builder.mutation<SubmitResult, string>({
      invalidatesTags: [{ type: "admin", id: adminTags.registration }],
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
  useNewApplicationMutation,
  useSubmitMutation,
} = registration_api;
