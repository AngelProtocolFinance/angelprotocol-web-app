import {
  getChainOptions,
  WalletControllerChainOptions,
} from "@terra-money/wallet-provider";
import { useEffect, useState } from "react";
import { localterra } from "./types";

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
