import QRCodeModal from "@walletconnect/qrcode-modal";
import { useEffect, useState } from "react";
import { Connection, ProviderInfo } from "../types";
import { WalletInfo, WalletState } from "./types";
import { useErrorContext } from "contexts/ErrorContext";
import { connector as ctor, getKeplrWCClient } from "helpers/keplr";
import { chainIds } from "constants/chainIds";
import { WC_EVENT } from "constants/wallet-connect";
import { WALLET_METADATA } from "../constants";

/** NOTE: only use this wallet in mainnet */
export default function useKeplrWC() {
  const { handleError } = useErrorContext();

  const [walletState, setWalletState] = useState<WalletState>({
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
      ctor.on(WC_EVENT.connect, async (error) => {
        try {
          if (error) {
            throw Error(error.message);
          }
          setWalletState({
            status: "connected",
            disconnect,
            ...(await getWalletInfo()),
          });
        } catch (err) {
          disconnect();
          handleError(err);
        } finally {
          QRCodeModal.close();
        }
      });
    } else {
      setWalletState({
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
    setWalletState({ status: "disconnected", connect });
  }

  /** TODO: refactor to just return Meta & WalletState */
  const providerInfo: ProviderInfo | undefined =
    walletState.status === "connected"
      ? {
          logo: WALLET_METADATA["keplr-wc"].logo,
          providerId: "keplr-wc",
          chainId: walletState.chainId,
          address: walletState.address,
        }
      : undefined;

  const connection: Connection = {
    name: "Keplr",
    logo: WALLET_METADATA["keplr-wc"].logo,
    installUrl: WALLET_METADATA["keplr-wc"].logo,
    connect,
  };

  return {
    connection,
    disconnect,
    isLoading: walletState.status === "loading",
    providerInfo,
  };
}

async function getWalletInfo(): Promise<WalletInfo> {
  const keplr = getKeplrWCClient();
  await keplr.enable(chainIds.juno);
  const key = await keplr.getKey(chainIds.juno);
  return { chainId: chainIds.juno, address: key.bech32Address };
}
