import WalletConnect from "@walletconnect/client";
import {
  InjectedProvider,
  Primitives,
  RequestArguments,
  Tuple,
  Tupleable,
} from "types/evm";
import { ProviderId } from "types/lists";
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

function isTupleable(val: Primitives | Tupleable): val is Tupleable {
  return !(
    typeof val === "number" ||
    typeof val === "string" ||
    typeof val === "boolean"
  );
}

export function toTuple(val: Tupleable): Tuple {
  return Object.values(val).map((v) => {
    if (
      typeof v === "number" ||
      typeof v === "string" ||
      typeof v === "boolean"
    ) {
      return v;
    } else if (Array.isArray(v)) {
      return v.map((_v) => {
        return isTupleable(_v) ? toTuple(_v) : _v;
      });
    } else {
      return toTuple(v);
    }
  });
}
