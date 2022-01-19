import { terra } from "../terra";

const admin_api = terra.injectEndpoints({
  endpoints: (builder) => ({
    donors: builder.query<any, any>({
      query: () => "alliance",
      transformResponse: (res: any) => {},
    }),
  }),
});
