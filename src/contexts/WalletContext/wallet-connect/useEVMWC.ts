import { Web3Provider } from "@ethersproject/providers";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { useEffect, useRef, useState } from "react";
import { Wallet, WalletState } from "../types";
import metamaskIcon from "assets/icons/wallets/metamask.png";
import { WCProvider as WCP, getProvider } from "helpers/evm";
import { WC_EVENT } from "./constants";

export function useEVMWC(): Wallet {
  const uriRef = useRef<string>("");
  const [state, setState] = useState<WalletState>({
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
      setState({ status: "loading" });

      if (uriRef.current || isNew) {
        QRCodeModal.open(
          uriRef.current,
          () => {
            setState({ status: "disconnected", connect });
          },
          { mobileLinks: ["metamask"], desktopLinks: [] }
        );
      }
      const accounts = await WCP.enable();
      const provider = getProvider("evm-wc")!;
      setState({
        type: "evm-wc",
        status: "connected",
        address: accounts[0],
        chainId: `${WCP.chainId}`,
        signer: new Web3Provider(provider).getSigner(),
        disconnect,
      });

      WCP.wc.on(
        WC_EVENT.update,
        (error, { params: [{ accounts, chainId }] }) => {
          setState((prev) =>
            prev.status === "connected"
              ? { ...prev, address: accounts[0], chainId: `${chainId}` }
              : prev
          );
        }
      );
      WCP.wc.on(WC_EVENT.disconnect, (error) => {
        setState({ status: "disconnected", connect });
      });
    } catch (err) {
      setState({ status: "disconnected", connect });
    } finally {
      uriRef.current = WCP.wc.uri;
      QRCodeModal.close();
    }
  }

  function disconnect() {
    WCP.disconnect();
    setState({ status: "disconnected", connect });
  }

  return {
    ...state,
    logo: metamaskIcon,
    id: "evm-wc",
    name: "Metamask mobile",
  };
}
