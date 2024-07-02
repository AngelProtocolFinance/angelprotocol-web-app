import type { Donor } from "types/aws";
import type { ChainID } from "types/chain";
import type { DetailedCurrency, OptionType } from "types/components";
import type { DonateMethodId } from "types/lists";
import type { TokenWithAmount } from "types/tx";
import type { DonationDetails, FormDonor, TributeNotif } from "../types";

export const DEFAULT_PROGRAM: OptionType<""> = {
  label: "General Donation",
  value: "",
};

export const initTokenOption: TokenWithAmount = {
  approved: false,
  decimals: 6,
  logo: "",
  min_donation_amnt: 0,
  symbol: "Select token",
  name: "",
  token_id: "",
  coingecko_denom: "",
  type: "erc20",
  amount: "",
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
        /** cast here, propagating chainId:`""` in donation state is impractical
         * as it should have been ruled out in crypto form  */
        chainId: "" as ChainID,
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

export const toDonor = (fv: FormDonor): Donor => {
  return {
    title: fv.title.value,
    email: fv.email,
    firstName: fv.firstName,
    lastName: fv.lastName,
    address: fv.ukTaxResident
      ? {
          streetAddress: fv.streetAddress,
          city: "",
          zipCode: fv.zipCode,
          country: "United Kingdom",
        }
      : undefined,
    ukGiftAid: fv.ukTaxResident,
  };
};

export const initTributeNotif: TributeNotif = {
  toEmail: "",
  toFullName: "",
  fromMsg: "",
};
