import type { DonateMethodId } from "@better-giving/endowment";
import type {
  DetailedCurrency,
  OptionType,
  TokenWithDetails,
} from "types/components";
import type {
  DonationDetails,
  DonationState,
  Donor,
  FinishedSummaryData,
  FormDonor,
  TributeNotif,
} from "../types";

export const DEFAULT_PROGRAM: OptionType<""> = {
  label: "General Donation",
  value: "",
};

export const initTokenOption: TokenWithDetails = {
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

export const usdOption: DetailedCurrency = { code: USD_CODE, min: 1, rate: 1 };

export const initDetails = (
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
        token: initTokenOption,
        program,
      };
    }
    case "daf": {
      return { method: "daf", amount: "", currency: usdOption, program };
    }
    case "stocks": {
      return {
        method: "stocks",
        numShares: "",
        program,
        symbol: "",
      };
    }
    default: {
      return {
        method: "stripe",
        amount: "",
        currency: usdOption,
        frequency: "subscription",
        program,
      };
    }
  }
};

export const toDonor = (fv: FormDonor): Donor => {
  return {
    title: fv.title,
    email: fv.email,
    first_name: fv.first_name,
    last_name: fv.last_name,
    company_name: fv.company_name,
    address: fv.address
      ? {
          street: fv.address.street,
          city: "",
          zip_code: fv.address.zip_code,
          country: "United Kingdom",
          uk_gift_aid: true,
        }
      : undefined,
  };
};

export const init_tribute_notif: TributeNotif = {
  to_email: "",
  to_fullname: "",
  from_msg: "",
};

export const summaryData = (state: DonationState): FinishedSummaryData => {
  if ("donor" in state) {
    if (state.donor && state.honorary && state.feeAllowance) {
      return {
        donor: state.donor,
        honorary: state.honorary,
        feeAllowance: state.feeAllowance,
      };
    }
  }
  return {
    feeAllowance: 0,
    donor: {
      title: "",
      first_name: "",
      last_name: "",
      email: "",
      donor_public: true,
    },
    honorary: { honorary_fullname: "", tribute_notif: init_tribute_notif },
  };
};
