import type { DetailedCurrency } from "types/components";
import type { StripeDonationDetails, StripeFormStep } from "../../types";

export type Props = StripeFormStep;
export type FormValues = Omit<StripeDonationDetails, "method">;

export type FormProps = Props & {
  currencies: DetailedCurrency[];
  defaultCurr?: DetailedCurrency;
};
