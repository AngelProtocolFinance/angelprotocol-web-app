import {
  AWSQueryRes,
  ApplicationStatusOptions,
  Charity,
  CharityApplication,
  ContactDetailsRequest,
  ContactDetailsData as ContactDetailsResult,
  SubmitData,
  SubmitResult,
  UpdateCharityMetadataData,
  UpdateCharityMetadataResult,
  UpdateDocumentationData,
  UpdateDocumentationResult,
} from "types/server/aws";
import createAuthToken from "helpers/createAuthToken";
import { aws } from "./aws";
import { adminTags, awsTags } from "./tags";

const headers = {
  authorization: createAuthToken("charity-owner"),
};

const registration_api = aws.injectEndpoints({
  endpoints: (builder) => ({
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
