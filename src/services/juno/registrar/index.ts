import { Args, Res, Result } from "../queryContract/types";
import { registrarTags } from "services/juno/tags";
import { contracts } from "constants/contracts";
import { junoApi } from "..";
import { genQueryPath } from "../queryContract/genQueryPath";

const reg = contracts.registrar;
export const registrar_api = junoApi.injectEndpoints({
  endpoints: (builder) => ({
    registrarConfig: builder.query<Result<"regConfig">, Args<"regConfig">>({
      providesTags: [{ type: "registrar", id: registrarTags.config }],
      query: (args) => genQueryPath("regConfig", args, reg),
      transformResponse: (res: Res<"regConfig">) => {
        return res.data;
      },
    }),
    vaultList: builder.query<Result<"regVaultList">, Args<"regVaultList">>({
      providesTags: [{ type: "registrar", id: registrarTags.config }],
      query: (args) => genQueryPath("regVaultList", args, reg),
      transformResponse: (res: Res<"regVaultList">) => {
        return res.data.vaults;
      },
    }),
  }),
});

export const { useRegistrarConfigQuery, useVaultListQuery } = registrar_api;
