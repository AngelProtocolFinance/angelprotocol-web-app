import QRCodeModal from "@walletconnect/qrcode-modal";
import { useEffect, useState } from "react";
import { Connection, ProviderInfo } from "./types";
import { useErrorContext } from "contexts/ErrorContext";
import { connector as ctor, getKeplrWCClient } from "helpers/keplr";
import { chainIds } from "constants/chainIds";
import { WC_EVENT } from "constants/wallet-connect";
import { WALLET_METADATA } from "./constants";

type WalletInfo = { address: string; chainId: string };
type Loading = { status: "loading" };

type Connected = {
  status: "connected";
  disconnect(): void;
} & WalletInfo;

type Disconnected = { status: "disconnected"; connect(): void };

type WalletState = Loading | Connected | Disconnected;

// type Meta = { id: ProviderId; logo: string };
// type Wallet = Meta & WalletState;

/** NOTE: only use this wallet in mainnet */
export default function useKeplrMobile() {
  const { handleError } = useErrorContext();

  const [walletState, setWalletState] = useState<WalletState>({
    status: "disconnected",
    connect,
  });

  /** persistent connection */
  useEffect(() => {
    if (ctor.connected) {
      getWalletInfo().then((info) => {
        setWalletState({ status: "connected", disconnect, ...info });
      });
      ctor.on(WC_EVENT.disconnect, disconnect);
    }
    //eslint-disable-next-line
  }, []);

  /** new connection */
  async function connect() {
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
          logo: WALLET_METADATA["keplr-mobile"].logo,
          providerId: "keplr-mobile",
          chainId: walletState.chainId,
          address: walletState.address,
        }
      : undefined;

  const connection: Connection = {
    name: "Keplr mobile",
    logo: WALLET_METADATA["keplr-mobile"].logo,
    installUrl: WALLET_METADATA["keplr-mobile"].logo,
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
