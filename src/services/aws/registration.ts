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
} from "types/server/aws";
import { adminTags } from "services/aws/tags";
import { createAuthToken } from "helpers";
import { aws } from "./aws";
import { awsTags } from "./tags";

const headers = {
  authorization: createAuthToken("charity-owner"),
};

export const registrationRefKey = "__registration_ref";
const registration_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.query<Charity, string>({
      providesTags: [{ type: awsTags.admin, id: adminTags.registration }],
      query: (explicitRef /** pass "" to use savedRef */) => {
        const savedRef = localStorage.getItem(registrationRefKey) || "";
        return {
          url: "registration",
          params: { uuid: explicitRef || savedRef },
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
            ProofOfIdentity: r.ProofOfIdentity || { name: "" },
            ProofOfIdentityVerified: r.ProofOfIdentityVerified || false,
            ProofOfRegistration: r.ProofOfRegistration || { name: "" },
            ProofOfRegistrationVerified: r.ProofOfRegistrationVerified || false,
            RegistrationDate: r.RegistrationDate,
            RegistrationStatus: r.RegistrationStatus,
            SK: "Registration",
            Tier: r.Tier,
            UN_SDG: r.UN_SDG,
            Website: r.Website || "",
          },
          Metadata: {
            Banner: m.Banner || { name: "" },
            CharityLogo: m.CharityLogo || { name: "" },
            CharityOverview: m.CharityOverview || "",
            EndowmentContract: m.EndowmentContract || "",
            SK: "Metadata",
            JunoWallet: m.JunoWallet || "",
            KycDonorsOnly: m.KycDonorsOnly || false,
          },
        };
      },
    }),
    activateCharity: builder.mutation<any, string | undefined>({
      invalidatesTags: [{ type: awsTags.admin, id: adminTags.registration }],
      query: (PK) => ({
        url: `registration/${PK}/activate`,
        method: "POST",
        headers,
      }),
    }),
    createNewCharity: builder.mutation<
      ContactDetailsResult,
      ContactDetailsRequest
    >({
      //no tags to invalidate since registration still has to be confirmed
      query: ({ body }) => ({
        url: "registration",
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
          url: `registration/list${
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
    requestEmail: builder.mutation<any, any>({
      invalidatesTags: [{ type: awsTags.admin, id: adminTags.registration }],
      query: ({ uuid, type, body }) => {
        return {
          url: "registration/build-email",
          method: "POST",
          params: { uuid, type },
          headers,
          body,
        };
      },
      transformResponse: (response: { data: any }) => response,
    }),
    submit: builder.mutation<SubmitResult, SubmitData>({
      query: ({ PK, EndowmentContract }) => ({
        url: `registration/${PK}/submit`,
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
          url: "registration",
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
          url: "registration",
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
          url: "registration",
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
  useRegistrationQuery,
  useActivateCharityMutation,
  useCreateNewCharityMutation,
  useCharityApplicationsQuery,
  useRequestEmailMutation,
  useSubmitMutation,
  useUpdateCharityMetadataMutation,
  useUpdateDocumentationMutation,
  useUpdatePersonDataMutation,
  util: { updateQueryData: updateRegQueryData },
} = registration_api;

export const {
  registration: {
    useQueryState: useRegistrationState,
    useLazyQuery: useRegistrationLazyQuery,
  },
} = registration_api.endpoints;
