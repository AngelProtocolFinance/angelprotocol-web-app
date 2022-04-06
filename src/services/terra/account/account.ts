import contract_querier from "../contract_querier";
import { tags, endowment } from "../tags";
import { terra } from "../terra";
import { ContractQueryArgs, QueryRes } from "../types";
import { Holdings } from "./types";

export const account_api = terra.injectEndpoints({
  endpoints: (builder) => ({
    endowmentHoldings: builder.query<Holdings, ContractQueryArgs>({
      providesTags: [{ type: tags.endowment, id: endowment.holdings }],
      query: contract_querier,
      transformResponse: (res: QueryRes<Holdings>) => {
        return res.query_result;
      },
    }),
    endowmentProfile: builder.query<any, ContractQueryArgs>({
      providesTags: [{ type: tags.endowment, id: endowment.profile }],
      query: contract_querier,
      transformResponse: (res: QueryRes<any>) => {
        return res.query_result;
      },
    }),
  }),
});
