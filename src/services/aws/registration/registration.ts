import {
  InitApplication,
  RegistrationUpdate,
  SavedRegistration,
} from "./regtypes";
import { RegistrationState, getRegistrationState } from "./types";
import { ApplicationStatusOptions } from "slices/admin/types";
import {
  AWSQueryRes,
  Application,
  EndowmentApplication,
  SubmitData,
  SubmitResult,
  UnprocessedApplication,
  UpdateMetadataRequest,
  UpdateMetadataResult,
} from "types/aws";
import { adminTags } from "services/aws/tags";
import { getSavedRegistrationReference } from "helpers";
import { aws } from "../aws";
import { awsTags } from "../tags";
import { placeholderApplication } from "./placeholders";

const registration_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    newApplication: builder.mutation<
      Pick<InitApplication, "Registration" | "ContactPerson">,
      { email: string }
    >({
      invalidatesTags: [{ type: awsTags.admin, id: adminTags.registration }],
      query: ({ email }) => ({
        url: "v2/registration",
        method: "POST",
        body: { Email: email },
      }),
    }),
    reg: builder.query<RegistrationState, string>({
      providesTags: [{ type: awsTags.admin, id: adminTags.registration }],
      query: (uuid) => {
        return {
          url: "v1/registration",
          params: { uuid },
        };
      },
      transformResponse(res: SavedRegistration) {
        return getRegistrationState(res);
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
      //invalidate tags only if there's no error
      invalidatesTags: (res, error) =>
        error ? [] : [{ type: awsTags.admin, id: adminTags.registration }],
      transformErrorResponse(res, meta, { type }) {
        return {
          status: res.status,
          data: `Failed to update ${type}. Please try again later.`,
        };
      },
    }),

    endowmentApplications: builder.query<
      EndowmentApplication[],
      ApplicationStatusOptions
    >({
      providesTags: [{ type: awsTags.admin, id: adminTags.applications }],
      query: (status) => {
        return {
          url: `v2/registration/list${
            status !== "all" ? `?regStatus=${status}` : ""
          }`,
          method: "Get",
        };
      },
      transformResponse: (response: AWSQueryRes<EndowmentApplication[]>) =>
        response.Items,
    }),
    /**TODO this should return a value
     * { isEmailVerified } so to redirect already verified user if trying to
     * verify again
     */
    requestEmail: builder.mutation<any, { uuid: string; email: string }>({
      invalidatesTags: [{ type: awsTags.admin, id: adminTags.registration }],
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
    submit: builder.mutation<SubmitResult, SubmitData>({
      invalidatesTags: [{ type: awsTags.admin, id: adminTags.registration }],
      query: ({ PK, chain_id }) => ({
        url: `v2/registration/${PK}/submit`,
        method: "POST",
        body: { chain_id },
      }),
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
