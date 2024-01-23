import { ChainID } from "types/chain";
import { OptionType } from "types/components";
import { Country } from "types/components";
import { TokenWithAmount, TxPackage } from "types/tx";
import { Currency } from "components/CurrencySelector";

export type DonationRecipient = {
  id: number;
  name: string;
  isKYCRequired: boolean;
  isFiscalSponsored: boolean;
};

export type CryptoDonationDetails = {
  method: "crypto"; //use to preserve selected method
  token: TokenWithAmount;
  pctLiquidSplit: number; // <input range value transformed to number via onChange
  chainId: OptionType<ChainID>;
  userOptForKYC: boolean;
};

export type StripeDonationDetails = {
  method: "stripe";
  amount: string;
  currency: Currency; //TODO: move to types/components
  email: string;
  pctLiquidSplit: number;
  userOptForKYC: boolean;
};

export type DonationDetails = StripeDonationDetails | CryptoDonationDetails;

export type KYC = {
  name: { first: string; last: string };
  address: { street: string; complement: string };
  city: string;
  postalCode: string;
  country: Country;
  state: string;
  usState: OptionType<string>;
  kycEmail: string;
  agreedToGetUpdates: boolean;
};

type InitStep = {
  step: "init";
  recipient?: DonationRecipient;
};

export type StripeFormStep = {
  step: "donate-form";
  details?: StripeDonationDetails;
} & Omit<Required<InitStep>, "step">;

export type CryptoFormStep = {
  step: "donate-form";
  details?: CryptoDonationDetails;
} & Omit<Required<InitStep>, "step">;

export type FormStep = StripeFormStep | CryptoFormStep;

//KYC step need not know donation details
export type KYCStep = {
  step: "kyc-form";
  recipient: DonationRecipient;
  kyc?: KYC;
} & Omit<Required<FormStep>, "step">;

export type CryptoSubmitStep = {
  step: "submit";
  //donation can be submitted without KYC
} & Omit<KYCStep, "step" | "details"> & { details: CryptoDonationDetails };

export type StripeCheckoutStep = {
  step: "submit";
  //donation can be submitted without KYC
} & Omit<StripeFormStep, "step"> &
  Omit<KYCStep, "step" | "details"> & { details: StripeDonationDetails };

export type SubmitStep = CryptoSubmitStep | StripeCheckoutStep;

export type TxStatus = { loadingMsg: string } | "error" | { hash: string };

export type CryptoResultStep = {
  step: "tx";
  status: TxStatus;
} & Omit<CryptoSubmitStep, "step">;

export type DonationState =
  | InitStep
  /** donation methods */
  | CryptoFormStep
  | StripeFormStep
  /** donation methods */
  | KYCStep
  /** submission methods */
  | CryptoSubmitStep
  | StripeCheckoutStep
  /** submission methods */
  | CryptoResultStep;

export type DonateArgs = { donation: CryptoSubmitStep } & TxPackage;

export type DonationStep = DonationState["step"];
