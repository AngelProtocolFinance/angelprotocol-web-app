import { EstimateInput, EstimateResult } from "types/tx";
import { logger } from "../../logger";
import { estimateCosmosFee } from "./estimateCosmosFee";
import { estimateEVMFee } from "./estimateEVMfee";
import estimateTerraFee from "./estimateTerraFee";

export default async function estimateTx(
  toEstimate: EstimateInput,
  sender: { address: string }
): Promise<EstimateResult | null> {
  try {
    switch (toEstimate.chainID) {
      case "juno-1":
      case "uni-6": {
        const { val, chainID } = toEstimate;
        return estimateCosmosFee(chainID, sender.address, val);
      }
      case "phoenix-1":
      case "pisco-1": {
        const { chainID, val } = toEstimate;
        return estimateTerraFee(chainID, sender.address, val);
      }

      //evm chains
      default: {
        const { chainID, val } = toEstimate;
        return estimateEVMFee(chainID, sender.address, val);
      }
    }
  } catch (err) {
    logger.error(err);
    return null;
  }
}
