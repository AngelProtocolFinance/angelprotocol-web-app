import QRCodeModal from "@walletconnect/qrcode-modal";
import { useEffect, useRef, useState } from "react";
import { Connection, ProviderInfo } from "../types";
import { WalletState } from "./types";
import { WCProvider as WCP } from "helpers/evm";
import { WC_EVENT } from "constants/wallet-connect";
import { WALLET_METADATA } from "../constants";

export default function useEVMWC() {
  const uriRef = useRef<string>("");
  const [walletState, setWalletState] = useState<WalletState>({
    status: "disconnected",
    connect,
  });

  /** persistent connection */
  useEffect(() => {
    if (WCP.wc.connected) connect(false /** re-enable connection again */);
    //eslint-disable-next-line
  }, []);

  /** new connection */
  async function connect(isNew = true) {
    try {
      setWalletState({ status: "loading" });

      if (uriRef.current || isNew) {
        QRCodeModal.open(
          uriRef.current,
          () => {
            setWalletState({ status: "disconnected", connect });
          },
          { mobileLinks: ["metamask"], desktopLinks: [] }
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
          logo: WALLET_METADATA["evm-wc"].logo,
          providerId: "evm-wc",
          chainId: walletState.chainId,
          address: walletState.address,
        }
      : undefined;

  const connection: Connection = {
    /** metamask for now, but any EVM compatible wallets that supports WC can use this */
    name: "Metamask",
    logo: WALLET_METADATA["evm-wc"].logo,
    installUrl: WALLET_METADATA["evm-wc"].logo,
    connect,
  };

  return {
    connection,
    disconnect,
    isLoading: walletState.status === "loading",
    providerInfo,
  };
}
