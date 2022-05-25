import { Dwindow, InjectedProvider, ProviderId } from "../types";

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
      throw new Error("wallet is not connected");
  }
}
