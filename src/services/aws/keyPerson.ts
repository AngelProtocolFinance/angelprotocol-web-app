import { aws } from "./aws";

const keyPerson_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    updateKeyPersonData: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `charity/key-person`,
          params: { uuid: data.uuid },
          method: "PUT",
          body: data,
        };
      },
      transformResponse: (response: { data: any }) => response,
    }),
    addNewKeyCharity: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `charity/key-person`,
          params: { uuid: data.uuid },
          method: "POST",
          body: data,
        };
      },
      transformResponse: (response: { data: any }) => response,
    }),
  }),
});

export const { useAddNewKeyCharityMutation, useUpdateKeyPersonDataMutation } =
  keyPerson_api;
