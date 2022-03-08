import contract_querier from "../contract_querier";
import { terra } from "../terra";
import { ContractQueryArgs, QueryRes } from "../types";
import {
  VaultRateInfo,
  VaultsRateRes,
  EndowmentEntry,
  EndowmentListRes,
} from "./types";

export const registrar_api = terra.injectEndpoints({
  endpoints: (builder) => ({
    approvedVaultsRate: builder.query<VaultRateInfo[], ContractQueryArgs>({
      query: contract_querier,
      transformResponse: (res: QueryRes<VaultsRateRes>) => {
        return res.query_result.vaults_rate;
      },
    }),
    endowments: builder.query<EndowmentEntry[], ContractQueryArgs>({
      query: contract_querier,
      transformResponse: (res: QueryRes<EndowmentListRes>) => {
        return res.query_result.endowments;
      },
    }),
  }),
});
