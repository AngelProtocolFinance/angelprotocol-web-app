import { StargateClient } from "@cosmjs/stargate";
import { useEffect, useState } from "react";
import { Dwindow } from "types/ethereum";
import { retrieveUserAction } from "./helpers/prefActions";

const actionKey = `keplr__pref`;
const dwindow: Dwindow = window;
export default function useKeplr() {
  //connect only if there's no active wallet
  const lastAction = retrieveUserAction(actionKey);
  const shouldReconnect = lastAction === "connect";
  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState<string>();
  const [chainId, setChainId] = useState<string>();

  useEffect(() => {
    (async () => {
      if (!dwindow.keplr) return;
      const chainId = "cosmoshub-4";
      await dwindow.keplr.enable(["cosmoshub-4", "juno-1"]);
      const offlineSigner = dwindow.keplr.getOfflineSigner(chainId);

      const accounts = await offlineSigner.getAccounts();
      console.log(accounts);
    })();
  }, []);
}

export class KeplrNoAccount extends Error {
  constructor() {
    super();
    this.message = "Kindly login to your Keplr account";
    this.name = "KeplrNoAccount";
  }
}
