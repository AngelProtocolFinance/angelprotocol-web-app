import { DonationEstimate } from "./Breakdown/estimateDonation";

export type EstimateStatus = DonationEstimate | "loading" | { error: string };

export const isSuccess = (status: EstimateStatus): status is DonationEstimate =>
  !!(status as DonationEstimate).fee;
