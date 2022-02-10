import Account from "contracts/Account";
import { holdings } from "./placeholders";
import { account_api } from "./account";

export function useEndowmentHoldingsState(address: string, skip = false) {
  const contract = new Account(address);
  const {
    data = holdings,
    isError,
    isLoading,
    isFetching,
  } = account_api.endpoints.endowmentHoldings.useQueryState(contract.balance, {
    skip,
  });

  return {
    holdings: data,
    isHoldingsError: isError,
    isHoldingsLoading: isLoading || isFetching,
  };
}
