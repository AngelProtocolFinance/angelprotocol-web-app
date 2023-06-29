import { ProviderId } from "contexts/WalletContext/types";
import { Dwindow, InjectedProvider, RequestArguments } from "types/ethereum";
import { signClient } from "./wallet-connect";

export async function wcProvider(): Promise<Partial<InjectedProvider>> {
  const client = await signClient();
  const session = client.session
    .getAll()
    .find((s) => s.peer.metadata.name === "Metamask");
  if (!session) throw new Error("@dev: no metamask session");

  const { namespaces, topic } = session;
  const eip115 = namespaces.eip115;
  const [, chainId] = eip115.accounts[0].split(":");

  return {
    async request<T>({ method, params }: RequestArguments): Promise<T> {
      return client.request<T>({
        topic,
        chainId: `evm:${chainId}`,
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
