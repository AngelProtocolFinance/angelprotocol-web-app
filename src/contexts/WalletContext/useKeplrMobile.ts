import QRCodeModal from "@walletconnect/qrcode-modal";
import { useEffect, useState } from "react";
import { Connection, ProviderId, ProviderInfo } from "./types";
import { useErrorContext } from "contexts/ErrorContext";
import { connector as ctor, getKeplrWCClient } from "helpers/keplr";
import { chainIds } from "constants/chainIds";
import { WALLET_METADATA } from "./constants";

type WalletState =
  | { status: "loading" }
  | {
      status: "connected";
      address: string;
      chainId: string;
      disconnect(): void;
    }
  | { status: "disconnected"; connect(): void };

type Meta = { id: ProviderId; logo: string };
type Wallet = Meta & WalletState;

/** NOTE: only use this wallet in mainnet */
export default function useKeplrMobile() {
  const { handleError } = useErrorContext();

  const [walletState, setWalletState] = useState<WalletState>({
    status: "disconnected",
    connect,
  });

  /** persistent connection */
  useEffect(() => {
    (async () => {
      if (!ctor.connected) return;

      const keplr = getKeplrWCClient();
      await keplr.enable(chainIds.juno);
      const key = await keplr.getKey(chainIds.juno);

      setWalletState({
        status: "connected",
        disconnect,
        address: key.bech32Address,
        chainId: chainIds.juno,
      });

      ctor.on("disconnect", disconnect);
    })();
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

    ctor.on("connect", async (error) => {
      try {
        if (error) {
          throw Error(error.message);
        }
        const keplr = getKeplrWCClient();
        await keplr.enable(chainIds.juno);
        const key = await keplr.getKey(chainIds.juno);

        setWalletState({
          status: "connected",
          disconnect,
          address: key.bech32Address,
          chainId: chainIds.juno,
        });
      } catch (err) {
        disconnect();
        handleError(err);
      } finally {
        QRCodeModal.close();
      }
    });
    ctor.on("disconnect", disconnect);
  }

  function disconnect() {
    ctor.killSession();
    ctor.off("connect");
    ctor.off("disconnect");
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
