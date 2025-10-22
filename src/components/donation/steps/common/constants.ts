import type { DonateMethodId } from "@better-giving/endowment";
import type { ICurrencyFv, ITokenFv, OptionType } from "types/components";
import type {
  DonationDetails,
  DonationState,
  FinishedSummaryData,
  IDonationFvBase,
  Tribute,
} from "../types";

export const DEFAULT_PROGRAM: OptionType<""> = {
  label: "General Donation",
  value: "",
};

export const init_token_option: ITokenFv = {
  precision: 6,
  min: 0,
  code: "",
  name: "",
  symbol: "",
  id: "",
  amount: "",
  network: "",
  cg_id: "",
  color: "",
  logo: "",
  rate: 1,
};

export const USD_CODE = "USD";
export const usd_option: ICurrencyFv = { code: USD_CODE, min: 1, rate: 1 };

export const init_donation_fv: IDonationFvBase = {
  tip: "",
  cover_processing_fee: false,
  first_name: "",
  last_name: "",
  email: "",
};

export const init_details = (method_id: DonateMethodId): DonationDetails => {
  switch (method_id) {
    case "crypto": {
      return {
        method: "crypto",
        token: init_token_option,
      };
    }
    case "daf": {
      return {
        method: "daf",
        amount: "",
        currency: usd_option,
        ...init_donation_fv,
      };
    }
    case "stocks": {
      return {
        method: "stocks",
        num_shares: "",
        symbol: "",
      };
    }
    default: {
      return {
        method: "stripe",
        amount: "",
        currency: usd_option,
        frequency: "recurring",
        ...init_donation_fv,
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
