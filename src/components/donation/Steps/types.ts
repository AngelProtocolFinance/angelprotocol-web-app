import type {
  Donor,
  Endowment,
  FiatPaymentFrequency,
  GuestDonor,
} from "types/aws";
import type { ChainID } from "types/chain";
import type { DetailedCurrency, OptionType } from "types/components";
import type { DonateMethodId, DonationSource } from "types/lists";
import type { TokenWithAmount } from "types/tx";

type From<T extends { step: string }, U extends keyof T = never> = Omit<
  Required<T>,
  "step" | U
> & { [key in U]?: T[key] };

export type DonationRecipient = Pick<
  Endowment,
  "id" | "name" | "hide_bg_tip" | "progDonationsAllowed"
>;

type BaseDonationDetails = {
  /** value is "" if no program is selected   */
  program: OptionType<string>;
};

export type CryptoDonationDetails = BaseDonationDetails & {
  method: Extract<DonateMethodId, "crypto">; //use to preserve selected method
  token: TokenWithAmount;
  chainId: OptionType<ChainID>;
};

type FiatDonationDetails = BaseDonationDetails & {
  amount: string;
  currency: DetailedCurrency;
};

export type StripeDonationDetails = {
  method: Extract<DonateMethodId, "stripe">;
  frequency: FiatPaymentFrequency;
} & FiatDonationDetails;

export type StocksDonationDetails = BaseDonationDetails & {
  method: Extract<DonateMethodId, "stocks">;
  symbol: string;
  numShares: number;
};
export type DafDonationDetails = {
  method: Extract<DonateMethodId, "daf">;
} & FiatDonationDetails;

export type DonationDetails =
  | StripeDonationDetails
  | CryptoDonationDetails
  | StocksDonationDetails
  | DafDonationDetails;

export type Mode = "live" | "preview";

export type Config = {
  splitDisabled: boolean;
  liquidSplitPct: number;
  /** donation tabs follows the list order */
  methodIds?: DonateMethodId[];
  /** hex color without alpha */
  accentPrimary?: string;
  /** hex color without alpha */
  accentSecondary?: string;
};

export type Init = {
  source: DonationSource;
  mode: Mode;
  recipient: DonationRecipient;
  config: Config | null;
  /** intent to resume */
  intentId?: string;
};

export type FormStep<T extends DonationDetails = DonationDetails> = {
  step: "donate-form";
  init: Init;
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
  //tip can be skipped
  tip?: { value: number; format: TipFormat };
} & From<SplitsStep>;

export type SummaryStep = {
  step: "summary";
  donor?: Donor;
} & From<TipStep, "tip">;

export type SubmitStep<T extends DonationDetails = DonationDetails> = {
  step: "submit";
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
} & From<CryptoSubmitStep, "tip">;

export type DonationState =
  | FormStep
  | SplitsStep
  | TipStep
  | SummaryStep
  | SubmitStep
  | CryptoResultStep;
