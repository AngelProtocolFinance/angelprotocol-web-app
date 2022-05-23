import { Dwindow, Providers } from "slices/providerSlice";
import { WalletDisconnectError } from "errors/errors";

export default function getInjectedProvider(activeProvider: Providers) {
  const dwindow = window as Dwindow;
  switch (activeProvider) {
    case "ethereum":
      return dwindow.ethereum;
    case "binance":
      return dwindow.BinanceChain;
    default:
      throw new WalletDisconnectError();
  }
}
