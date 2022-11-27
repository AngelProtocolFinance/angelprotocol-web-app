import WalletConnectProvider from "@walletconnect/web3-provider";
import { ProviderId } from "contexts/WalletContext/types";
import { Dwindow, InjectedProvider } from "types/ethereum";

export const WCProvider = new WalletConnectProvider({
  infuraId: "2c84f212a9eb40fa9c60f8b5d78f60db",
  qrcodeModalOptions: { mobileLinks: [], desktopLinks: [] },
  storageId: "wc_evm",
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
    case "metamask-mobile":
      return WCProvider as unknown as InjectedProvider;
    case "xdefi-evm":
      return dwindow.xfi?.ethereum;
    default:
      return undefined;
  }
}
