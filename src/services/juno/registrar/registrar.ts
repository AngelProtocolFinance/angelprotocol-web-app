import { ContractQueryArgs } from "services/types";
import {
  CategorizedEndowments,
  EndowmentEntry,
  QueryRes,
  RegistrarConfig,
} from "types/server/contracts";
import { junoTags, registrarTags } from "services/juno/tags";
import { junoApi } from "..";
import contract_querier from "../contract_querier";

type EndowmentListRes = {
  endowments: EndowmentEntry[];
};

export const registrar_api = junoApi.injectEndpoints({
  endpoints: (builder) => ({
    endowments: builder.query<EndowmentEntry[], ContractQueryArgs>({
      providesTags: [
        { type: junoTags.registrar, id: registrarTags.endowments },
      ],
      query: contract_querier,
      transformResponse: (res: QueryRes<EndowmentListRes>) => {
        return res.data.endowments;
      },
    }),
    registrarConfig: builder.query<RegistrarConfig, ContractQueryArgs>({
      providesTags: [{ type: junoTags.registrar, id: registrarTags.config }],
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
        { type: junoTags.registrar, id: registrarTags.endowments },
      ],
      query: contract_querier,
      transformResponse: (res: QueryRes<EndowmentListRes>) => {
        return res.data.endowments.reduce((result, profile) => {
          const { un_sdg, tier } = profile;
          if (un_sdg === undefined || tier === "Level1") {
            return result;
          } else {
            if (!result[un_sdg]) {
              result[un_sdg] = [];
            }
            result[un_sdg].push(profile);
            return result;
          }
        }, {} as CategorizedEndowments);
      },
    }),
  }),
});

export const {
  useCategorizedEndowmentsQuery,
  useEndowmentsQuery,
  useRegistrarConfigQuery,
} = registrar_api;
