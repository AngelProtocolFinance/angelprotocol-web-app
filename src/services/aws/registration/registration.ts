import { ApplicationStatusOptions } from "slices/admin/types";
import {
  AWSQueryRes,
  ContactUpdateResult,
  DocsUpdateResult,
  EndowmentProposal,
  InitApplication,
  RegistrationUpdate,
  SavedRegistration,
  SubmitResult,
  WalletUpdateResult,
} from "types/aws";
import { adminTags } from "services/aws/tags";
import { logger } from "helpers";
import { EMAIL_SUPPORT } from "constants/common";
import { aws } from "../aws";

const registration_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    newApplication: builder.mutation<
      Pick<InitApplication, "Registration" | "ContactPerson">,
      { email: string }
    >({
      invalidatesTags: [{ type: "admin", id: adminTags.registration }],
      query: ({ email }) => ({
        url: "v2/registration",
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
    updateReg: builder.mutation<
      any,
      RegistrationUpdate & { reference: string }
    >({
      query: ({ type, reference, ...payload }) => {
        return {
          url: "v2/registration",
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
                case "wallet": {
                  draft.Metadata = Object.assign(
                    draft.Metadata,
                    data as WalletUpdateResult
                  );
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

    endowmentApplications: builder.query<
      EndowmentProposal[],
      ApplicationStatusOptions
    >({
      providesTags: [{ type: "admin", id: adminTags.applications }],
      query: (status) => {
        return {
          url: `v2/registration/list${
            status !== "all" ? `?regStatus=${status}` : ""
          }`,
          method: "Get",
        };
      },
      transformResponse: (response: AWSQueryRes<EndowmentProposal[]>) =>
        response.Items,
    }),
    /**TODO this should return a value
     * { isEmailVerified } so to redirect already verified user if trying to
     * verify again
     */
    requestEmail: builder.mutation<any, { uuid: string; email: string }>({
      invalidatesTags: [{ type: "admin", id: adminTags.registration }],
      query: ({ uuid, email }) => {
        return {
          url: "v2/registration/build-email",
          method: "POST",
          params: { uuid, type: "verify-email" },
          body: { Email: email },
        };
      },
      transformResponse: (response: { data: any }) => response,
    }),
    submit: builder.mutation<SubmitResult, { ref: string; chain_id: string }>({
      invalidatesTags: [{ type: "admin", id: adminTags.registration }],
      query: ({ ref, chain_id }) => ({
        url: `v3/registration/${ref}/submit`,
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
  useEndowmentApplicationsQuery,

  //mutations
  useUpdateRegMutation,
  useNewApplicationMutation,
  useRequestEmailMutation,
  useSubmitMutation,
  util: { updateQueryData: updateRegQueryData },
} = registration_api;
