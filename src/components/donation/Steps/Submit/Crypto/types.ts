import { ChainID } from "types/chain";
import { EstimateResult, TokenWithAmount } from "types/tx";

export type SimulInput = {
  sender: string;
  token: TokenWithAmount;
  chainID: ChainID;
};

export type EstimateStatus = EstimateResult | "loading" | { error: string };

export const isSuccess = (status: EstimateStatus): status is EstimateResult =>
  !!(status as EstimateResult).fee;
