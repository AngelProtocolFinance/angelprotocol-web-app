import { Keplr } from "@keplr-wallet/types";
import { chains } from "contracts/types";
import { useState } from "react";
import { DWindow } from "types/window";

const dwindow: DWindow = window;
export default function useKeplr() {
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);
  const [provider, setProvider] = useState<Keplr | undefined>(undefined);
  const [address, setAddress] = useState("");

  async function connect() {
    if (!dwindow.keplr) {
      window.open("https://phantom.app/", "_blank", "noopener noreferrer");
      return;
    }
    try {
      setLoading(true);
      await dwindow.keplr.enable(chains.cosmos_4);
      const offline_signer = dwindow.getOfflineSigner!(chains.cosmos_4);

      const accounts = await offline_signer.getAccounts();
      const address = accounts[0].address;
      setAddress(address);
      setProvider(dwindow.keplr);
      setConnected(true);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  async function disconnect() {
    setAddress("");
    setProvider(undefined);
    setConnected(false);
  }

  return {
    setters: { connect, disconnect },
    state: { loading, address, connected, provider },
  };
}
