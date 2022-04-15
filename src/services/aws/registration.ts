import { aws } from "./aws";
import {
  CharityData,
  ContactDetailsData,
  UpdateCharityMetadataData,
  UpdateCharityMetadataResult,
  UpdateDocumentationData,
  UpdateDocumentationResult,
} from "./types";

const registration_api = aws.injectEndpoints({
  endpoints: (builder) => ({
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
    checkPreviousRegistration: builder.mutation<
      CharityData,
      string | undefined
    >({
      query: (uuid) => {
        return {
          url: "registration",
          params: { uuid: uuid },
          method: "GET",
        };
      },
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
    createNewCharity: builder.mutation<any, ContactDetailsData>({
      query: ({ body }) => ({
        url: "registration",
        method: "POST",
        body,
      }),
      transformResponse: (response: { data: any }) => response,
    }),
    updatePersonData: builder.mutation<any, ContactDetailsData>({
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
      transformResponse: (response: { data: UpdateDocumentationResult }) => {
        return response.data;
      },
    }),
    updateCharityMetadata: builder.mutation<
      UpdateCharityMetadataResult,
      UpdateCharityMetadataData
    >({
      query: (data) => {
        return {
          url: "registration",
          params: { uuid: data.PK },
          method: "PUT",
          body: data.body,
        };
      },
      transformResponse: (response: { data: UpdateCharityMetadataResult }) => {
        return response.data;
      },
    }),
  }),
});
export const {
  useCheckPreviousRegistrationMutation,
  useCreateNewCharityMutation,
  useRequestEmailMutation,
  useGetRegisteredCharitiesMutation,
  useUpdatePersonDataMutation,
  useUpdateDocumentationMutation,
  useUpdateCharityMetadataMutation,
} = registration_api;
