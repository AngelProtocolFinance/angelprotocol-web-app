import {
  CharityApplication,
  RegistrationStatus,
} from "pages/Admin/Applications/types";
import createAuthToken from "helpers/createAuthToken";
import { aws } from "./aws";
import { admin, tags } from "./tags";
import {
  AWSQueryRes,
  Charity,
  ContactDetailsData,
  ContactDetailsRequest,
  SubmitData,
  SubmitResult,
  UpdateCharityMetadataData,
  UpdateCharityMetadataResult,
  UpdateDocumentationData,
  UpdateDocumentationResult,
} from "./types";

const headers = {
  authorization: createAuthToken("charity-owner"),
};

const registration_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    activate: builder.mutation<{ isActive: boolean }, string | undefined>({
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
      ContactDetailsData,
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
      providesTags: [{ type: tags.admin, id: admin.applications }],
      query: (status?: RegistrationStatus) => {
        return {
          url: `registration/list${status ? `?regStatus=${status}` : ""}`,
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
      ContactDetailsData,
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
  useActivateMutation,
  useCheckPreviousRegistrationMutation,
  useCreateNewCharityMutation,
  useGetCharityApplicationsQuery,
  useRequestEmailMutation,
  useSubmitMutation,
  useUpdateCharityMetadataMutation,
  useUpdateDocumentationMutation,
  useUpdatePersonDataMutation,
} = registration_api;
