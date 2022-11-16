import { SavedRegistration } from "./regtypes";
import { RegistrationState, getRegistrationState } from "./types";
import { ApplicationStatusOptions } from "slices/admin/types";
import {
  AWSQueryRes,
  Application,
  ContactDetailsRequest,
  ContactDetailsResult,
  EndowmentApplication,
  SubmitData,
  SubmitResult,
  UnprocessedApplication,
  UpdateDocumentationData,
  UpdateDocumentationResult,
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
    newApplication: builder.mutation<any, { email: string }>({
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

    registration: builder.query<Application, string | undefined | null>({
      providesTags: [{ type: awsTags.admin, id: adminTags.registration }],
      query: (uuid) => {
        return {
          url: "v1/registration",
          params: { uuid },
        };
      },
      transformResponse: ({
        ContactPerson: cp,
        Registration: r,
        Metadata: m,
      }: UnprocessedApplication) => {
        return {
          ContactPerson: cp,
          Registration: {
            AuditedFinancialReports: r.AuditedFinancialReports || [],
            AuditedFinancialReportsVerified:
              r.AuditedFinancialReportsVerified || false,
            OrganizationName: r.OrganizationName,
            OrganizationName_ContactEmail:
              r.OrganizationName_ContactEmail || "",
            FinancialStatements: r.FinancialStatements || [],
            FinancialStatementsVerified: r.FinancialStatementsVerified || false,
            ProofOfIdentity: r.ProofOfIdentity,
            ProofOfIdentityVerified: r.ProofOfIdentityVerified || false,
            ProofOfRegistration: r.ProofOfRegistration,
            ProofOfRegistrationVerified: r.ProofOfRegistrationVerified || false,
            RegistrationDate: r.RegistrationDate,
            RegistrationStatus: r.RegistrationStatus,
            SK: "Registration",
            Tier: r.Tier,
            UN_SDG: r.UN_SDG,
            Website: r.Website || "",
          },
          Metadata: {
            Banner: m.Banner,
            Logo: m.Logo,
            Overview: m.Overview || "",
            EndowmentId: m.EndowmentId || 0,
            SK: "Metadata",
            JunoWallet: m.JunoWallet || "",
            KycDonorsOnly: m.KycDonorsOnly || false,
          },
        };
      },
    }),
    createNewApplication: builder.mutation<
      ContactDetailsResult,
      ContactDetailsRequest
    >({
      invalidatesTags: [{ type: awsTags.admin, id: adminTags.registration }],
      query: ({ body }) => ({
        url: "v2/registration",
        method: "POST",
        body,
      }),
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
    //TODO:proper typings
    requestEmail: builder.mutation<
      any,
      { uuid: string; type: string; body: any }
    >({
      invalidatesTags: [{ type: awsTags.admin, id: adminTags.registration }],
      query: ({ uuid, type, body }) => {
        return {
          url: "v2/registration/build-email",
          method: "POST",
          params: { uuid, type },
          body,
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
    updateMetadata: builder.mutation<
      UpdateMetadataResult,
      UpdateMetadataRequest
    >({
      invalidatesTags: [{ type: awsTags.admin, id: adminTags.registration }],
      query: ({ PK, body }) => {
        return {
          url: "v2/registration",
          method: "PUT",
          params: { uuid: PK },
          body,
        };
      },
    }),
    updateDocumentation: builder.mutation<
      UpdateDocumentationResult,
      UpdateDocumentationData
    >({
      invalidatesTags: [{ type: awsTags.admin, id: adminTags.registration }],
      query: ({ PK, body }) => {
        return {
          url: "v2/registration",
          method: "PUT",
          params: { uuid: PK },
          body,
        };
      },
    }),
    updatePersonData: builder.mutation<
      ContactDetailsResult,
      ContactDetailsRequest
    >({
      invalidatesTags: [{ type: awsTags.admin, id: adminTags.registration }],
      query: ({ PK, body }) => {
        return {
          url: "v2/registration",
          method: "PUT",
          params: { uuid: PK },
          body,
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
  useNewApplicationMutation,
  useCreateNewApplicationMutation,
  useRequestEmailMutation,
  useSubmitMutation,
  useUpdateMetadataMutation,
  useUpdateDocumentationMutation,
  useUpdatePersonDataMutation,

  util: { updateQueryData: updateRegQueryData },
} = registration_api;

export const useRegistrationQuery = () => {
  const regRef = getSavedRegistrationReference();
  const { data, ...rest } = registration_api.useRegistrationQuery(regRef, {
    skip: !regRef,
  });

  // necessary to assign the placeholderApplication this way to avoid a bug when reading Charity
  // data in Registration.tsx, because the following happens:
  // 1. continue a registration using a ref ID
  // 2. application data read in Registration using this ref ID
  // 3. application data read in any step of the flow using this ref ID
  // 4. go back to Landing page (https://.../register)
  // 5. click "Start" to start new registration -> ref ID is cleared and application data cache should be cleared, but
  //    due to some race condition, the Registration page reads the cached data before the clearing
  // 6. different application data is read in Registration.tsx than in other steps
  const application = !regRef || !data ? placeholderApplication : data;

  return { application, ...rest };
};

export const {
  registration: { useLazyQuery: useRegistrationLazyQuery },
} = registration_api.endpoints;
