import WalletConnectClient, { CLIENT_EVENTS } from "@walletconnect/client";
import { useEffect, useState } from "react";
export default function useWalletConnect() {
  const [loading, setLoading] = useState(false);
  const [client, setClient] = useState<WalletConnectClient>();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const client = await WalletConnectClient.init({
        relayProvider: "wss://relay.walletconnect.com",
        metadata: {
          name: "Angel Protocol",
          description: "A wonderful charity platform",
          url: "https://angelprotocol.io",
          icons: ["https://walletconnect.com/walletconnect-logo.png"],
        },
      });
      setClient(client);
      setLoading(false);
    })();
  }, []);

  async function attach_connect() {
    if (!client) {
      return;
    }
    client.on(CLIENT_EVENTS.pairing.proposal, async (proposal: any) => {
      // uri should be shared with the Wallet either through QR Code scanning or mobile deep linking
      const { uri } = proposal.signal.params;
      console.log(uri);
    });
  }

  async function connect() {}

  return;
}
