import {
  CharityApplication,
  RegistrationStatus,
} from "pages/Admin/Applications/types";
import createAuthToken, { UserTypes } from "helpers/createAuthToken";
import { aws } from "./aws";
import { admin, tags } from "./tags";
import {
  AWSQueryRes,
  Charity,
  ContactDetailsData,
  ContactDetailsRequest,
  UpdateApplication,
  UpdateCharityMetadataData,
  UpdateCharityMetadataResult,
  UpdateDocumentationData,
  UpdateDocumentationResult,
} from "./types";

// need this mostly for /registration endpoints
const headers = {
  authorization: createAuthToken(UserTypes.CHARITY_OWNER),
};

const registration_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    checkPreviousRegistration: builder.mutation<Charity, string | undefined>({
      query: (uuid) => {
        return {
          url: "registration",
          method: "GET",
          params: { uuid: uuid },
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
      query: (data) => {
        return {
          url: "registration/build-email",
          method: "POST",
          params: { uuid: data.uuid, type: data.type },
          headers,
          body: data.body,
        };
      },
      transformResponse: (response: { data: any }) => response,
    }),
    updateCharityApplication: builder.mutation<any, UpdateApplication>({
      query: (data) => {
        return {
          url: "registration",
          method: "PUT",
          params: { uuid: data.PK },
          headers,
          body: data,
        };
      },
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
      query: (data) => {
        return {
          url: "registration",
          method: "PUT",
          params: { uuid: data.PK },
          headers,
          body: data.body,
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
  useCheckPreviousRegistrationMutation,
  useCreateNewCharityMutation,
  useGetCharityApplicationsQuery,
  useRequestEmailMutation,
  useUpdateCharityApplicationMutation,
  useUpdateCharityMetadataMutation,
  useUpdateDocumentationMutation,
  useUpdatePersonDataMutation,
} = registration_api;
