import { ConnectedWallet as TerraConnectedWallet } from "@terra-money/wallet-provider";
import { Estimate, TxContent } from "types/tx";
import { ConnectedWallet } from "types/wallet";
import { logger } from "../../logger";
import { estimateCosmosFee } from "./estimateCosmosFee";
import { estimateEVMFee } from "./estimateEVMfee";
import estimateTerraFee from "./estimateTerraFee";

export default async function estimateTx(
  content: TxContent,
  wallet: ConnectedWallet,
  terraWallet?: TerraConnectedWallet
): Promise<Estimate | null> {
  try {
    switch (content.type) {
      case "cosmos":
        return estimateCosmosFee(wallet, content.val, content.attribute);
      case "terra":
        return estimateTerraFee(wallet, terraWallet!, content.val);
      default:
        return estimateEVMFee(wallet, content.val, content.log);
    }
  } catch (err) {
    logger.error(err);
    return null;
  }
}
