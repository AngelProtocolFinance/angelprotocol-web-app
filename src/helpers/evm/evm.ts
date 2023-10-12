import { InjectedProvider, RequestArguments } from "types/evm";
import { ProviderId } from "types/lists";
import web3Auth from "contexts/WalletContext/useWeb3Auth/web3AuthSetup";
import { _session, account } from "helpers/wallet-connect";

export async function wcProvider(): Promise<Partial<InjectedProvider>> {
  //FUTURE: pass peer name in wcProvider call
  const { session, client } = await _session("MetaMask Wallet");
  const { chainId } = account(session!.namespaces.eip155);
  return {
    async request<T>({ method, params }: RequestArguments): Promise<T> {
      return client.request<T>({
        topic: session!.topic,
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
  switch (providerId) {
    case "binance-wallet":
      return window.BinanceChain;
    case "metamask":
      return window.ethereum;
    case "web3auth-torus":
      return web3Auth.provider as InjectedProvider;
    /** only used in sendTx */
    case "evm-wc":
      return wcProvider() as Promise<InjectedProvider>;
    case "xdefi-evm":
      return window.xfi?.ethereum as InjectedProvider;
    default:
      return undefined;
  }
}

type Result = { result: string } | { error: { code: number; message: string } };
export async function request({
  method,
  params,
  rpcURL,
}: RequestArguments & { rpcURL: string }) {
  const result = await fetch(rpcURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method,
      params,
    }),
  }).then<Result>((res) => {
    if (!res.ok) throw new Error(`Failed request ${method}`);
    return res.json();
  });

  if ("error" in result) throw new Error(result.error.message);

  return result.result;
}
