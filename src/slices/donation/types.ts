import { Token } from "types/aws";
import { Country } from "types/countries";
import { EndowmentType } from "types/lists";
import { TokenWithAmount } from "types/slices";
import { EstimatedTx } from "types/tx";
import { WalletState } from "contexts/WalletContext";
import { OptionType } from "components/Selector";

export type DonationRecipient = {
  id: number;
  name: string;
  isKYCRequired: boolean;
  endowType: EndowmentType;
  isFiscalSponsored: boolean;
};

export type DonationDetails = {
  token: TokenWithAmount;
  pctLiquidSplit: number; // <input range value transformed to number via onChange

  //for fiat donations
  country: Country;

  //meta
  chainId: string;
  chainName: string;
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

export type FiatWallet = {
  tokens: FiatToken[];
};

export type DonateArgs = { donation: SubmitStep } & {
  wallet: WalletState | FiatWallet;
  tx: EstimatedTx;
};

export type FiatToken = Pick<Token, "symbol" | "min_donation_amnt" | "logo">;
export type WithWallet<T> = T & { wallet: WalletState | FiatWallet };

//isFiatWallet
export function isFiat(wallet: WalletState | FiatWallet): wallet is FiatWallet {
  return !!(wallet as FiatWallet).tokens;
}
export type DonationStep = DonationState["step"];
