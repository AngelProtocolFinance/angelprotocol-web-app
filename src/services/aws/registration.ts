import {
  CharityApplication,
  RegistrationStatus,
} from "pages/Admin/Applications/types";
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

const registration_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    checkPreviousRegistration: builder.mutation<Charity, string | undefined>({
      query: (uuid) => {
        return {
          url: "registration",
          params: { uuid: uuid },
          method: "GET",
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
        body,
      }),
    }),
    getCharityApplications: builder.query<any, any>({
      providesTags: [{ type: tags.admin, id: admin.applications }],
      query: (status?: RegistrationStatus) => {
        return {
          url: `registration/list${status ? `?regStatus=${status}` : ""}`,
          method: "Get",
        };
      },
      transformResponse: (response: AWSQueryRes<CharityApplication[]>) =>
        response.Items,
    }),
    getRegisteredCharities: builder.mutation<any, any>({
      query: (data) => {
        if (data) {
          return {
            url: "registration/list",
            params: { regStatus: data.regStatus },
            method: "GET",
          };
        } else {
          return {
            url: "registration/list",
            method: "GET",
          };
        }
      },
      transformResponse: (response: { data: any }) => response,
    }),
    //TODO:proper typings
    requestEmail: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: "registration/build-email",
          params: { uuid: data.uuid, type: data.type },
          method: "POST",
          body: data.body,
        };
      },
      transformResponse: (response: { data: any }) => response,
    }),
    updateCharityApplication: builder.mutation<any, UpdateApplication>({
      query: (data) => {
        return {
          url: "registration",
          params: { uuid: data.PK },
          method: "PUT",
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
          params: { uuid: PK },
          method: "PUT",
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
          params: { uuid: data.PK },
          method: "PUT",
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
          params: { uuid: PK },
          method: "PUT",
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
  useGetRegisteredCharitiesMutation,
  useRequestEmailMutation,
  useUpdateCharityApplicationMutation,
  useUpdateCharityMetadataMutation,
  useUpdateDocumentationMutation,
  useUpdatePersonDataMutation,
} = registration_api;
