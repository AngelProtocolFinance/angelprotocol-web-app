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
        return res.data.endowments;
      },
    }),
    config: builder.query<RegistrarConfig, ContractQueryArgs>({
      providesTags: [{ type: terraTags.registrar, id: registrarTags.config }],
      query: contract_querier,
      transformResponse: (res: QueryRes<RegistrarConfig>) => {
        return res.data;
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
        console.log(res.data);
        return res.data.endowments.reduce((result, profile) => {
          //TODO: filter out profiles with no un_sdg & with no tier and tier === "Level1"
          const _n = profile.un_sdg || 0;
          if (!result[_n]) {
            result[_n] = [];
          }
          result[_n].push(profile);
          return result;
        }, {} as CategorizedEndowments);
      },
    }),
  }),
});
