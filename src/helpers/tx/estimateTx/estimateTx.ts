import { Estimate, TxContent } from "types/tx";
import { WalletID } from "types/wallet";
import { logger } from "../../logger";
import { estimateCosmosFee } from "./estimateCosmosFee";
import { estimateEVMFee } from "./estimateEVMfee";
import estimateTerraFee from "./estimateTerraFee";

export default async function estimateTx(
  content: TxContent,
  sender: { address: string; walletID: WalletID }
): Promise<Estimate | null> {
  try {
    switch (content.chainID) {
      case "juno-1":
      case "uni-6": {
        const { val, chainID } = content;
        return estimateCosmosFee(chainID, sender.address, val);
      }
      case "phoenix-1":
      case "pisco-1": {
        const { chainID, val, wallet } = content;
        return estimateTerraFee(chainID, sender.address, val, wallet);
      }

      //evm chains
      default: {
        const { chainID, val } = content;
        return estimateEVMFee(chainID, sender.address, val);
      }
    }
  } catch (err) {
    logger.error(err);
    return null;
  }
}
