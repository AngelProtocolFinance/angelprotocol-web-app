import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Wallet, WalletState } from "../types";
import { Dwindow } from "types/window";
import icon from "assets/icons/wallets/keplr.png";
import { chainIds } from "constants/chains";
import { IS_TEST } from "constants/env";
import { retrieveUserAction, saveUserAction } from "../helpers";
import { junoTestnet } from "./chain-infos";

const actionKey = `keplr__pref`;
const dwindow: Dwindow = window;

const INSTALL_URL = "https://www.keplr.app/download";

export default function useKeplr(): Wallet {
  const [state, setState] = useState<WalletState>({
    status: "disconnected",
    connect,
  });

  /** persistent connection */
  useEffect(() => {
    retrieveUserAction(actionKey) === "connect" && connect(false);
  }, []); // eslint-disable-line

  async function connect(isNew = true) {
    try {
      if (!dwindow.keplr) {
        if (!isNew) return; /** dont redirect persistent connection */
        return window.open(INSTALL_URL, "_blank", "noopener noreferrer");
      }

      setState({ status: "loading" });
      if (IS_TEST) {
        await dwindow.keplr.experimentalSuggestChain(junoTestnet);
      }
      await dwindow.keplr.enable(chainIds.juno);
      const key = await dwindow.keplr.getKey(chainIds.juno);

      setState({
        type: "cosmos",
        status: "connected",
        address: key.bech32Address,
        chainId: chainIds.juno,
        disconnect,
        client: dwindow.keplr,
      });
      saveUserAction(actionKey, "connect");
    } catch (err) {
      if (isNew) {
        toast.error("Failed to connect to wallet.");
      }
      setState({ status: "disconnected", connect });
      saveUserAction(actionKey, "disconnect");
    }
  }

  function disconnect() {
    setState({ status: "disconnected", connect });
    saveUserAction(actionKey, "disconnect");
  }

  return { ...state, logo: icon, id: "keplr", name: "Keplr" };
}
