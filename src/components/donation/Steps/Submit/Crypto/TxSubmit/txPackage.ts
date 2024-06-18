import type { EstimateResult, TxPackage } from "types/tx";
import { type ConnectedWallet, isCosmos, isEVM, isTerra } from "types/wallet";

export const txPackage = (
  estimate: EstimateResult,
  wallet: ConnectedWallet
): TxPackage => {
  const { address: sender } = wallet;

  switch (estimate.chainID) {
    //terra
    case "phoenix-1":
    case "pisco-1": {
      if (!isTerra(wallet)) throw new Error("User selected wrong wallet");
      const { toSend, chainID } = estimate;
      return { toSend, chainID, sender, post: wallet.post };
    }
    //juno
    case "juno-1":
    case "uni-6":
    //kujira
    case "kaiyo-1":
    case "harpoon-4":
    //stargaze
    case "stargaze-1":
    case "elgafar-1": {
      const { toSend, chainID } = estimate;
      if (!isCosmos(wallet)) throw new Error("User selected wrong wallet");
      return {
        chainID,
        sender,
        sign: wallet.sign,
        toSend,
      };
    }
    default: {
      if (!isEVM(wallet)) throw new Error("User selected wrong wallet");
      const { toSend, chainID } = estimate;
      return { toSend, chainID, sender, request: wallet.request };
    }
  }
};
