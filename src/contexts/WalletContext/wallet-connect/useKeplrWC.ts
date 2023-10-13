import { KeplrQRCodeModalV2 } from "@keplr-wallet/wc-qrcode-modal";
import { useEffect, useRef, useState } from "react";
import { SessionTypes } from "@walletconnect/types";
import { Connected, ProviderState, Wallet, WalletMeta } from "types/wallet";
import { _pairing, _session, account } from "helpers/wallet-connect";

const keplrIcon = "/icons/wallets/keplr.png";

/** NOTE: only use this wallet in mainnet */
export function useKeplrWC(): Wallet {
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
  const meta: WalletMeta = {
    id: "keplr-wc",
    logo: keplrIcon,
    name: "Keplr mobile",
    type: "cosmos",
  };

  return { ...state, ...meta, ...{ connect, disconnect, switchChain: null } };
}

const connected = (namespaces: SessionTypes.Namespaces): Connected => ({
  status: "connected",
  isSwitchingChain: false,
  ...account(namespaces.cosmos),
});
