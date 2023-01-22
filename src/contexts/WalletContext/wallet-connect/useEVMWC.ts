import QRCodeModal from "@walletconnect/qrcode-modal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Wallet, WalletState } from "../types";
import metamaskIcon from "assets/icons/wallets/metamask.png";
import { connector as ctor, getProvider } from "helpers/evm";
import { WC_EVENT } from "./constants";

export function useEVMWC(): Wallet {
  const [state, setState] = useState<WalletState>({
    status: "disconnected",
    connect,
  });

  /** persistent connection */
  useEffect(() => {
    if (ctor.connected) connect(false /** re-enable connection again */);
    //eslint-disable-next-line
  }, []);

  /** new connection */
  async function connect(isNew = true) {
    try {
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
        try {
          if (error) {
            toast.error("Error connecting wallet");
          }
          const { accounts, chainId } = payload.params[0];
          setState({
            type: "evm-wc",
            status: "connected",
            address: accounts[0],
            chainId: chainId,
            provider: getProvider(chainId) as any,
            disconnect,
          });
        } catch (err) {
          disconnect();
          toast.error("Error connecting wallet");
        } finally {
          QRCodeModal.close();
        }
      });

      ctor.on("session_update", (error, payload) => {
        if (error) {
          throw error;
        }

        // Get updated accounts and chainId
        const { accounts, chainId } = payload.params[0];
        setState((prev) =>
          prev.status === "connected"
            ? { ...prev, address: accounts[0], chainId: `${chainId}` }
            : prev
        );
      });

      ctor.on("disconnect", (error, payload) => {
        if (error) {
          throw error;
        }
        setState({ status: "disconnected", connect });
      });
    } catch (err) {
      setState({ status: "disconnected", connect });
    } finally {
      QRCodeModal.close();
    }
  }

  function disconnect() {
    ctor.killSession();
    ctor.off(WC_EVENT.connect);
    ctor.off(WC_EVENT.disconnect);
    setState({ status: "disconnected", connect });
  }

  return {
    ...state,
    logo: metamaskIcon,
    id: "evm-wc",
    name: "Metamask mobile",
  };
}
