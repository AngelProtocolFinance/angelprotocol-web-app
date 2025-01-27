import type { Except } from "type-fest";
import type { CryptoDonationDetails } from "../../types";

export type DonateValues = Except<CryptoDonationDetails, "method"> & {};
