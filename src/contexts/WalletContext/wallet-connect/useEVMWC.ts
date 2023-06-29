import { WalletConnectModal } from "@walletconnect/modal";
import { useEffect, useState } from "react";
import { Connection, ProviderInfo } from "../types";
import { Connected, WalletState } from "./types";
import { SessionTypes } from "@walletconnect/types";
import {
  pairing as _pairing,
  session as _session,
  account,
  signClient,
} from "helpers/wallet-connect";
import { WALLET_METADATA } from "../constants";

export const wcModal = new WalletConnectModal({
  projectId: "039a7aeef39cb740398760f71a471957",
  chains: ["eip155:80001", "eip155:137"],
});

/** NOTE: only use this wallet in mainnet */
export function useEVMWC() {
  const [state, setState] = useState<WalletState>({
    status: "disconnected",
  });

  function onSessionDelete() {
    setState({ status: "disconnected" });
  }

  /** persistent connection */
  useEffect(() => {
    (async () => {
      setState({ status: "loading" });
      const client = await signClient();
      const prevSession = _session("Metamask");

      if (prevSession) {
        setState(connected(prevSession.namespaces));

        client.on("session_update", ({ params }) => {
          setState(connected(params.namespaces));
        });

        client.on("session_delete", onSessionDelete);
      } else {
        setState({ status: "disconnected" });
      }
    })();
    //eslint-disable-next-line
  }, []);

  /** new connection */
  async function connect() {
    try {
      setState({ status: "loading" });
      const client = await signClient();

      const prevPairing = _pairing("Metamask");

      const { uri, approval } = await client.connect({
        pairingTopic: prevPairing?.topic,
        requiredNamespaces: {
          eip155: {
            methods: ["eth_sendTransaction", "personal_sign"],
            chains: ["eip155:80001", "eip155:137"],
            events: ["chainChanged", "accountsChanged"],
          },
        },
      });

      // uri is only returned for new pairings
      if (uri) {
        wcModal.openModal({ uri });
      } else {
        setState({ status: "loading" });
      }
      const session = await approval();
      setState(connected(session.namespaces));
      client.on("session_delete", onSessionDelete);
      if (uri) {
        wcModal.closeModal();
      }
    } catch (err) {
      setState({ status: "disconnected" });
    } finally {
      wcModal.closeModal();
    }
  }

  async function disconnect() {
    setState({ status: "loading" });
    const client = await signClient();
    const session = _session("Metamask");

    if (session) {
      await client.disconnect({
        topic: session.topic,
        reason: { code: 1, message: "user disconnected" },
      });
    }
    client.off("session_delete", onSessionDelete);
    setState({ status: "disconnected" });
  }

  /** TODO: refactor to just return Meta & WalletState */
  const providerInfo: ProviderInfo | undefined =
    state.status === "connected"
      ? {
          logo: WALLET_METADATA["evm-wc"].logo,
          providerId: "keplr-wc",
          chainId: state.chainId,
          address: state.address,
        }
      : undefined;

  const connection: Connection = {
    name: "Metamask mobile",
    logo: WALLET_METADATA["evm-wc"].logo,
    installUrl: WALLET_METADATA["evm-wc"].logo,
    connect,
  };

  return {
    connection,
    disconnect,
    isLoading: state.status === "loading",
    providerInfo,
  };
}

const connected = (namespaces: SessionTypes.Namespaces): Connected => ({
  status: "connected",
  ...account(namespaces.eip115),
});
