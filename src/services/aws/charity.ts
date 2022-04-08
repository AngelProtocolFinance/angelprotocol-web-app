import { aws } from "./aws";

const charity_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    addCharityMetadata: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `charity`,
          params: { uuid: data.uuid },
          method: "POST",
          body: data.body,
        };
      },
      transformResponse: (response: { data: any }) => response,
    }),
    updateCharityMetadata: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `charity`,
          params: { uuid: data.uuid },
          method: "PUT",
          body: data.body,
        };
      },
      transformResponse: (response: { data: any }) => response,
    }),
    getCharityListEndowment: builder.query<any, any>({
      query: (status) => {
        return {
          url: `charity/list`,
          params: { endowmentStatus: status },
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useAddCharityMetadataMutation,
  useGetCharityListEndowmentQuery,
  useUpdateCharityMetadataMutation,
} = charity_api;
