import { Dwindow, InjectedProvider } from "types/ethereum";
import { ProviderId } from "contexts/WalletContext/types";

export function getProvider(
  providerId: ProviderId
): InjectedProvider | undefined {
  const dwindow = window as Dwindow;
  switch (providerId) {
    case "binance-wallet":
      return dwindow.BinanceChain;
    case "metamask":
      return dwindow.ethereum;
    case "xdefi":
      return dwindow.xfi?.ethereum;
    default:
      return undefined;
  }
}
