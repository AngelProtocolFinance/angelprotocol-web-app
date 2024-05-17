import type { DafDonationDetails, DafFormStep } from "../../types";

export type Props = DafFormStep;

export type FormValues = Omit<DafDonationDetails, "method" | "source">;
