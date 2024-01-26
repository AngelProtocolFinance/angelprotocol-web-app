import { InjectedProvider, RequestArguments } from "types/evm";
import { InjectedProviderID } from "types/wallet";

export async function injectedProvider(
  id: InjectedProviderID,
): Promise<InjectedProvider | undefined> {
  switch (id) {
    case "binance-wallet":
      return window.BinanceChain;
    case "metamask":
      return window.ethereum;
    /** only used in sendTx */
    case "xdefi-evm":
      return window.xfi?.ethereum as InjectedProvider;
    default: {
      const x: never = id;
      throw new Error(`${x} not used`);
    }
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
