import { WalletConnectModal } from "@walletconnect/modal";
import { useEffect, useRef, useState } from "react";
import { SignClient } from "@walletconnect/sign-client/dist/types/client";
import { SessionTypes, SignClientTypes } from "@walletconnect/types";
import { RequestArguments } from "types/evm";
import {
  EVMConnected,
  EVMProviderState,
  Wallet,
  WalletMeta,
} from "types/wallet";
import { logger } from "helpers";
import { _pairing, _session, account } from "helpers/wallet-connect";
import { EIPMethods } from "constants/evm";

const wcModal = new WalletConnectModal({
  projectId: "039a7aeef39cb740398760f71a471957",
  enableExplorer: false,
  chains: ["eip155:137"],
  mobileWallets: [
    {
      id: "metamask",
      name: "MetaMask",
      links: {
        native: "metamask://",
        universal: "https://metamask.app.link",
      },
    },
  ],
  walletImages: {
    metamask: "/icons/wallets/metamask.png",
  },
});

/** NOTE: only use this wallet in mainnet */
export function useEVMWC(meta: WalletMeta): Wallet {
  const unsubscribeRef = useRef<() => void>();
  const uriRef = useRef<string>();

  const [state, setState] = useState<EVMProviderState>({
    status: "disconnected",
  });

  function onSessionDelete() {
    setState({ status: "disconnected" });
  }

  function onSessionUpdate({
    params: { namespaces },
  }: SignClientTypes.EventArguments["session_update"]) {
    setState((prev) =>
      prev.status === "connected"
        ? { ...prev, ...account(namespaces.eip155) }
        : prev,
    );
  }

  /** persistent connection */
  useEffect(() => {
    (async () => {
      setState({ status: "loading" });
      const { session, client } = await _session("MetaMask Wallet");
      if (session) {
        setState(connected(session, client));
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

      const { pairing, client } = await _pairing("MetaMask Wallet");

      setState({ status: "loading" });
      const { uri, approval } = await client.connect({
        pairingTopic: pairing?.topic,
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

      setState(connected(session, client));
      client.on("session_delete", onSessionDelete);
      client.on("session_update", onSessionUpdate);
    } catch (err) {
      logger.error(err);
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
    const { session, client } = await _session("MetaMask Wallet");

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

  return { ...state, ...meta, ...{ connect, disconnect, switchChain: null } };
}

const connected = (
  session: SessionTypes.Struct,
  client: SignClient,
): EVMConnected => {
  const acc = account(session.namespaces.eip155);
  return {
    ...acc,
    status: "connected",
    isSwitching: false,
    id: "evm-wc",
    request<T>({ method, params }: RequestArguments) {
      return client.request<T>({
        topic: session!.topic,
        chainId: `eip155:${acc.chainId}`,
        request: {
          method,
          params,
        },
      });
    },
  };
};
