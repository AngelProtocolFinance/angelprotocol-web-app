import { createStore } from "mipd";
import type { InjectedProvider, RequestArguments } from "types/evm";
import type { InjectedProviderID } from "types/wallet";

const store = createStore();
const provider = (rdns: string) => store.findProvider({ rdns })?.provider;

export function injectedProvider(
  id: InjectedProviderID
): InjectedProvider | undefined {
  switch (id) {
    case "trust-wallet":
      return provider("com.trustwallet.app");
    case "metamask":
      return provider("io.metamask");
    /** only used in sendTx */
    case "xdefi-evm":
      return provider("io.xdefi");
    case "coinbase":
      return provider("com.coinbase.wallet");
    default:
      const x: never = id;
      throw new Error(`${x} not used`);
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
