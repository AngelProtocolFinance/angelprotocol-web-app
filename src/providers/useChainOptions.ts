import {
  getChainOptions,
  WalletControllerChainOptions,
} from "@terra-money/wallet-provider";
import { chainIDs } from "constants/chainIDs";
import { terra_lcds } from "constants/urls";
import { useEffect, useState } from "react";

const localterra = {
  name: "localterra",
  chainID: chainIDs.localterra,
  lcd: terra_lcds[chainIDs.localterra],
};

const DEFAULT_CHAIN_OPTIONS: WalletControllerChainOptions = {
  defaultNetwork: localterra,
  walletConnectChainIds: { 2: localterra },
};

export default function useChainOptions() {
  const [isLoading, setLoading] = useState(true);
  const [chainOptions, setChainOptions] = useState(DEFAULT_CHAIN_OPTIONS);

  useEffect(() => {
    async function fetchChainIds() {
      const fetchedChainOptions = await getChainOptions();
      fetchedChainOptions.walletConnectChainIds[2] = localterra;
      setChainOptions(fetchedChainOptions);
      setLoading(false);
    }

    fetchChainIds();
  }, []);

  return {
    isLoading,
    chainOptions,
  };
}
