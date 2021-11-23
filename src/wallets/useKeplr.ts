import { StargateClient, Coin } from "@cosmjs/stargate";
import { Keplr } from "@keplr-wallet/types";
import { cosmos_4_rpc } from "constants/urls";
import { chains } from "contracts/types";
import { useState } from "react";
import { DWindow } from "types/window";
import { terra_mainnet_rpc, info_terra_mainnet } from "./info_terra_mainnet";

const dwindow: DWindow = window;
export default function useKeplr() {
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);
  const [balance, setBalance] = useState<Coin[]>([]);
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
      // await dwindow.keplr.experimentalSuggestChain(info_cosmos_tesnet);

      await dwindow.keplr.experimentalSuggestChain(info_terra_mainnet);
      await dwindow.keplr.enable([chains.mainnet, chains.cosmos_4]);

      const terra_signer = dwindow.getOfflineSigner!(chains.mainnet);
      const cosmos_signer = dwindow.getOfflineSigner!(chains.cosmos_4);

      //show only cosmos address
      const terra_accounts = await terra_signer.getAccounts();
      const terra_addr = terra_accounts[0].address;

      const cosmos_accounts = await cosmos_signer.getAccounts();
      const cosmos_addr = cosmos_accounts[0].address;

      const terra_client = await StargateClient.connect(terra_mainnet_rpc);
      const terra_balances = await terra_client.getAllBalances(terra_addr);
      terra_client.disconnect();

      const cosmos_client = await StargateClient.connect(cosmos_4_rpc);
      const cosmos_balances = await cosmos_client.getAllBalances(cosmos_addr);
      cosmos_client.disconnect();

      //set cosmos address as default address
      setAddress(cosmos_addr);
      setBalance([...cosmos_balances, ...terra_balances]);
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
    state: { loading, address, connected, provider, balance },
  };
}
