import contract_querier from "../contract_querier";
import { terra } from "../terra";
import { ContractQueryArgs, QueryRes } from "../types";
import { Simulation } from "./types";

export const lp_api = terra.injectEndpoints({
  endpoints: (builder) => ({
    pairSimul: builder.query<Simulation, ContractQueryArgs>({
      query: contract_querier,
      transformResponse: (res: QueryRes<Simulation>) => {
        return res.query_result;
      },
    }),
  }),
});
