import type { Donor } from "@better-giving/donation/intent";
import type { DonateMethodId } from "@better-giving/endowment";
import type {
  DetailedCurrency,
  OptionType,
  TokenWithDetails,
} from "types/components";
import type {
  DonationDetails,
  DonationState,
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
    firstName: fv.firstName,
    lastName: fv.lastName,
    address: fv.ukTaxResident
      ? {
          street: fv.streetAddress,
          city: "",
          zipCode: fv.zipCode,
          country: "United Kingdom",
          ukGiftAid: fv.ukTaxResident,
        }
      : undefined,
  };
};

export const initTributeNotif: TributeNotif = {
  toEmail: "",
  toFullName: "",
  fromMsg: "",
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
      firstName: "",
      lastName: "",
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
        fromMsg: "",
        toEmail: "",
        toFullName: "",
      },
    },
  };
};
