import { Args, Res, Result } from "../queryContract/types";
import { CategorizedEndowments } from "types/contracts";
import { junoTags, registrarTags } from "services/juno/tags";
import { contracts } from "constants/contracts";
import { junoApi } from "..";
import { genQueryPath } from "../queryContract/genQueryPath";

const reg = contracts.registrar;
export const registrar_api = junoApi.injectEndpoints({
  endpoints: (builder) => ({
    endowments: builder.query<Result<"regEndowList">, Args<"regEndowList">>({
      providesTags: [
        { type: junoTags.registrar, id: registrarTags.endowments },
      ],
      query: (args) => genQueryPath("regEndowList", args, reg),
      transformResponse: (res: Res<"regEndowList">) => {
        return res.data.endowments;
      },
    }),
    registrarConfig: builder.query<Result<"regConfig">, Args<"regConfig">>({
      providesTags: [{ type: junoTags.registrar, id: registrarTags.config }],
      query: (args) => genQueryPath("regConfig", args, reg),
      transformResponse: (res: Res<"regConfig">) => {
        return res.data;
      },
    }),
    vaultList: builder.query<Result<"regVaultList">, Args<"regVaultList">>({
      providesTags: [
        { type: junoTags.registrar, id: registrarTags.vault_list },
      ],
      query: (args) => genQueryPath("regVaultList", args, reg),
      transformResponse: (res: Res<"regVaultList">) => {
        return res.data.vaults;
      },
    }),

    categorizedEndowments: builder.query<
      Result<"regCategorizedEndows">,
      Args<"regCategorizedEndows">
    >({
      providesTags: [
        { type: junoTags.registrar, id: registrarTags.endowments },
      ],
      query: (args) => genQueryPath("regCategorizedEndows", args, reg),
      transformResponse: (res: Res<"regCategorizedEndows">) => {
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
  useVaultListQuery,
} = registrar_api;
