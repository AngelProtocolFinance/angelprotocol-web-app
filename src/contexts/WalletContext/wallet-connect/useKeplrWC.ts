import { KeplrQRCodeModalV1 } from "@keplr-wallet/wc-qrcode-modal";
import SignClient from "@walletconnect/sign-client";
import { useEffect, useState } from "react";
import { Connection, ProviderInfo } from "../types";
import { Connected, WalletState } from "./types";
import { SessionTypes } from "@walletconnect/types";
import {
  pairing as _pairing,
  session as _session,
  account,
} from "helpers/wallet-connect";
import { WALLET_METADATA } from "../constants";

const QRModal = new KeplrQRCodeModalV1();

//user peer name as ID
const PEER_NAME = "Keplr";

let client: SignClient;
async function getClient(): Promise<SignClient> {
  if (client) return client;
  client = await SignClient.init({
    projectId: "039a7aeef39cb740398760f71a471957",
  });
  return client;
}

/** NOTE: only use this wallet in mainnet */
export function useKeplrWC() {
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
      const client = await getClient();
      const prevSession = client.session
        .getAll()
        .find((s) => s.peer.metadata.name === PEER_NAME);

      if (prevSession) {
        setState(connected(prevSession.namespaces));
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
      const client = await getClient();

      const prevSession = _session("Keplr");
      if (prevSession) {
        return console.log(prevSession);
      }

      const prevPairing = _pairing("Keplr");

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
      QRModal.close();
    }
  }

  async function disconnect() {
    setState({ status: "loading" });
    const client = await getClient();
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
          logo: WALLET_METADATA["keplr-wc"].logo,
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
  ...account(namespaces.cosmos),
});
