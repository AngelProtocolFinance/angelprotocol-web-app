import {
  CategorizedEndowments,
  EndowmentEntry,
  QueryRes,
  RegistrarConfig,
} from "types/server/contracts";
import { ContractQueryArgs, terraTags } from "types/services/terra";
import contract_querier from "../contract_querier";
import { terra } from "../terra";

type EndowmentListRes = {
  endowments: EndowmentEntry[];
};

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
      providesTags: [{ type: terraTags.endowment }],
      query: contract_querier,
      transformResponse: (res: QueryRes<EndowmentListRes>) => {
        let result = res.query_result.endowments.reduce(
          (result: CategorizedEndowments, profile: EndowmentEntry) => {
            if (!profile.un_sdg || profile.tier === "Level1") {
              return result;
            } else {
              if (!result[profile.un_sdg]) {
                result[profile.un_sdg] = [];
              }
              result[+profile.un_sdg!].push(profile);
              return result;
            }
          },
          {} as CategorizedEndowments
        );
        return result;
      },
    }),
  }),
});
