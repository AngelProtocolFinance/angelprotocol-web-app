import Account from "contracts/Account";
import useWalletContext from "hooks/useWalletContext";
import { account_api } from "./account";
import { holdings } from "./placeholders";

export function useEndowmentHoldings(address: string, skip = false) {
  const { wallet } = useWalletContext();
  const { useEndowmentHoldingsQuery } = account_api;
  const contract = new Account(address);
  const {
    data = holdings,
    isError,
    isLoading,
    isFetching,
  } = useEndowmentHoldingsQuery(contract.balance, {
    skip: skip || !wallet,
  });

  return {
    holdings: data,
    isHoldingsError: isError,
    isHoldingsLoading: isLoading || isFetching,
  };
}

export function useEndowmentProfile(address: string, skip = false) {
  const { wallet } = useWalletContext();
  const { useEndowmentProfileQuery } = account_api;
  const contract = new Account(address);
  const { data, isError, isLoading, isFetching } = useEndowmentProfileQuery(
    contract.profile,
    {
      skip: skip || !wallet,
    }
  );
  console.log("profile: ", isLoading, data);
  return {
    profile: data,
    isProfileError: isError,
    isProfileLoading: isLoading || isFetching,
  };
}
