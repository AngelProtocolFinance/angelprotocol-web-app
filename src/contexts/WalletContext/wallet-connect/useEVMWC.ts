import { WalletConnectModal } from "@walletconnect/modal";
import { useEffect, useRef, useState } from "react";
import { Connection, ProviderInfo } from "../types";
import { Connected, WalletState } from "./types";
import { SessionTypes, SignClientTypes } from "@walletconnect/types";
import {
  _pairing,
  _session,
  account,
  signClient,
} from "helpers/wallet-connect";
import { EIPMethods } from "constants/evm";
import { WALLET_METADATA } from "../constants";

const wcModal = new WalletConnectModal({
  projectId: "039a7aeef39cb740398760f71a471957",
  enableExplorer: false,
  chains: ["eip155:137"],
});

/** NOTE: only use this wallet in mainnet */
export function useEVMWC() {
  const unsubscribeRef = useRef<() => void>();
  const uriRef = useRef<string>();

  const [state, setState] = useState<WalletState>({
    status: "disconnected",
  });

  function onSessionDelete() {
    setState({ status: "disconnected" });
  }

  function onSessionUpdate({
    params: { namespaces },
  }: SignClientTypes.EventArguments["session_update"]) {
    setState(connected(namespaces));
  }

  /** persistent connection */
  useEffect(() => {
    (async () => {
      setState({ status: "loading" });
      const client = await signClient;
      const prevSession = _session("MetaMask Wallet", client);

      if (prevSession) {
        setState(connected(prevSession.namespaces));
        client.on("session_update", onSessionUpdate);
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
      const client = await signClient;

      const prevPairing = _pairing("MetaMask Wallet", client);

      setState({ status: "loading" });
      const { uri, approval } = await client.connect({
        pairingTopic: prevPairing?.topic,
        requiredNamespaces: {
          eip155: {
            methods: Object.values(EIPMethods),
            chains: ["eip155:137"],
            events: ["chainChanged", "accountsChanged"],
          },
        },
      });

      // uri is only returned for new pairings
      if (uri) {
        uriRef.current = uri;

        //disconnect if modal is closed without scanning
        unsubscribeRef.current = wcModal.subscribeModal(({ open }) => {
          if (!open) {
            setState((p) => {
              if (p.status === "connected") return p;
              return { status: "disconnected" };
            });
            unsubscribeRef.current?.();
          }
        });

        wcModal.openModal({ uri });
      }

      const session = await approval();
      setState(connected(session.namespaces));
      client.on("session_delete", onSessionDelete);
      client.on("session_update", onSessionUpdate);
    } catch (err) {
      console.log(err);
      setState({ status: "disconnected" });
    } finally {
      unsubscribeRef.current?.();
      if (uriRef.current) {
        wcModal.closeModal();
      }
    }
  }

  async function disconnect() {
    setState({ status: "loading" });
    const client = await signClient;
    const session = _session("MetaMask Wallet", client);

    if (session) {
      await client.disconnect({
        topic: session.topic,
        reason: { code: 1, message: "user disconnected" },
      });
    }
    client.off("session_update", onSessionUpdate);
    client.off("session_delete", onSessionDelete);
    setState({ status: "disconnected" });
  }

  /** TODO: refactor to just return Meta & WalletState */
  const providerInfo: ProviderInfo | undefined =
    state.status === "connected"
      ? {
          logo: WALLET_METADATA["evm-wc"].logo,
          providerId: "evm-wc",
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
  ...account(namespaces.eip155),
});
