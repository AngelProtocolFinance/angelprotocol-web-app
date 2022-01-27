import { useConnectedWallet } from "@terra-money/wallet-provider";
import { chainIDs } from "contracts/types";
import { exchange_map } from "./placeholders";
import { vault_api } from "./vaults";

export function useExchangeRate() {
  const { useExchangeRateQuery } = vault_api;
  const wallet = useConnectedWallet();
  const is_test = wallet?.network.chainID === chainIDs.testnet;
  const { data = exchange_map, isError } = useExchangeRateQuery(is_test, {
    skip: wallet?.network.chainID === chainIDs.localterra,
  });
  return { rates: data, isRatesError: isError };
}
