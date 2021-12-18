import { StargateClient, Coin } from "@cosmjs/stargate";
import { Keplr } from "@keplr-wallet/types";
import { cosmos4_rpcs, terra_rpcs } from "constants/urls";
import { chainIDs } from "contracts/types";
import { useState } from "react";
import { DWindow } from "types/window";
import { info_terra_mainnet } from "./info_terra_mainnet";

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
      await dwindow.keplr.enable([chainIDs.mainnet, chainIDs.cosmos_4]);

      const terra_signer = dwindow.getOfflineSigner!(chainIDs.mainnet);
      const cosmos_signer = dwindow.getOfflineSigner!(chainIDs.cosmos_4);

      //show only cosmos address
      const terra_accounts = await terra_signer.getAccounts();
      const terra_addr = terra_accounts[0].address;

      const cosmos_accounts = await cosmos_signer.getAccounts();
      const cosmos_addr = cosmos_accounts[0].address;

      const terra_client = await StargateClient.connect(
        terra_rpcs[chainIDs.mainnet]
      );
      const terra_balances = await terra_client.getAllBalances(terra_addr);
      terra_client.disconnect();

      const cosmos_client = await StargateClient.connect(
        cosmos4_rpcs[chainIDs.cosmos_4]
      );
      const cosmos_balances = await cosmos_client.getAllBalances(cosmos_addr);
      cosmos_client.disconnect();

      //set cosmos address as default address
      setAddress(cosmos_addr);
      setBalance([...cosmos_balances, ...terra_balances]);
      setProvider(dwindow.keplr);
      setConnected(true);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      const _err = err as any;
      //let consumer handle error with UI
      if (/key doesn't exist/.test(_err.message)) {
        throw new KeplrNoAccount();
      } else {
        throw new Error("Unknown error occured");
      }
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

export class KeplrNoAccount extends Error {
  constructor() {
    super();
    this.message = "Kindly login to your Keplr account";
    this.name = "KeplrNoAccount";
  }
}
