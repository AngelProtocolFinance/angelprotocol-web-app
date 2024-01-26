import { DonationDetails } from "slices/donation";
import { Except } from "type-fest";

export type DonateValues = Except<DonationDetails, "method">;
