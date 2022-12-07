import { EXPECTED_NETWORK_TYPE } from "constants/env";
import { aws } from "./aws";

interface FiltersQueryResult {
  data: any;
}

const filters_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    stakingAPR: builder.query<FiltersQueryResult, any>({
      query: () => {
        return {
          url: `/v3/donation/{id}/${EXPECTED_NETWORK_TYPE}`,
          method: "Get",
        };
      },
    }),
  }),
});

export const { useFiltersQuery } = filters_api;