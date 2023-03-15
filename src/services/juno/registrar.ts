import { Args, Res, Result } from "./queryContract/types";
import { registrarTags } from "services/juno/tags";
import { contracts } from "constants/contracts";
import { junoApi } from "./index";
import { genQueryPath } from "./queryContract/genQueryPath";

const reg = contracts.registrar;
export const registrar_api = junoApi.injectEndpoints({
  endpoints: (builder) => ({
    regConfig: builder.query<Result<"regConfig">, Args<"regConfig">>({
      providesTags: [{ type: "registrar", id: registrarTags.config }],
      query: (args) => genQueryPath("regConfig", args, reg),
      transformResponse: (res: Res<"regConfig">) => {
        return res.data;
      },
    }),
    registrarConfigExtension: builder.query<
      Result<"regConfigExtension">,
      Args<"regConfigExtension">
    >({
      providesTags: [{ type: "registrar", id: registrarTags.config_extension }],
      query: (args) => genQueryPath("regConfigExtension", args, reg),
      transformResponse: (res: Res<"regConfigExtension">) => {
        return res.data;
      },
    }),
  }),
});

export const { useRegistrarConfigExtensionQuery, useRegConfigQuery } =
  registrar_api;
