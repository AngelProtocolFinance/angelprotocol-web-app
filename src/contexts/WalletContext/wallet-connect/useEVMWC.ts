import QRCodeModal from "@walletconnect/qrcode-modal";
import { useEffect, useState } from "react";
import { Connection, ProviderInfo } from "../types";
import { WalletState } from "./types";
import { connector as ctor } from "helpers/evm";
import { WalletError } from "errors/errors";
import { WALLET_METADATA } from "../constants";
import { WC_EVENT } from "./constants";

export function useEVMWC() {
  const [state, setState] = useState<WalletState>({
    status: "disconnected",
    connect,
  });

  /** persistent connection */
  useEffect(() => {
    if (ctor.connected) connect(false);
    //eslint-disable-next-line
  }, []);

  /** new connection */
  async function connect(isNew = true) {
    if (isNew) {
      setState({ status: "loading" });
      await ctor.createSession();

      QRCodeModal.open(
        ctor.uri,
        () => {
          /** modal is closed without connecting */
          if (!ctor.connected) {
            setState({ status: "disconnected", connect });
          }
        },
        { mobileLinks: ["metamask"], desktopLinks: [] }
      );

      ctor.on(WC_EVENT.connect, async (error, payload) => {
        if (error) {
          disconnect();
          throw new WalletError("Failed to connect to wallet", 0);
        }
        const { accounts, chainId } = payload.params[0];
        setState({
          status: "connected",
          disconnect,
          address: accounts[0],
          chainId: `${chainId}`,
        });
        QRCodeModal.close();
      });
    } else {
      const { chainId, accounts } = ctor.session;
      setState({
        status: "connected",
        disconnect,
        address: accounts[0],
        chainId: `${chainId}`,
      });
    }

    ctor.on(WC_EVENT.update, (error, payload) => {
      if (error) return;
      // Get updated accounts and chainId
      const { accounts, chainId } = payload.params[0];
      setState((prev) =>
        prev.status === "connected"
          ? { ...prev, address: accounts[0], chainId: `${chainId}` }
          : prev
      );
    });

    ctor.on(WC_EVENT.disconnect, disconnect);
  }

  function disconnect() {
    ctor.killSession();
    ctor.off(WC_EVENT.connect);
    ctor.off(WC_EVENT.disconnect);
    setState({ status: "disconnected", connect });
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
    /** metamask for now, but any EVM compatible wallets that supports WC can use this */
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
