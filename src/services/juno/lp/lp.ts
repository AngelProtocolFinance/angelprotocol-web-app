import { ContractQueryArgs } from "services/types";
import { QueryRes, Simulation } from "types/server/contracts";
import { junoApi } from "..";
import contract_querier from "../contract_querier";

export const lp_api = junoApi.injectEndpoints({
  endpoints: (builder) => ({
    pairSimul: builder.query<Simulation, ContractQueryArgs>({
      query: contract_querier,
      transformResponse: (res: QueryRes<Simulation>) => {
        return res.data;
      },
    }),
  }),
});
