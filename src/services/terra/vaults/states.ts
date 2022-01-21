import { useConnectedWallet } from "@terra-dev/use-wallet";
import { chainIDs } from "contracts/types";
import { exchange_map } from "./placeholders";
import { vault_api } from "./vaults";

export function useExchangeRateState() {
  const wallet = useConnectedWallet();
  const is_test = wallet?.network.chainID === chainIDs.testnet;
  const { data = exchange_map } =
    vault_api.endpoints.exchangeRate.useQueryState(is_test);
  return data;
}
