import { useEffect, useState } from "react";
import { Connection, ProviderInfo } from "../types";
import { Connected, WalletState } from "./types";
import { SessionTypes } from "@walletconnect/types";
import {
  pairing as _pairing,
  session as _session,
  account,
  signClient,
  wcModal,
} from "helpers/wallet-connect";
import { WALLET_METADATA } from "../constants";

//user peer name as ID
const PEER_NAME = "Metamask";

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
          cosmos: {
            methods: ["cosmos_signDirect", "cosmos_signAmino"],
            chains: ["cosmos:juno-1"],
            events: [],
          },
        },
      });

      // uri is only returned for new pairings
      if (uri) {
        wcModal.openModal({ uri, chains: ["eip115:80001", "eip115:137"] });
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
    const session = client.session
      .getAll()
      .find((s) => s.peer.metadata.name === PEER_NAME);

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
    name: "Keplr mobile",
    logo: WALLET_METADATA["keplr-wc"].logo,
    installUrl: WALLET_METADATA["keplr-wc"].logo,
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
