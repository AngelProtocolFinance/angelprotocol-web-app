import contract_querier from "../contract_querier";
import { terra } from "../terra";
import { ContractQueryArgs, QueryRes } from "../types";
import { EndowmentEntry, EndowmentListRes, RegistrarConfig } from "./types";

export const registrar_api = terra.injectEndpoints({
  endpoints: (builder) => ({
    endowments: builder.query<EndowmentEntry[], ContractQueryArgs>({
      query: contract_querier,
      transformResponse: (res: QueryRes<EndowmentListRes>) => {
        return res.query_result.endowments;
      },
    }),
    config: builder.query<RegistrarConfig, ContractQueryArgs>({
      query: contract_querier,
      transformResponse: (res: QueryRes<RegistrarConfig>) => {
        return res.query_result;
      },
    }),
  }),
});
