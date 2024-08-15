import type { Chain } from "types/chain";
import type { DonationSource } from "types/lists";

export namespace Donation {
  export namespace Donor {
    export interface Address {
      line1: string;
      line2?: string;
      /** may be empty `""` */
      city?: string;
      state?: string;
      zipCode?: string;
      country: string;
    }
  }
  export interface Donor {
    fullName: string;
    kycEmail?: string;
    address?: Donor.Address;
  }

  export type KYC = Required<Omit<Donor, "address"> & Donor.Address>;

  export type Method = "Bank" | "Card" | "Crypto";
  export type FiatRamp = "STRIPE" | "PAYPAL" | "CHARIOT";
  export type Status = "final" | "pending" | "intent";

  export type Record = {
    id: string;

    //from
    /** email */
    donorId: string;
    donorDetails?: Donor;

    //to
    /** endow id  */
    recipientId: number;
    recipientName: string;

    //details
    /** ISODate string */
    date: string;
    paymentMethod?: Method;
    symbol: string;
    initAmount: number;
    initAmountUsd?: number;
    finalAmountUsd?: number;
    directDonateAmount?: number;
    sfDonateAmount?: number;
    splitLiqPct: number;
    isRecurring?: boolean;
    appUsed: DonationSource;
  } & (
    | {
        //medium
        viaId: Chain.Id.All | "staging";
        viaName: string;
      }
    | {
        bankVerificationUrl?: string;
        viaId: "fiat";
        viaName: FiatRamp;
      }
  );
}

export type DonationsQueryParams = {
  page?: number;
  /** number of items per page */
  limit?: number;
  /** ISOstring */
  startDate?: string;
  /** ISOstring */
  endDate?: string;
  recipientName?: string;
  /** id of medium: i.e. chainId for crypto */
  viaId?: string;
  symbol?: string;
  asker: number | string;
  status?: Donation.Status;
};
