import { Args, Res, Result } from "./queryContract/types";
import { settingsControllerTags } from "services/juno/tags";
import { contracts } from "constants/contracts";
import { junoApi } from ".";
import { genQueryPath } from "./queryContract/genQueryPath";

const data: Res<"endowmentController"> = {
  data: {
    endowment_controller: {
      gov_controlled: true,
      modifiable: true,
      owner_controlled: true,
    },
    name: {
      gov_controlled: true,
      modifiable: true,
      delegate: {
        address: "juno1fsdjfkdsafdaldfa",
      },
      owner_controlled: true,
    },
    image: {
      gov_controlled: true,
      modifiable: true,
      owner_controlled: true,
    },
    logo: {
      gov_controlled: true,
      modifiable: true,
      owner_controlled: true,
    },
    categories: {
      gov_controlled: true,
      modifiable: true,
      owner_controlled: false,
    },
    kyc_donors_only: {
      gov_controlled: true,
      modifiable: true,
      owner_controlled: false,
    },
    split_to_liquid: {
      gov_controlled: true,
      modifiable: true,
      owner_controlled: true,
    },
    ignore_user_splits: {
      gov_controlled: true,
      modifiable: true,
      owner_controlled: true,
    },
    donation_match_active: {
      gov_controlled: true,
      modifiable: true,
      owner_controlled: true,
    },
    beneficiaries_allowlist: {
      gov_controlled: true,
      modifiable: true,
      owner_controlled: true,
    },
    contributors_allowlist: {
      gov_controlled: true,
      modifiable: false,
      owner_controlled: true,
    },
    maturity_allowlist: {
      gov_controlled: true,
      modifiable: true,
      owner_controlled: true,
    },
    earnings_fee: {
      gov_controlled: true,
      modifiable: true,
      owner_controlled: true,
    },
    deposit_fee: {
      gov_controlled: true,
      modifiable: true,
      owner_controlled: true,
    },
    withdraw_fee: {
      gov_controlled: true,
      modifiable: true,
      owner_controlled: true,
    },
    aum_fee: {
      gov_controlled: true,
      modifiable: true,
      owner_controlled: true,
    },
  },
};
const settingsController = contracts.settingsController;

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
      async queryFn(args) {
        return {
          data: data.data,
        };
      },
      // query: (args) =>
      //   genQueryPath("endowmentController", args, settingsController),
      // transformResponse: (res: Res<"endowmentController">) => {
      //   return res.data;
      // },
    }),
  }),
});

export const { useEndowmentControllerQuery } = settingsController_api;
