import type { DonateMethodId } from "@better-giving/endowment";
import type {
  DBCurrency,
  OptionType,
  TokenWithDetails,
} from "types/components";
import type {
  DonationDetails,
  DonationState,
  FinishedSummaryData,
  Tribute,
} from "../types";

export const DEFAULT_PROGRAM: OptionType<""> = {
  label: "General Donation",
  value: "",
};

export const init_token_option: TokenWithDetails = {
  precision: 6,
  min: 0,
  code: "",
  name: "",
  symbol: "Select token",
  id: "",
  amount: "",
  network: "",
  cg_id: "",
  color: "",
  logo: "",
  rate: 1,
};

export const USD_CODE = "usd";
export const usd_option: DBCurrency = { code: USD_CODE, min: 1, rate: 1 };

export const init_details = (
  methodId: DonateMethodId,
  programIdOrOption?: string | OptionType<string>
): DonationDetails => {
  const program: OptionType<string> =
    typeof programIdOrOption === "string" || !programIdOrOption
      ? {
          //label would be replaced once program options are loaded
          label: "General Donation",
          value: programIdOrOption ?? "",
        }
      : programIdOrOption;

  switch (methodId) {
    case "crypto": {
      return {
        method: "crypto",
        token: init_token_option,
        program,
      };
    }
    case "daf": {
      return { method: "daf", amount: "", currency: usd_option, program };
    }
    case "stocks": {
      return {
        method: "stocks",
        num_shares: "",
        program,
        symbol: "",
      };
    }
    default: {
      return {
        method: "stripe",
        amount: "",
        currency: usd_option,
        frequency: "recurring",
        program,
      };
    }
  }
};

export const init_tribute_notif: Tribute["notif"] = {
  to_email: "",
  to_fullname: "",
  from_msg: "",
};

export const summary_data = (state: DonationState): FinishedSummaryData => {
  if ("donor" in state) {
    if (state.donor && state.tribute && state.fee_allowance) {
      return {
        donor: state.donor,
        tribute: state.tribute,
        fee_allowance: state.fee_allowance,
      };
    }
  }
  return {
    fee_allowance: 0,
    donor: {
      title: "",
      first_name: "",
      last_name: "",
      email: "",
      is_public: true,
    },
  };
};
