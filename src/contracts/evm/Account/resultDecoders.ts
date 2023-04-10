import { ResultDecoder } from "../types";
import { Queries, QueryType } from "./types";
import {
  toEndowStatusText,
  toEndowType,
  toSettingsPermission,
} from "services/juno/queryContract/decoded-types";
import { UNSDG_NUMS } from "types/lists";

export const RESULT_DECODERS: {
  [key in QueryType]: ResultDecoder<
    Queries[key]["decodedResult"],
    Queries[key]["finalResult"]
  >;
} = {
  queryEndowmentDetails: (decodedResult) => {
    const controller = decodedResult.settingsController;
    return {
      owner: decodedResult.owner,
      categories: {
        sdgs: decodedResult.categories.sdgs.map((s) =>
          s.toNumber()
        ) as UNSDG_NUMS[],
        general: decodedResult.categories.general.map((s) =>
          s.toNumber()
        ) as UNSDG_NUMS[],
      },
      endow_type: toEndowType(decodedResult.endow_type),
      status: toEndowStatusText(decodedResult.status),
      kyc_donors_only: decodedResult.kycDonorsOnly,
      settingsController: {
        endowmentController: toSettingsPermission(
          controller.endowmentController
        ),
        strategies: toSettingsPermission(controller.endowmentController),
        whitelistedBeneficiaries: toSettingsPermission(
          controller.whitelistedBeneficiaries
        ),
        whitelistedContributors: toSettingsPermission(
          controller.whitelistedContributors
        ),
        maturityWhitelist: toSettingsPermission(controller.maturityWhitelist),
        maturityTime: toSettingsPermission(controller.maturityTime),
        profile: toSettingsPermission(controller.profile),
        earningsFee: toSettingsPermission(controller.earningsFee),
        withdrawFee: toSettingsPermission(controller.withdrawFee),
        depositFee: toSettingsPermission(controller.depositFee),
        aumFee: toSettingsPermission(controller.aumFee),
        kycDonorsOnly: toSettingsPermission(controller.kycDonorsOnly),
        name: toSettingsPermission(controller.name),
        image: toSettingsPermission(controller.image),
        logo: toSettingsPermission(controller.logo),
        categories: toSettingsPermission(controller.categories),
        splitToLiquid: toSettingsPermission(controller.splitToLiquid),
        ignoreUserSplits: toSettingsPermission(controller.ignoreUserSplits),
      },
    };
  },
  queryState: (decodedResult) => ({
    //TODO: populate once needed
    tokens_on_hand: {
      locked: {
        native: [],
        cw20: [],
      },
      liquid: {
        native: [],
        cw20: [],
      },
    },
    donations_received: {
      locked: decodedResult.donationsReceived.locked.toNumber(),
      liquid: decodedResult.donationsReceived.liquid.toNumber(),
    },
    closing_endowment: decodedResult.closingEndowment,
    //FUTURE: index-fund can also be beneficiary
    closing_beneficiary: decodedResult.closingBeneficiary.data.addr,
  }),
  queryTokenAmount: (decodedResult) => decodedResult.toString(),
};
