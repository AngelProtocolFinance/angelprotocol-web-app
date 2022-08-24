import { useWalletContext } from "contexts/WalletContext";
import { useGovStakerQuery, useGovStakerState } from "./gov";
import { staker } from "./placeholders";

export function useGovStaker() {
  const { wallet } = useWalletContext();
  const { data = staker } = useGovStakerQuery(
    {
      addr: wallet?.address!,
    },
    { skip: !wallet }
  );
  return data;
}

export function useCachedGovStaker() {
  const { wallet } = useWalletContext();
  const { data = staker } = useGovStakerState(
    {
      addr: wallet?.address!,
    },
    { skip: !wallet }
  );
  return data;
}
