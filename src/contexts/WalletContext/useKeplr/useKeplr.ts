import { useEffect, useState } from "react";
import { CosmosProviderState, Wallet, WalletMeta } from "types/wallet";
import { juno } from "constants/chains-v2";
import { retrieveUserAction, saveUserAction } from "../helpers";

const actionKey = `keplr__pref`;
const INSTALL_URL = "https://www.keplr.app/download";
const keplrIcon = "/icons/wallets/keplr.png";
const meta: WalletMeta = {
  name: "Keplr",
  logo: keplrIcon,
  supportedChains: ["uni-6", "juno-1"],
};

export default function useKeplr(): Wallet {
  const [state, setState] = useState<CosmosProviderState>({
    status: "disconnected",
  });

  /** persistent connection */
  useEffect(() => {
    retrieveUserAction(actionKey) === "connect" && connect(false);
  }, []); // eslint-disable-line

  async function connect(isUserInitiated = true) {
    try {
      if (!window.keplr) {
        if (!isUserInitiated) return; /** dont redirect persistent connection */
        return window.open(INSTALL_URL, "_blank", "noopener noreferrer");
      }
      setState({ status: "loading" });
      const key = await window.keplr.getKey(juno.id);

      setState({
        status: "connected",
        id: "keplr",
        address: key.bech32Address,
        chainId: juno.id,
        sign: window.keplr.signDirect.bind(window.keplr),
      });
      saveUserAction(actionKey, "connect");
    } catch (err) {
      if (isUserInitiated) {
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
