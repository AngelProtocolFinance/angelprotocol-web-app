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

export const initDonorTitleOption: OptionType<FormDonor["title"]["value"]> = {
  label: "Select title",
  value: "",
};

export const toDonor = (
  fv: Omit<FormDonor, "publicMsg" | "isPublic">
): Donor => {
  return {
    title: fv.title.value,
    email: fv.email,
    first_name: fv.first_name,
    last_name: fv.last_name,
    company_name: fv.company_name,
    address: fv.ukTaxResident
      ? {
          street: fv.streetAddress,
          city: "",
          zip_code: fv.zipCode,
          country: "United Kingdom",
          uk_gift_aid: fv.ukTaxResident,
        }
      : undefined,
  };
};

export const initTributeNotif: TributeNotif = {
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
      title: initDonorTitleOption,
      first_name: "",
      last_name: "",
      company_name: "",
      email: "",
      ukTaxResident: false,
      streetAddress: "",
      zipCode: "",
      isPublic: false,
      publicMsg: "",
    },
    honorary: {
      honoraryFullName: "",
      withHonorary: false,
      withTributeNotif: false,
      tributeNotif: {
        from_msg: "",
        to_email: "",
        to_fullname: "",
      },
    },
  };
};
