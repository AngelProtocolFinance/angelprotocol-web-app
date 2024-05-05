import type {
  Donor,
  Endowment,
  FiatPaymentFrequency,
  GuestDonor,
} from "types/aws";
import type { ChainID } from "types/chain";
import type { DetailedCurrency, OptionType } from "types/components";
import type { DonationSource } from "types/lists";
import type { TokenWithAmount, TxPackage } from "types/tx";

export type Config = {
  liquidSplitPct: number;
  isSplitDisabled: boolean;
  isPreview?: boolean;
};

type From<T extends { step: string }, U extends keyof T = never> = Omit<
  Required<T>,
  "step" | U
> & { [key in U]?: T[key] };

export type DonationRecipient = Pick<Endowment, "id" | "name" | "hide_bg_tip">;

type BaseDonationDetais = {
  source: DonationSource;
};

export type CryptoDonationDetails = BaseDonationDetais & {
  method: "crypto"; //use to preserve selected method
  token: TokenWithAmount;
  chainId: OptionType<ChainID>;
};

type FiatDonationDetails = BaseDonationDetais & {
  amount: string;
  currency: DetailedCurrency;
};

export type StripeDonationDetails = {
  method: "stripe";
  frequency: FiatPaymentFrequency;
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
  | CryptoDonationDetails
  | StocksDonationDetails
  | DafDonationDetails;

export function hasEmail(
  details: DonationDetails
): details is StripeDonationDetails | DafDonationDetails {
  return details.method === "stripe" || details.method === "daf";
}

export type Init = { recipient: DonationRecipient; config: Config | null };

export type FormStep<T extends DonationDetails = DonationDetails> = Init & {
  step: "donate-form";
  details?: T;
};

export type StripeFormStep = FormStep<StripeDonationDetails>;
export type CryptoFormStep = FormStep<CryptoDonationDetails>;
export type StockFormStep = FormStep<StocksDonationDetails>;
export type DafFormStep = FormStep<DafDonationDetails>;

export type SplitsStep = {
  step: "splits";
  liquidSplitPct?: number;
} & From<FormStep>;

/** edge case: custom tip > donation  */
export type TipFormat = "pct" | "amount";
export type TipStep = {
  step: "tip";
  tip: number;
  format?: TipFormat;
} & From<SplitsStep>;

export type SummaryStep = {
  step: "summary";
  donor?: Donor;
} & From<TipStep>;

export type SubmitStep<T extends DonationDetails = DonationDetails> = {
  step: "submit";
  /** Set only when loading an existing intent */
  oldTransactionId?: string;
} & Omit<From<SummaryStep, "tip">, "details"> & { details: T };

export type CryptoSubmitStep = SubmitStep<CryptoDonationDetails>;
export type StripeCheckoutStep = SubmitStep<StripeDonationDetails>;
export type StockCheckoutStep = SubmitStep<StocksDonationDetails>;
export type DafCheckoutStep = SubmitStep<DafDonationDetails>;

export type TxStatus =
  | { loadingMsg: string }
  | "error"
  | { hash: string; guestDonor: GuestDonor | undefined };
export type CryptoResultStep = {
  step: "tx";
  status: TxStatus;
} & From<CryptoSubmitStep>;

export type DonationState =
  | FormStep
  | SplitsStep
  | TipStep
  | SummaryStep
  | SubmitStep
  | CryptoResultStep;

export type DonateArgs = {
  onSuccess: (txHash: string) => Promise<{ guestDonor: GuestDonor }>;
} & TxPackage;

export type DonationStep = DonationState["step"];

export type Update =
  | DonationDetails
  | { liquidSplitPct: number }
  | { tip: number; format: TipFormat }
  | { donor: Donor }
  | { txStatus: TxStatus }
  | "reset"
  | { step: DonationStep };
