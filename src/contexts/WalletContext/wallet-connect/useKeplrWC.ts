import { KeplrQRCodeModalV2 } from "@keplr-wallet/wc-qrcode-modal";
import { useEffect, useRef, useState } from "react";
import { Connection, ProviderInfo } from "../types";
import { Connected, ProviderState } from "../types-v2";
import { SessionTypes } from "@walletconnect/types";
import { _pairing, _session, account } from "helpers/wallet-connect";
import { WALLET_METADATA } from "../constants";

/** NOTE: only use this wallet in mainnet */
export function useKeplrWC() {
  const [state, setState] = useState<ProviderState>({
    status: "disconnected",
  });
  const qrModalRef = useRef<KeplrQRCodeModalV2>();

  function onSessionDelete() {
    setState({ status: "disconnected" });
  }

  /** persistent connection */
  useEffect(() => {
    (async () => {
      setState({ status: "loading" });
      const { client, session } = await _session("Keplr");

      if (session) {
        setState(connected(session.namespaces));
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

      const { client, pairing } = await _pairing("Keplr");

      const QRModal = new KeplrQRCodeModalV2(client);
      qrModalRef.current = QRModal;

      const { uri, approval } = await client.connect({
        pairingTopic: pairing?.topic,
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
        QRModal.open(uri, (/** close callback */) => {
          setState({ status: "disconnected" });
        });
      } else {
        setState({ status: "loading" });
      }
      const session = await approval();

      setState(connected(session.namespaces));

      client.on("session_delete", onSessionDelete);
      if (uri) {
        QRModal.close();
      }
    } catch (err) {
      setState({ status: "disconnected" });
    } finally {
      qrModalRef.current?.close();
    }
  }

  async function disconnect() {
    setState({ status: "loading" });
    const { session, client } = await _session("Keplr");

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
          logo: WALLET_METADATA["keplr-wc"].logo,
          providerId: "keplr-wc",
          chainId: state.chainId,
          address: state.address,
        }
      : undefined;

  const connection: Connection = {
    providerId: "keplr-wc",
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
  isSwitchingChain: false,
  ...account(namespaces.cosmos),
});
