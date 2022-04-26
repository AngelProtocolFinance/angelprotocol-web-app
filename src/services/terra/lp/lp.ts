import { QueryRes, Simulation } from "@types-server/contracts";
import { ContractQueryArgs } from "@types-services/terra";
import contract_querier from "../contract_querier";
import { terra } from "../terra";

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
