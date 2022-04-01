import {
  CharityApplication,
  RegistrationStatus,
} from "pages/Admin/Applications/types";
import { aws } from "./aws";
import { AWSQueryRes } from "./types";

const registration_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    getCharityApplications: builder.query<any, any>({
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
    updateCharityDocs: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `registration`,
          params: { uuid: data.PK },
          method: "PUT",
          body: data.body,
        };
      },
    }),
  }),
});
export const {
  useGetCharityApplicationsQuery,
  useCheckPreviousRegistrationMutation,
  useCreateNewCharityMutation,
  useRequestEmailMutation,
  useGetRegisteredCharitiesMutation,
  useUpdatePersonDataMutation,
  useUpdateCharityDocsMutation,
} = registration_api;
