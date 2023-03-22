import { ConnectedWallet } from "@terra-money/wallet-provider";
import { Estimate, TxContent } from "types/tx";
import { WalletState } from "contexts/WalletContext";
import estimateCosmosFee from "./estimateCosmosFee";
import { estimateEVMFee } from "./estimateEVMfee";
import estimateTerraFee from "./estimateTerraFee";

export default async function estimateTx(
  content: TxContent,
  wallet: WalletState,
  terraWallet?: ConnectedWallet
): Promise<Estimate | null> {
  try {
    switch (content.type) {
      case "cosmos":
        return estimateCosmosFee(wallet, content.val);
      case "terra":
        return estimateTerraFee(wallet, terraWallet!, content.val);
      default:
        return estimateEVMFee(wallet, content.val);
    }
  } catch (err) {
    return null;
  }
}
