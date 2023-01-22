import WalletConnect from "@walletconnect/client";
import { ProviderId } from "contexts/WalletContext/types";
import { InjectedProvider, RequestArguments } from "types/evm";
import { Dwindow } from "types/window";
import { WC_BRIDGE } from "constants/urls";

export const connector = new WalletConnect({
  bridge: WC_BRIDGE,
  storageId: "wc_evm",
  qrcodeModalOptions: { mobileLinks: ["metamask"], desktopLinks: [] },
});

const wcProvider: Partial<InjectedProvider> = {
  async request<T>({ method, params }: RequestArguments): Promise<T> {
    return connector.sendCustomRequest({ method, params: params as any });
  },
};

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
      return wcProvider as InjectedProvider;
    case "xdefi-evm":
      return dwindow.xfi?.ethereum as InjectedProvider;
    default:
      return undefined;
  }
}
