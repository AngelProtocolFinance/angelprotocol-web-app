import QRCodeModal from "@walletconnect/qrcode-modal";
import { useEffect, useState } from "react";
import { ProviderId } from "./types";
import { connector as ctor, getKeplrWCClient } from "helpers/keplr";
import { chainIds } from "constants/chainIds";

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

export default function useKeplrMobile() {
  const [status, setStatus] = useState<WalletState>({
    status: "disconnected",
    connect,
  });

  useEffect(() => {}, []);

  async function connect() {
    setStatus({ status: "loading" });

    await ctor.createSession();
    QRCodeModal.open(
      ctor.uri,
      () => {
        /** modal is closed without connecting */
        if (!ctor.connected) {
          ctor.killSession();
          setStatus({ status: "disconnected", connect });
        }
      },
      {
        mobileLinks: [],
        desktopLinks: [],
      }
    );

    ctor.on("connect", async (error, payload) => {
      console.log("connected");
      QRCodeModal.close();

      const keplr = getKeplrWCClient();

      await keplr.enable(chainIds.juno);
      const key = await keplr.getKey(chainIds.juno);

      setStatus({
        status: "connected",
        disconnect,
        address: key.bech32Address,
        chainId: chainIds.juno,
      });
    });
    ctor.on("disconnect", disconnect);
  }

  function disconnect() {
    ctor.killSession();
    ctor.off("connect");
    ctor.off("disconnect");
    setStatus({ status: "disconnected", connect });
  }

  return status;
}
