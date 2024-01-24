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

export type FormStep<T extends DonationDetails = DonationDetails> = {
  step: "donate-form";
  details?: T;
} & Omit<Required<InitStep>, "step">;
export type StripeFormStep = FormStep<StripeDonationDetails>;
export type CryptoFormStep = FormStep<CryptoDonationDetails>;

//KYC step need not know donation details
export type KYCStep = {
  step: "kyc-form";
  recipient: DonationRecipient;
  kyc?: Partial<KYC>;
} & Omit<Required<FormStep<DonationDetails>>, "step">;

export type SubmitStep<T extends DonationDetails = DonationDetails> = {
  step: "submit";
} & Omit<KYCStep, "step" | "details" | "kyc"> & { details: T; kyc?: KYC }; //either skipped or complete

export type CryptoSubmitStep = SubmitStep<CryptoDonationDetails>;
export type StripeCheckoutStep = SubmitStep<StripeDonationDetails>;

export type TxStatus = { loadingMsg: string } | "error" | { hash: string };
export type CryptoResultStep = {
  step: "tx";
  status: TxStatus;
} & Omit<CryptoSubmitStep, "step">;

export type DonationState =
  | InitStep
  | FormStep
  | SubmitStep
  | KYCStep
  | SubmitStep
  | CryptoResultStep;

export type DonateArgs = { donation: CryptoSubmitStep } & TxPackage;

export type DonationStep = DonationState["step"];
