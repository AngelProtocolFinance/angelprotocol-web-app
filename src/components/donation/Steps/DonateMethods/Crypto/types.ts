import { CryptoDonationDetails } from "slices/donation";
import { Except } from "type-fest";

export type DonateValues = Except<CryptoDonationDetails, "method">;
