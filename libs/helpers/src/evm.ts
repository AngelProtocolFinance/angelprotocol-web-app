import { INFURA_ID } from "@ap/constants";
import { ProviderId } from "@ap/contexts/wallet-context";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Dwindow, InjectedProvider } from "libs/types/src/ethereum";

export const WCProvider = new WalletConnectProvider({
  infuraId: INFURA_ID,
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
      return dwindow.xfi?.ethereum;
    default:
      return undefined;
  }
}
