import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const REGISTER_API_REDUCER_KEY = "registerAPIs";
export const registerAPIs = createApi({
  reducerPath: REGISTER_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    mode: "cors",
  }),
  endpoints: (builder) => ({
    checkPreviousRegistration: builder.mutation<any, string>({
      query: (uuid) => {
        return {
          url: "registration?uuid=" + uuid,
          method: "GET",
        };
      },
      transformResponse: (response: { data: any }) => response.data,
    }),
  }),
});

export const { useCheckPreviousRegistrationMutation } = registerAPIs;
