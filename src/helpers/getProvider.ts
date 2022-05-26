import {
  Dwindow,
  InjectedProvider,
  ProviderId,
} from "../contexts/WalletContext/types";

export function getProvider(
  providerId: ProviderId
): InjectedProvider | undefined {
  const dwindow = window as Dwindow;
  switch (providerId) {
    case "binance-wallet":
      return dwindow.BinanceChain;
    case "metamask":
      return dwindow.ethereum;
    default:
      return undefined;
  }
}
