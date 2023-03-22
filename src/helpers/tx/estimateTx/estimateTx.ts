import { ConnectedWallet } from "@terra-money/wallet-provider";
import { Estimate, TxContent } from "types/tx";
import { WalletState } from "contexts/WalletContext";
import estimateCosmosFee from "./estimateCosmosFee";
import { estimateEVMFee } from "./estimateEVMfee";
import estimateTerraFee from "./estimateTerraFee";

export default async function estimateTx(
  tx: TxContent,
  wallet: WalletState,
  terraWallet?: ConnectedWallet
): Promise<Estimate | null> {
  try {
    switch (tx.type) {
      case "cosmos":
        return estimateCosmosFee(wallet, tx.val);
      case "terra":
        return estimateTerraFee(wallet, terraWallet!, tx.val);
      default:
        return estimateEVMFee(wallet, tx.val);
    }
  } catch (err) {
    return null;
  }
}
