import {
  ContractQueryArgs,
  QueryRes,
  endowmentTags,
  terraTags,
} from "types/services/terra";
import { Holdings } from "types/services/terra/account";
import contract_querier from "../contract_querier";
import { terra } from "../terra";

export const account_api = terra.injectEndpoints({
  endpoints: (builder) => ({
    endowmentHoldings: builder.query<Holdings, ContractQueryArgs>({
      providesTags: [{ type: terraTags.endowment, id: endowmentTags.holdings }],
      query: contract_querier,
      transformResponse: (res: QueryRes<Holdings>) => {
        return res.query_result;
      },
    }),
  }),
});
