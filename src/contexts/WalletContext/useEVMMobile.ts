import QRCodeModal from "@walletconnect/qrcode-modal";
import { useEffect, useRef, useState } from "react";
import { Connection, ProviderInfo } from "./types";
import { WCProvider as WCP } from "helpers/evm";
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

// type Meta = { id: ProviderId; logo: string };
// type Wallet = Meta & WalletState;

/** NOTE: only use this wallet in mainnet */
export default function useEVMMObile() {
  const uriRef = useRef<string>("");
  const [walletState, setWalletState] = useState<WalletState>({
    status: "disconnected",
    connect,
  });

  /** persistent connection */
  useEffect(() => {
    if (WCP.connected) {
      setWalletState({
        status: "connected",
        disconnect,
        address: WCP.accounts[0],
        chainId: `${WCP.chainId}`,
      });
    }
    //eslint-disable-next-line
  }, []);

  /** new connection */
  async function connect() {
    try {
      setWalletState({ status: "loading" });

      if (uriRef.current) {
        QRCodeModal.open(
          uriRef.current,
          () => {
            setWalletState({ status: "disconnected", connect });
          },
          { mobileLinks: [], desktopLinks: [] }
        );
      }
      const accounts = await WCP.enable();
      setWalletState({
        status: "connected",
        disconnect,
        address: accounts[0],
        chainId: `${WCP.chainId}`,
      });

      WCP.wc.on(
        WC_EVENT.update,
        (error, { params: [{ accounts, chainId }] }) => {
          setWalletState({
            status: "connected",
            disconnect,
            address: accounts[0],
            chainId: `${chainId}`,
          });
        }
      );
      WCP.wc.on(WC_EVENT.disconnect, (error) => {
        setWalletState({ status: "disconnected", connect });
      });
    } catch (err) {
      setWalletState({ status: "disconnected", connect });
    } finally {
      uriRef.current = WCP.wc.uri;
      QRCodeModal.close();
    }
  }

  function disconnect() {
    WCP.disconnect();
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
