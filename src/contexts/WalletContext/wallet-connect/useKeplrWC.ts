import { KeplrQRCodeModalV1 } from "@keplr-wallet/wc-qrcode-modal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Connected, Cosmos, Wallet, WalletState } from "../types";
import icon from "assets/icons/wallets/keplr.png";
import { useErrorContext } from "contexts/ErrorContext";
import { connector as ctor, getKeplrWCClient } from "helpers/keplr";
import { chainIds } from "constants/chains";
import { WC_EVENT } from "./constants";

const QRModal = new KeplrQRCodeModalV1();

/** NOTE: only use this wallet in mainnet */
export function useKeplrWC(): Wallet {
  const { handleError } = useErrorContext();

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
      QRModal.open(ctor.uri, () => {
        /** modal is closed without connecting */
        if (!ctor.connected) {
          setState({ status: "disconnected", connect });
        }
      });
      ctor.on(WC_EVENT.connect, async (error) => {
        try {
          if (error) {
            throw Error(error.message);
          }
          setState({
            type: "cosmos",
            status: "connected",
            ...(await getWalletInfo()),
            disconnect,
          });
        } catch (err) {
          disconnect();
          toast.error("Error connecting to wallet");
        } finally {
          QRModal.close();
        }
      });
    } else {
      setState({
        type: "cosmos",
        status: "connected",
        disconnect,
        ...(await getWalletInfo()),
      });
    }
    ctor.on(WC_EVENT.disconnect, disconnect);
  }

  function disconnect() {
    ctor.killSession();
    ctor.off(WC_EVENT.connect);
    ctor.off(WC_EVENT.disconnect);
    setState({ status: "disconnected", connect });
  }

  return {
    ...state,
    logo: icon,
    id: "evm-wc",
    name: "Keplr mobile",
  };
}

async function getWalletInfo(): Promise<
  Pick<Connected & Cosmos, "address" | "chainId" | "client">
> {
  const id = chainIds.juno;
  const keplr = getKeplrWCClient();

  await keplr.enable(id);
  const key = await keplr.getKey(id);
  return {
    chainId: id,
    address: key.bech32Address,
    client: getKeplrWCClient(),
  };
}
