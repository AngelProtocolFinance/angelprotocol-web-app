import { useConnectedWallet } from "@terra-money/wallet-provider";
import { chainIDs } from "constants/chainIDs";
import { exchange_map } from "./placeholders";
import { vault_api } from "./vaults";

export function useExchangeRateState() {
  const wallet = useConnectedWallet();
  const is_test = wallet?.network.chainID === chainIDs.testnet;
  const {
    data = exchange_map,
    isError,
    isLoading,
    isFetching,
  } = vault_api.endpoints.exchangeRate.useQueryState(is_test);
  return {
    rates: data,
    isRatesError: isError,
    isRatesLoading: isLoading || isFetching,
  };
}
