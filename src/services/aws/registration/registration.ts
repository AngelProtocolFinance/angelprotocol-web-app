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
import { createAuthToken } from "helpers";
import { aws } from "../aws";
import { awsTags } from "../tags";
import { placeholderApplication } from "./placeholders";

const headers = {
  authorization: createAuthToken("charity-owner"),
};

const registration_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.query<Application, string | undefined | null>({
      providesTags: [{ type: awsTags.admin, id: adminTags.registration }],
      query: (uuid) => {
        return {
          url: "v1/registration",
          params: { uuid },
          headers,
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
            EndowmentContract: m.EndowmentContract || "",
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
        url: "v1/registration",
        method: "POST",
        headers,
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
          url: `v1/registration/list${
            status !== "all" ? `?regStatus=${status}` : ""
          }`,
          method: "Get",
          headers,
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
          url: "v1/registration/build-email",
          method: "POST",
          params: { uuid, type },
          headers,
          body,
        };
      },
      transformResponse: (response: { data: any }) => response,
    }),
    submit: builder.mutation<SubmitResult, SubmitData>({
      invalidatesTags: [{ type: awsTags.admin, id: adminTags.registration }],
      query: ({ PK, EndowmentContract }) => ({
        url: `v1/registration/${PK}/submit`,
        method: "POST",
        headers,
        body: { EndowmentContract },
      }),
    }),
    updateMetadata: builder.mutation<
      UpdateMetadataResult,
      UpdateMetadataRequest
    >({
      invalidatesTags: [{ type: awsTags.admin, id: adminTags.registration }],
      query: ({ PK, body }) => {
        return {
          url: "v1/registration",
          method: "PUT",
          params: { uuid: PK },
          headers,
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
          url: "v1/registration",
          method: "PUT",
          params: { uuid: PK },
          headers,
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
          url: "v1/registration",
          method: "PUT",
          params: { uuid: PK },
          headers,
          body,
        };
      },
    }),
  }),
});
export const {
  useCreateNewApplicationMutation,
  useEndowmentApplicationsQuery,
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

  // necessary to assign the placeholderCharity this way to avoid a bug when reading Charity
  // data in Registration.tsx, because the following happens:
  // 1. continue a registration using a ref ID
  // 2. charity data read in Registration using this ref ID
  // 3. charity data read in any step of the flow using this ref ID
  // 4. go back to Landing page (https://.../register)
  // 5. click "Start" to start new registration -> ref ID is cleared and charity data cache should be cleared, but
  //    due to some race condition, the Registration page reads the cached data before the clearing
  // 6. different charity data is read in Registration.tsx than in other steps
  const application = !regRef || !data ? placeholderApplication : data;

  return { application, ...rest };
};

export const {
  registration: { useLazyQuery: useRegistrationLazyQuery },
} = registration_api.endpoints;
