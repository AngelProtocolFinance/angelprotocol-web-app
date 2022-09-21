import { ApplicationStatusOptions } from "slices/admin/types";
import {
  AWSQueryRes,
  Charity,
  CharityApplication,
  ContactDetailsRequest,
  ContactDetailsData as ContactDetailsResult,
  SubmitData,
  SubmitResult,
  UnprocessedCharity,
  UpdateCharityMetadataData,
  UpdateCharityMetadataResult,
  UpdateDocumentationData,
  UpdateDocumentationResult,
} from "types/aws";
import { adminTags } from "services/aws/tags";
import { getSavedRegistrationReference } from "helpers";
import { createAuthToken } from "helpers";
import { aws } from "../aws";
import { awsTags } from "../tags";
import { placeholderCharity } from "./placeholders";

const headers = {
  authorization: createAuthToken("charity-owner"),
};

const registration_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.query<Charity, string | undefined | null>({
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
      }: UnprocessedCharity) => {
        return {
          ContactPerson: cp,
          Registration: {
            AuditedFinancialReports: r.AuditedFinancialReports || [],
            AuditedFinancialReportsVerified:
              r.AuditedFinancialReportsVerified || false,
            CharityName: r.CharityName,
            CharityName_ContactEmail: r.CharityName_ContactEmail || "",
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
            CharityLogo: m.CharityLogo,
            CharityOverview: m.CharityOverview || "",
            EndowmentContract: m.EndowmentContract || "",
            EndowmentId: m.EndowmentId || 0,
            SK: "Metadata",
            JunoWallet: m.JunoWallet || "",
            KycDonorsOnly: m.KycDonorsOnly || false,
          },
        };
      },
    }),
    createNewCharity: builder.mutation<
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
    charityApplications: builder.query<
      CharityApplication[],
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
      transformResponse: (response: AWSQueryRes<CharityApplication[]>) =>
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
    updateCharityMetadata: builder.mutation<
      UpdateCharityMetadataResult,
      UpdateCharityMetadataData
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
  useCreateNewCharityMutation,
  useCharityApplicationsQuery,
  useRequestEmailMutation,
  useSubmitMutation,
  useUpdateCharityMetadataMutation,
  useUpdateDocumentationMutation,
  useUpdatePersonDataMutation,
  util: { updateQueryData: updateRegQueryData },
} = registration_api;

export const useRegistrationQuery = () => {
  const regRef = getSavedRegistrationReference();
  const { data: charity = placeholderCharity, ...rest } =
    registration_api.useRegistrationQuery(regRef, {
      skip: !regRef,
    });
  return { charity, ...rest };
};

export const {
  registration: { useLazyQuery: useRegistrationLazyQuery },
} = registration_api.endpoints;
