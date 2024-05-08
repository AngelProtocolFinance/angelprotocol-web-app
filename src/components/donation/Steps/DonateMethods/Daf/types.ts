import type { DafDonationDetails, DafFormStep } from "../../types";

export type Props = Omit<DafFormStep, "intentId" | "config">;

export type FormValues = Omit<DafDonationDetails, "method" | "source">;
