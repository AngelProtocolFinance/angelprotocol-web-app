import type { StripeDonationDetails, StripeFormStep } from "../../types";

export type Props = StripeFormStep;
export type FormValues = Omit<StripeDonationDetails, "method">;
