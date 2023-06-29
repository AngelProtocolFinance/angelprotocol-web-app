import { SignClient } from "@walletconnect/sign-client";
import type { SignClient as TSignClient } from "@walletconnect/sign-client/dist/types/client";
import { SessionTypes } from "@walletconnect/types";

type Name = "Keplr" | "Metamask";

let client: TSignClient;
export async function signClient(): Promise<TSignClient> {
  if (client) return client;
  client = await SignClient.init({
    projectId: "039a7aeef39cb740398760f71a471957",
  });
  return client;
}

type Account = { chainId: string; address: string };
export const account = (namespace: SessionTypes.Namespace): Account => {
  const [, chainId, address] = namespace.accounts[0].split(":");
  return { address, chainId };
};

export const session = (name: Name, _client: TSignClient) =>
  _client.session.getAll().find((s) => s.peer.metadata.name === name);

export const pairing = (name: Name, _client: TSignClient) =>
  _client.pairing
    .getAll({ active: true })
    .find((p) => p.peerMetadata?.name === name);
