import WalletConnectProvider from "@walletconnect/web3-provider";
import { ProviderId } from "contexts/WalletContext/types";
import { InjectedProvider } from "types/evm";
import { Dwindow } from "types/window";

export const WCProvider = new WalletConnectProvider({
  infuraId: process.env.REACT_APP_INFURA_ID,
  qrcodeModalOptions: { mobileLinks: ["metamask"], desktopLinks: [] },
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
    case "evm-wc":
      return WCProvider as unknown as InjectedProvider;
    case "xdefi-evm":
      return dwindow.xfi?.ethereum as InjectedProvider;
    default:
      return undefined;
  }
}
