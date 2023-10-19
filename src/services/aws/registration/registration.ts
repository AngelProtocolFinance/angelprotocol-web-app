import { FiscalSponsorhipAgreementSigner } from "../../types";
import {
  ContactUpdateResult,
  DocsUpdateResult,
  InitApplication,
  RegistrationUpdate,
  SavedRegistration,
  SubmitResult,
} from "types/aws";
import { adminTags } from "services/aws/tags";
import { logger } from "helpers";
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
      query: ({ type, reference, ...payload }) => {
        return {
          url: "v3/registration",
          method: "PUT",
          params: { uuid: reference },
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
      async onQueryStarted({ type, reference }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            registration_api.util.updateQueryData("reg", reference, (draft) => {
              switch (type) {
                case "contact details":
                  {
                    const { ContactPerson, Registration } =
                      data as ContactUpdateResult;
                    draft.ContactPerson = Object.assign(
                      draft.ContactPerson,
                      ContactPerson
                    );
                    draft.Registration = {
                      ...draft.Registration,
                      OrganizationName: Registration.OrganizationName,
                    };
                  }
                  break;
                case "documentation": {
                  draft.Registration = Object.assign(
                    draft.Registration,
                    data as DocsUpdateResult
                  );
                  break;
                }
              }
              draft.reqId = draft.reqId + 1;
            })
          );
        } catch (err) {
          logger.error(err);
        }
      },
    }),

    submit: builder.mutation<SubmitResult, { ref: string; chain_id: string }>({
      invalidatesTags: [{ type: "admin", id: adminTags.registration }],
      query: ({ ref, chain_id }) => ({
        url: `${v(3)}/registration/${ref}/submit`,
        method: "POST",
        body: { chain_id },
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
