import { Except } from "type-fest";
import { DonationDetails } from "slices/donation";

export type DonateValues = Except<DonationDetails, "method">;
