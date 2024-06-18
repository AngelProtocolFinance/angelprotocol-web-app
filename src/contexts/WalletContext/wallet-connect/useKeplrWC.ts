import { TxRaw } from "@keplr-wallet/proto-types/cosmos/tx/v1beta1/tx";
import { KeplrQRCodeModalV2 } from "@keplr-wallet/wc-qrcode-modal";
import type { SignClient } from "@walletconnect/sign-client/dist/types/client";
import type { SessionTypes } from "@walletconnect/types";
import { _pairing, _session, account } from "helpers/wallet-connect";
import { useEffect, useRef, useState } from "react";
import type { SignDoc, WCSignDirectRes } from "types/cosmos";
import type {
  CosmosConnected,
  CosmosProviderState,
  Wallet,
  WalletMeta,
} from "types/wallet";

const keplrIcon = "/icons/wallets/keplr.png";

/** NOTE: only use this wallet in mainnet */
export function useKeplrWC(): Wallet {
  const [state, setState] = useState<CosmosProviderState>({
    status: "disconnected",
  });
  const qrModalRef = useRef<KeplrQRCodeModalV2>();

  const onSessionDelete = () => {
    setState({ status: "disconnected" });
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: persistent connection
  useEffect(() => {
    (async () => {
      setState({ status: "loading" });
      const { client, session } = await _session("Keplr");

      if (session) {
        setState(connected(session, client));
        client.on("session_delete", onSessionDelete);
      } else {
        setState({ status: "disconnected" });
      }
    })();
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
            chains: ["cosmos:juno-1", "cosmos:kaiyo-1", "cosmos:stargaze-1"],
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

      setState(connected(session, client));

      client.on("session_delete", onSessionDelete);
      if (uri) {
        QRModal.close();
      }
    } catch (_) {
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
    logo: keplrIcon,
    name: "Keplr mobile",
    supportedChains: ["juno-1", "kaiyo-1", "stargaze-1"],
  };

  return {
    ...state,
    ...meta,
    ...{ connect, disconnect, switchChain: null },
  };
}

const connected = (
  session: SessionTypes.Struct,
  client: SignClient
): CosmosConnected => {
  return {
    ...account(session.namespaces.cosmos),
    id: "keplr-wc",
    status: "connected",
    isSwitching: false,
    async sign(chainID, signer, doc: SignDoc) {
      const tx = TxRaw.fromPartial({
        bodyBytes: doc.bodyBytes,
        authInfoBytes: doc.authInfoBytes,
      });
      const { authInfoBytes, bodyBytes } = TxRaw.toJSON(tx) as any;
      const { signature } = await client
        .request<WCSignDirectRes>({
          topic: session.topic,
          chainId: `cosmos:${chainID}`,
          request: {
            method: "cosmos_signDirect",
            params: {
              signerAddress: signer,
              signDoc: {
                authInfoBytes,
                bodyBytes,
                chainId: doc.chainId,
                accountNumber: doc.accountNumber?.toString(),
              },
            },
          },
        })
        .catch((err) => {
          throw err;
        });
      return { signature, signed: doc };
    },
  };
};
