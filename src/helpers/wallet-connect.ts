import { SignClient } from "@walletconnect/sign-client";
import type { SessionTypes } from "@walletconnect/types";

type Name = "Keplr" | "MetaMask Wallet";

const signClient = SignClient.init({
  projectId: "039a7aeef39cb740398760f71a471957",
});

type Account = { chainId: string; address: string };
export const account = (namespace: SessionTypes.Namespace): Account => {
  const [, chainId, address] = namespace.accounts[0].split(":");
  return { address, chainId };
};

export const _session = async (name: Name) => {
  const client = await signClient;
  const session = client.session
    .getAll()
    ?.find((s) => s.peer.metadata.name === name);
  return { session, client };
};

export const _pairing = async (name: Name) => {
  const client = await signClient;
  const pairing = client.pairing
    .getAll({ active: true })
    ?.find((p) => p.peerMetadata?.name === name);

  return { pairing, client };
};
