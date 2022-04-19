import {
  ContractQueryArgs,
  QueryRes,
  endowmentTags,
  terraTags,
} from "types/services/terra";
import { VaultRateInfo, VaultsRateRes } from "types/services/terra/registrar";
import contract_querier from "../contract_querier";
import { terra } from "../terra";

export const registrar_api = terra.injectEndpoints({
  endpoints: (builder) => ({
    approvedVaultsRate: builder.query<VaultRateInfo[], ContractQueryArgs>({
      providesTags: [{ type: terraTags.endowment, id: endowmentTags.rate }],
      query: contract_querier,
      transformResponse: (res: QueryRes<VaultsRateRes>) => {
        return res.query_result.vaults_rate;
      },
    }),
  }),
});
