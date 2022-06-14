import { string } from "yup";
import {
  AWSQueryRes,
  ApplicationStatusOptions,
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
import { adminTags } from "services/terra/tags";
import createAuthToken from "helpers/createAuthToken";
import { aws } from "./aws";
import { awsTags } from "./tags";

const headers = {
  authorization: createAuthToken("charity-owner"),
};

const registration_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.query<Charity, string>({
      providesTags: [{ type: awsTags.admin, id: adminTags.registration }],
      query: (uuid) => {
        return {
          url: "registration",
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
          ContactPerson: {
            Email: cp.Email,
            EmailVerified: cp.EmailVerified,
            Goals: cp.Goals,
            FirstName: cp.FirstName,
            LastName: cp.LastName,
            OtherRole: cp.OtherRole,
            OtherReferralMethod: cp.OtherReferralMethod,
            PhoneNumber: cp.PhoneNumber,
            PK: cp.PK,
            ReferralMethod: cp.ReferralMethod,
            Role: cp.Role,
            SK: "ContactPerson",
          },
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
            TerraWallet: m.TerraWallet || "",
            KycDonorsOnly: m.KycDonorsOnly || false,
          },
        };
      },
    }),
    activateCharity: builder.mutation<any, string | undefined>({
      query: (PK) => ({
        url: `registration/${PK}/activate`,
        method: "POST",
        headers,
      }),
    }),
    checkPreviousRegistration: builder.mutation<Charity, string | undefined>({
      query: (uuid) => {
        return {
          url: "registration",
          method: "GET",
          params: { uuid },
          headers,
        };
      },
    }),
    createNewCharity: builder.mutation<
      ContactDetailsResult,
      ContactDetailsRequest
    >({
      query: ({ body }) => ({
        url: "registration",
        method: "POST",
        headers,
        body,
      }),
    }),
    getCharityApplications: builder.query<any, any>({
      providesTags: [{ type: awsTags.admin, id: adminTags.applications }],
      query: (status: ApplicationStatusOptions) => {
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
  useCheckPreviousRegistrationMutation,
  useCreateNewCharityMutation,
  useGetCharityApplicationsQuery,
  useRequestEmailMutation,
  useSubmitMutation,
  useUpdateCharityMetadataMutation,
  useUpdateDocumentationMutation,
  useUpdatePersonDataMutation,
} = registration_api;
