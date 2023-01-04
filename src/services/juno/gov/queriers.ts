import { isConnected, useWalletContext } from "contexts/WalletContext";
import { useGovStakerQuery, useGovStakerState } from "./gov";
import { staker } from "./placeholders";

export function useGovStaker() {
  const wallet = useWalletContext();
  const user = isConnected(wallet) ? wallet.address : "";
  const { data = staker } = useGovStakerQuery(
    {
      addr: user,
    },
    { skip: !user }
  );
  return data;
}

export function useCachedGovStaker() {
  const wallet = useWalletContext();
  const user = isConnected(wallet) ? wallet.address : "";
  const { data = staker } = useGovStakerState(
    {
      addr: user,
    },
    { skip: !user }
  );
  return data;
}
