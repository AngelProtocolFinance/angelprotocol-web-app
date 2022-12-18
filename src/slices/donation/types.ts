import { CountryOption } from "services/types";
import { TransactionRequest } from "types/evm";
import { TokenWithAmount, TxOptions } from "types/slices";
import { CreateTxOptions, TerraConnectedWallet } from "types/terra";
import { WalletState } from "contexts/WalletContext";

export type DonationRecipient = {
  id: number;
  name: string;
  isKYCRequired: boolean;
};

export type DonationDetails = {
  token: TokenWithAmount;
  pctLiquidSplit: string;

  //meta
  chainId: string;
  chainName: string;
  tokens: TokenWithAmount[];
};

export type KYC = {
  name: { first: string; last: string };
  address: { street: string; complement: string };
  city: string;
  postalCode: string;
  country: CountryOption;
  state: string;
  email: string;
  hasAgreedToTerms: boolean;
  agreedToGetUpdates: boolean;
};

export type SkippableKYC = KYC | "skipped";

type InitStep = {
  step: 0;
  recipient?: DonationRecipient;
};

export type FormStep = {
  step: 1;
  details?: DonationDetails;
} & Omit<Required<InitStep>, "step">;

export type KYCStep = {
  step: 2;
  kyc?: SkippableKYC;
} & Omit<Required<FormStep>, "step">;

export type SubmitStep = {
  step: 3;
} & Omit<Required<KYCStep>, "step">;

export type DonationState = InitStep | FormStep | KYCStep | SubmitStep | TxStep;

export type TxStatus = { loadingMsg: string } | "error" | { hash: string };
export type TxStep = {
  step: 4;
  status: TxStatus;
} & Omit<SubmitStep, "step">;

export type EstimatedTx =
  | { type: "cosmos"; val: TxOptions }
  | { type: "terra"; val: CreateTxOptions; wallet: TerraConnectedWallet }
  | { type: "evm"; val: TransactionRequest };

export type DonateArgs = {
  wallet: WalletState;
  tx: EstimatedTx;
  donation: SubmitStep;
};
