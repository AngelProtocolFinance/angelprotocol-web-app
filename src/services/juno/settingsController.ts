import { Args, Res, Result } from "./queryContract/types";
import { settingsControllerTags } from "services/juno/tags";
import { contracts } from "constants/contracts";
import { junoApi } from ".";
import { genQueryPath } from "./queryContract/genQueryPath";

const settingsController = contracts["accounts/settings"];

export const settingsController_api = junoApi.injectEndpoints({
  endpoints: (builder) => ({
    endowmentController: builder.query<
      Result<"endowmentController">,
      Args<"endowmentController">
    >({
      providesTags: [
        {
          type: "settingsController",
          id: settingsControllerTags.endowment_controller,
        },
      ],
      query: (args) =>
        genQueryPath("endowmentController", args, settingsController),
      transformResponse: (res: Res<"endowmentController">) => {
        return res.data;
      },
    }),
  }),
});

export const { useEndowmentControllerQuery } = settingsController_api;
