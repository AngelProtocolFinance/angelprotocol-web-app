import type { CryptoDonationDetails } from "slices/donation";
import type { Except } from "type-fest";

export type DonateValues = Except<CryptoDonationDetails, "method">;
