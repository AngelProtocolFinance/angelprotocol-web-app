import { EstimateResult } from "types/tx";

export type EstimateStatus = EstimateResult | "loading" | { error: string };

export const isSuccess = (status: EstimateStatus): status is EstimateResult =>
  !!(status as EstimateResult).fee;
