import { ContractQueryArgs } from "services/types";
import {
  CategorizedEndowments,
  EndowmentEntry,
  QueryRes,
  RegistrarConfig,
} from "types/server/contracts";
import { registrarTags, terraTags } from "services/terra/tags";
import contract_querier from "../contract_querier";
import { terra } from "../terra";

type EndowmentListRes = {
  endowments: EndowmentEntry[];
};

export const registrar_api = terra.injectEndpoints({
  endpoints: (builder) => ({
    endowments: builder.query<EndowmentEntry[], ContractQueryArgs>({
      providesTags: [
        { type: terraTags.registrar, id: registrarTags.endowments },
      ],
      query: contract_querier,
      transformResponse: (res: QueryRes<EndowmentListRes>) => {
        return res.query_result.endowments;
      },
    }),
    config: builder.query<RegistrarConfig, ContractQueryArgs>({
      providesTags: [{ type: terraTags.registrar, id: registrarTags.config }],
      query: contract_querier,
      transformResponse: (res: QueryRes<RegistrarConfig>) => {
        return res.query_result;
      },
    }),
    categorizedEndowments: builder.query<
      CategorizedEndowments,
      ContractQueryArgs
    >({
      providesTags: [
        { type: terraTags.registrar, id: registrarTags.endowments },
      ],
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
