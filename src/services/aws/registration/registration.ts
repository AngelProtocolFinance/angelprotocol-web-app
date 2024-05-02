import { TEMP_JWT } from "constants/auth";
import { EMAIL_SUPPORT } from "constants/env";
import { logger } from "helpers";
import { apiEnv } from "services/constants";
import {
  ContactUpdateResult,
  EndowClaim,
  InitApplication,
  RegistrationUpdate,
  SavedRegistration,
  SubmitResult,
} from "types/aws";
import { version as v } from "../../helpers";
import { FiscalSponsorhipAgreementSigner } from "../../types";
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
    reg: builder.query<SavedRegistration, string>({
      providesTags: ["registration"],
      query: (uuid) => {
        return {
          url: `v5/registration/${apiEnv}`,
          params: { uuid },
          headers: { authorization: TEMP_JWT },
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
      query: ({ reference, ...payload }) => {
        return {
          url: `v7/registration/${reference}`,
          method: "PATCH",
          body: payload,
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
          const { type, reference } = args;
          const { data } = await queryFulfilled;
          dispatch(
            registration_api.util.updateQueryData("reg", reference, (draft) => {
              switch (type) {
                case "contact-details":
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

                //other updates are to draft.Registration
                default: {
                  let tempData = data;

                  // since `wise_recipient_id` is not returned as a result of updateReg,
                  // (only `BankStatementFile` is returned), we need to pass it manually
                  // and set/update it in the draft.Registration
                  if (type === "banking") {
                    tempData = Object.assign({}, data, {
                      wise_recipient_id: args.wise_recipient_id,
                    });
                  }

                  draft.Registration = Object.assign(
                    draft.Registration,
                    tempData
                  );
                }
              }
            })
          );
        } catch (err) {
          logger.error(err);
        }
      },
    }),
    submit: builder.mutation<SubmitResult, string>({
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
