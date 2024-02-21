import { ChainID } from "types/chain";
import { Currency, OptionType } from "types/components";
import { Country } from "types/components";
import { DonationSource } from "types/lists";
import { TokenWithAmount, TxPackage } from "types/tx";

export type DonationRecipient = {
  id: number;
  name: string;
  isKYCRequired: boolean;
  isFiscalSponsored: boolean;
};

type BaseDonationDetais = {
  userOptForKYC: boolean;
  source: DonationSource;
};

export type CryptoDonationDetails = BaseDonationDetais & {
  method: "crypto"; //use to preserve selected method
  token: TokenWithAmount;
  chainId: OptionType<ChainID>;
};

type FiatDonationDetails = BaseDonationDetais & {
  amount: string;
  currency: Currency;
  email: string;
};

export type StripeDonationDetails = {
  method: "stripe";
} & FiatDonationDetails;

export type PaypalDonationDetails = {
  method: "paypal";
} & FiatDonationDetails;

export type StocksDonationDetails = {
  method: "stocks";
  symbol: string;
  numShares: number;
};
export type DafDonationDetails = {
  method: "daf";
} & FiatDonationDetails;

export type DonationDetails =
  | StripeDonationDetails
  | PaypalDonationDetails
  | CryptoDonationDetails
  | StocksDonationDetails
  | DafDonationDetails;

export function hasEmail(
  details: DonationDetails,
): details is
  | StripeDonationDetails
  | PaypalDonationDetails
  | DafDonationDetails {
  return (
    details.method === "stripe" ||
    details.method === "paypal" ||
    details.method === "daf"
  );
}

export type KYC = {
  name: { first: string; last: string };
  address: { street: string; complement: string };
  city: string;
  postalCode: string;
  country: Country;
  state: string;
  usState: OptionType<string>;
  kycEmail: string;
};

type InitStep = {
  step: "init";
  recipient?: DonationRecipient;
};

export type FormStep<T extends DonationDetails = DonationDetails> = {
  step: "donate-form";
  details?: T;
} & Omit<Required<InitStep>, "step">;
export type StripeFormStep = FormStep<StripeDonationDetails>;
export type CryptoFormStep = FormStep<CryptoDonationDetails>;
export type PaypalFormStep = FormStep<PaypalDonationDetails>;
export type StockFormStep = FormStep<StocksDonationDetails>;
export type DafFormStep = FormStep<DafDonationDetails>;

//KYC step need not know donation details
export type KYCStep = {
  step: "kyc-form";
  recipient: DonationRecipient;
  kyc?: KYC;
} & Omit<Required<FormStep<DonationDetails>>, "step">;

export type SplitsStep = {
  step: "splits";
  liquidSplitPct?: number;
} & Omit<KYCStep, "step">;

export type SubmitStep<T extends DonationDetails = DonationDetails> = {
  step: "submit";
} & Omit<Required<SplitsStep>, "step" | "kyc"> & { details: T; kyc?: KYC };

export type CryptoSubmitStep = SubmitStep<CryptoDonationDetails>;
export type StripeCheckoutStep = SubmitStep<StripeDonationDetails>;
export type PaypalCheckoutStep = SubmitStep<PaypalDonationDetails>;
export type StockCheckoutStep = SubmitStep<StocksDonationDetails>;
export type DafCheckoutStep = SubmitStep<DafDonationDetails>;

export type TxStatus = { loadingMsg: string } | "error" | { hash: string };
export type CryptoResultStep = {
  step: "tx";
  status: TxStatus;
} & Omit<CryptoSubmitStep, "step">;

export type DonationState =
  | InitStep
  | FormStep
  | KYCStep
  | SplitsStep
  | SubmitStep
  | CryptoResultStep;

export type DonateArgs = { donation: CryptoSubmitStep } & TxPackage;

export type DonationStep = DonationState["step"];
