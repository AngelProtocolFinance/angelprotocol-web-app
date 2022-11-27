import WalletConnect from "@walletconnect/client";
import { ProviderId } from "contexts/WalletContext/types";
import { Dwindow, InjectedProvider } from "types/ethereum";

export const connector = new WalletConnect({
  bridge: "https://bridge.walletconnect.org", // Required
  /** use default signing methods  */
});

export function getProvider(
  providerId: ProviderId
): InjectedProvider | undefined {
  const dwindow = window as Dwindow;
  switch (providerId) {
    case "binance-wallet":
      return dwindow.BinanceChain;
    case "metamask":
      return dwindow.ethereum;
    /** only used in sendTx */
    case "xdefi-evm":
      return dwindow.xfi?.ethereum;
    default:
      return undefined;
  }
}
