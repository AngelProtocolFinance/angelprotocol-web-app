import type { ChainID } from "types/chain";

type DonorAddress = {
  line1: string;
  line2?: string;
  /** may be empty `""` */
  city?: string;
  state?: string;
  zipCode?: string;
  country: string;
};

type DonorDetails = {
  fullName: string;
  kycEmail?: string;
  address?: DonorAddress;
};

export type KYCData = Required<Omit<DonorDetails, "address"> & DonorAddress>;

export type FiatRamp = "STRIPE" | "PAYPAL";

export type DonationRecord = {
  id: string;

  //from
  /** email */
  donorId: string;
  donorDetails?: DonorDetails;

  //to
  /** endow id  */
  recipientId: number;
  recipientName: string;

  //details
  /** ISODate string */
  date: string;
  symbol: string;
  initAmount: number;
  initAmountUsd?: number;
  finalAmountUsd?: number;
  splitLiqPct: number;
} & (
  | {
      //medium
      viaId: ChainID | "staging";
      viaName: string;
    }
  | {
      viaId: "fiat";
      viaName: FiatRamp;
    }
);

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
  status?: "final" | "pending" | "intent";
};
