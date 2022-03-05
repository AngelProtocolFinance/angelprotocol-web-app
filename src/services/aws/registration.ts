import { aws } from "./aws";
import { UpdateDocumentationData, UpdateDocumentationResult } from "./types";

const registration_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    getRegisteredCharities: builder.mutation<any, any>({
      query: (data) => {
        if (data) {
          return {
            url: `registration/list`,
            params: { regStatus: data.regStatus },
            method: "GET",
          };
        } else {
          return {
            url: `registration/list`,
            method: "GET",
          };
        }
      },
      transformResponse: (response: { data: any }) => response,
    }),
    checkPreviousRegistration: builder.mutation<any, string>({
      query: (uuid) => {
        return {
          url: `registration`,
          params: { uuid: uuid },
          method: "GET",
        };
      },
      transformResponse: (response: { data: any }) => response,
    }),
    createCharityMetaData: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `registration`,
          params: { uuid: data.uuid },
          method: "POST",
          body: data.body,
        };
      },
      transformResponse: (response: { data: any }) => response,
    }),
    //TODO:proper typings
    requestEmail: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `registration/build-email`,
          params: { uuid: data.uuid, type: data.type },
          method: "POST",
          body: data.body,
        };
      },
      transformResponse: (response: { data: any }) => response,
    }),
    createNewCharity: builder.mutation<any, any>({
      query: (body) => ({
        url: "registration",
        method: "POST",
        body,
      }),
      transformResponse: (response: { data: any }) => response,
    }),
    updatePersonData: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `registration`,
          params: { uuid: data.ContactPerson.UUID },
          method: "PUT",
          body: {
            ...data.ContactPerson,
            CharityName: data.Registration.CharityName,
          },
        };
      },
    }),
    updateDocumentation: builder.mutation<
      UpdateDocumentationResult,
      UpdateDocumentationData
    >({
      query: (data) => {
        return {
          url: `documentation-update`,
          params: { uuid: data.PK },
          method: "PUT",
          body: data.body,
        };
      },
      transformResponse: (response: any) => {
        console.log(response);

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
} = registration_api;
