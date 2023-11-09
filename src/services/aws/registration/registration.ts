import { FiscalSponsorhipAgreementSigner } from "../../types";
import {
  InitReg,
  RegistrationUpdate,
  SavedRegistration,
  SubmissionStatus,
} from "types/aws";
import { adminTags } from "services/aws/tags";
import { logger } from "helpers";
import { EMAIL_SUPPORT } from "constants/env";
import { version as v } from "../../helpers";
import { aws } from "../aws";

const registration_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    newApplication: builder.mutation<InitReg, { email: string }>({
      invalidatesTags: [{ type: "admin", id: adminTags.registration }],
      query: ({ email }) => ({
        url: "v3/registration",
        method: "POST",
        body: { Email: email },
      }),
    }),
    reg: builder.query<SavedRegistration & { reqId: number }, string>({
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
      query: (signer) => {
        return {
          url: `${v(1)}/registration/fiscal-sponsorship-agreement`,
          method: "POST",
          body: {
            signer,
            redirectURL: `${window.location.origin}/register/sign-result`,
          },
        };
      },
    }),
    updateReg: builder.mutation<any, RegistrationUpdate>({
      query: ({ uuid, ...payload }) => {
        return {
          url: `v4/registration/${uuid}`,
          method: "PUT",
          body: payload,
        };
      },
      transformErrorResponse(res, meta, { type }) {
        return {
          status: res.status,
          data: `Failed to update ${type}. Please try again later.`,
        };
      },
      /** pessimistic manual cache update so not to GET fresh data */
      async onQueryStarted({ uuid }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            registration_api.util.updateQueryData("reg", uuid, (draft) => {
              Object.assign(draft, data);
              draft.reqId = draft.reqId + 1;
            })
          );
        } catch (err) {
          logger.error(err);
        }
      },
    }),

    submit: builder.mutation<SubmissionStatus, string>({
      invalidatesTags: [{ type: "admin", id: adminTags.registration }],
      query: (uuid) => ({
        url: `${v(4)}/registration/${uuid}/submit`,
        method: "POST",
      }),
      transformErrorResponse(err, meta, arg) {
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
