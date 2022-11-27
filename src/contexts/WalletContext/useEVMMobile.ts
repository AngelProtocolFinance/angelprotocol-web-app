import QRCodeModal from "@walletconnect/qrcode-modal";
import { useState } from "react";
import { Connection, ProviderId, ProviderInfo } from "./types";
import { useErrorContext } from "contexts/ErrorContext";
import { connector as ctor } from "helpers/evm";
import { WC_EVENT } from "constants/wallet-connect";
import { WALLET_METADATA } from "./constants";

type WalletState =
  | { status: "loading" }
  | {
      status: "connected";
      address: string;
      chainId: string;
      disconnect(): void;
    }
  | { status: "disconnected"; connect(): void };

type Meta = { id: ProviderId; logo: string };
type Wallet = Meta & WalletState;

/** NOTE: only use this wallet in mainnet */
export default function useEVMMObile() {
  const { handleError } = useErrorContext();

  const [walletState, setWalletState] = useState<WalletState>({
    status: "disconnected",
    connect,
  });

  /** persistent connection */

  /** new connection */
  async function connect() {
    setWalletState({ status: "loading" });

    await ctor.createSession();
    QRCodeModal.open(
      ctor.uri,
      () => {
        /** modal is closed without connecting */
        if (!ctor.connected) {
          setWalletState({ status: "disconnected", connect });
        }
      },
      {
        mobileLinks: [],
        desktopLinks: [],
      }
    );

    ctor.on(WC_EVENT.connect, async (error, payload) => {
      try {
        if (error) {
          throw Error(error.message);
        }
        const { accounts, chainId } = payload.params[0];
        setWalletState({
          status: "connected",
          disconnect,
          address: accounts[0],
          chainId: chainId,
        });
      } catch (err) {
        disconnect();
        handleError(err);
      } finally {
        QRCodeModal.close();
      }
    });
    ctor.on(WC_EVENT.update, async (_, payload) => {
      const { accounts, chainId } = payload.params[0];
      setWalletState({
        status: "connected",
        disconnect,
        address: accounts[0],
        chainId: chainId,
      });
    });

    ctor.on(WC_EVENT.disconnect, disconnect);
  }

  function disconnect() {
    ctor.killSession();
    ctor.off(WC_EVENT.disconnect);
    ctor.off(WC_EVENT.update);
    ctor.off(WC_EVENT.disconnect);
    setWalletState({ status: "disconnected", connect });
  }

  /** TODO: refactor to just return Meta & WalletState */
  const providerInfo: ProviderInfo | undefined =
    walletState.status === "connected"
      ? {
          logo: WALLET_METADATA["metamask-mobile"].logo,
          providerId: "metamask-mobile",
          chainId: walletState.chainId,
          address: walletState.address,
        }
      : undefined;

  const connection: Connection = {
    name: "EVM mobile",
    logo: WALLET_METADATA["metamask-mobile"].logo,
    installUrl: WALLET_METADATA["metamask-mobile"].logo,
    connect,
  };

  return {
    connection,
    disconnect,
    isLoading: walletState.status === "loading",
    providerInfo,
  };
}
