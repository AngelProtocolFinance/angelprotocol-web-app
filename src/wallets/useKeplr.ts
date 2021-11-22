// import { SigningStargateClient, StargateClient } from "@cosmjs/stargate";
import { Keplr } from "@keplr-wallet/types";
// import { urls } from "App/chains";
// import { bombay_rest } from "constants/urls";
import { chains } from "contracts/types";
import { useState } from "react";
import { DWindow } from "types/window";
import { info_cosmos_tesnet } from "./info_cosmos_tesnet";
import { info_terra_tesnet } from "./info_terra_tesnet";

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
      //add cosmoshub-testnet chain to wallet
      await dwindow.keplr.experimentalSuggestChain(info_cosmos_tesnet);
      await dwindow.keplr.experimentalSuggestChain(info_terra_tesnet);
      await dwindow.keplr.enable([chains.testnet, chains.cosmos_test]);
      const offline_signer = dwindow.getOfflineSigner!(chains.cosmos_test);

      //show only cosmos address
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
