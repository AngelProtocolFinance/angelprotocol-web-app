import { Token } from "types/aws";
import { ChainID } from "types/chain";
import { Country } from "types/countries";
import { TokenWithAmount, TxPackage } from "types/tx";
import { OptionType } from "components/Selector";

export type DonationRecipient = {
  id: number;
  name: string;
  isKYCRequired: boolean;
  isFiscalSponsored: boolean;
};

export type DonationDetails = {
  token: TokenWithAmount;
  pctLiquidSplit: number; // <input range value transformed to number via onChange
  chainId: OptionType<ChainID>;
  userOptForKYC: boolean;
};

export type KYC = {
  name: { first: string; last: string };
  address: { street: string; complement: string };
  city: string;
  postalCode: string;
  country: Country;
  state: string;
  usState: OptionType<string>;
  email: string;
  hasAgreedToTerms: boolean;
  agreedToGetUpdates: boolean;
};

type InitStep = {
  step: "init";
  recipient?: DonationRecipient;
};

export type FormStep = {
  step: "donate-form";
  details?: DonationDetails;
} & Omit<Required<InitStep>, "step">;

export type KYCStep = {
  step: "kyc-form";
  kyc?: KYC;
} & Omit<Required<FormStep>, "step">;

export type SubmitStep = {
  step: "submit";
  //donation can be submitted without KYC
} & Omit<KYCStep, "step">;

export type DonationState = InitStep | FormStep | KYCStep | SubmitStep | TxStep;

export type TxStatus = { loadingMsg: string } | "error" | { hash: string };
export type TxStep = {
  step: "tx";
  status: TxStatus;
} & Omit<SubmitStep, "step">;

export type DonateArgs = { donation: SubmitStep } & TxPackage;

export type FiatToken = Pick<Token, "symbol" | "min_donation_amnt" | "logo">;

export type DonationStep = DonationState["step"];
