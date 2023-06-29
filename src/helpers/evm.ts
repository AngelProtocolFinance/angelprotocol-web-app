import { ProviderId } from "contexts/WalletContext/types";
import { Dwindow, InjectedProvider, RequestArguments } from "types/ethereum";
import { session as _session, account, signClient } from "./wallet-connect";

export async function wcProvider(): Promise<Partial<InjectedProvider>> {
  const client = await signClient();
  //FUTURE: pass peer name in wcProvider call
  const session = _session("Metamask", client)!;

  const { chainId } = account(session.namespaces.eip155);

  return {
    async request<T>({ method, params }: RequestArguments): Promise<T> {
      return client.request<T>({
        topic: session.topic,
        chainId: `eip155:${chainId}`,
        request: {
          method,
          params,
        },
      });
    },
  };
}

export async function getProvider(
  providerId: ProviderId
): Promise<InjectedProvider | undefined> {
  const dwindow = window as Dwindow;
  switch (providerId) {
    case "binance-wallet":
      return dwindow.BinanceChain;
    case "metamask":
      return dwindow.ethereum;
    /** only used in sendTx */
    case "evm-wc":
      return wcProvider() as Promise<InjectedProvider>;
    case "xdefi-evm":
      return dwindow.xfi?.ethereum;
    default:
      return undefined;
  }
}
