import contract_querier from "../contract_querier";
import { endowment, tags } from "../tags";
import { terra } from "../terra";
import { ContractQueryArgs, QueryRes } from "../types";
import { VaultRateInfo, VaultsRateRes } from "./types";

export const registrar_api = terra.injectEndpoints({
  endpoints: (builder) => ({
    approvedVaultsRate: builder.query<VaultRateInfo[], ContractQueryArgs>({
      providesTags: [{ type: tags.endowment, id: endowment.rate }],
      query: contract_querier,
      transformResponse: (res: QueryRes<VaultsRateRes>) => {
        return res.query_result.vaults_rate;
      },
    }),
  }),
});
