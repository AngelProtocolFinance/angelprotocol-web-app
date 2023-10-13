import { useEffect, useState } from "react";
import { ProviderState, Wallet, WalletMeta } from "../types";
import { juno } from "constants/chains-v2";
import { retrieveUserAction, saveUserAction } from "../helpers";

const actionKey = `keplr__pref`;
const INSTALL_URL = "https://www.keplr.app/download";
const keplrIcon = "/icons/wallets/keplr.png";
const meta: WalletMeta = {
  type: "cosmos",
  id: "keplr",
  name: "Keplr",
  logo: keplrIcon,
};

export default function useKeplr(): Wallet {
  const [state, setState] = useState<ProviderState>({
    status: "disconnected",
  });

  /** persistent connection */
  useEffect(() => {
    retrieveUserAction(actionKey) === "connect" && connect(false);
  }, []); // eslint-disable-line

  async function connect(isNew = true) {
    try {
      if (!window.keplr) {
        if (!isNew) return; /** dont redirect persistent connection */
        return window.open(INSTALL_URL, "_blank", "noopener noreferrer");
      }
      setState({ status: "loading" });
      const key = await window.keplr.getKey(juno.id);

      setState({
        status: "connected",
        address: key.bech32Address,
        chainId: juno.id,
        isSwitchingChain: false,
      });
      saveUserAction(actionKey, "connect");
    } catch (err) {
      if (isNew) {
        return alert("Failed to connect to wallet.");
      }
      setState({ status: "disconnected" });
      saveUserAction(actionKey, "disconnect");
    }
  }

  function disconnect() {
    setState({ status: "disconnected" });
    saveUserAction(actionKey, "disconnect");
  }

  return { ...meta, ...state, ...{ connect, disconnect, switchChain: null } };
}
