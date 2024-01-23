import { Except } from "type-fest";
import { CryptoDonationDetails } from "slices/donation";

export type DonateValues = Except<CryptoDonationDetails, "method">;
