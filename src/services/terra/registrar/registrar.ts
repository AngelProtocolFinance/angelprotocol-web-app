import contract_querier from "../contract_querier";
import { tags } from "../tags";
import { terra } from "../terra";
import { ContractQueryArgs, QueryRes } from "../types";
import {
  CategorizedEndowments,
  EndowmentEntry,
  EndowmentListRes,
  RegistrarConfig,
} from "./types";

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
    categorizedEndowments: builder.query<
      CategorizedEndowments,
      ContractQueryArgs
    >({
      providesTags: [{ type: tags.endowment }],
      query: contract_querier,
      transformResponse: (res: QueryRes<EndowmentListRes>) => {
        return res.query_result.endowments.reduce((result, profile) => {
          if (!profile.un_sdg || profile.tier === "Level1") {
            return result;
          } else {
            if (!result[profile.un_sdg]) {
              result[profile.un_sdg] = [];
            }
            result[+profile.un_sdg!].push(profile);
            return result;
          }
        }, {} as CategorizedEndowments);
      },
    }),
  }),
});
