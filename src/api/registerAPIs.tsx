import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { aws_endpoint } from "constants/urls";

export const registerAPIs = createApi({
  reducerPath: "registerAPIs",
  baseQuery: fetchBaseQuery({
    baseUrl: aws_endpoint,
    mode: "cors",
  }),
  endpoints: (builder) => ({
    getRegisteredCharities: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `registration/list`,
          params: { regStatus: data.regStatus },
          method: "GET",
        };
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
  }),
});

export const {
  useCheckPreviousRegistrationMutation,
  useCreateNewCharityMutation,
  useRequestEmailMutation,
  useGetRegisteredCharitiesMutation,
  useUpdatePersonDataMutation,
} = registerAPIs;
