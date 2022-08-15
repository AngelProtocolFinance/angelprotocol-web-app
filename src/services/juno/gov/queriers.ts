import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { contracts } from "constants/contracts";
import { queryObject } from "../queryContract/queryObjects";
import { useGovStakerQuery, useGovStakerState } from "./gov";
import { staker } from "./placeholders";

export function useGovStaker() {
  const { wallet } = useGetWallet();
  const { data = staker } = useGovStakerQuery(
    {
      address: contracts.gov,
      msg: queryObject.govStaker({ addr: wallet?.address! }),
    },
    {
      skip: !wallet,
    }
  );
  return data;
}

export function useCachedGovStaker() {
  const { wallet } = useGetWallet();
  const { data = staker } = useGovStakerState(
    {
      address: contracts.gov,
      msg: queryObject.govStaker({ addr: wallet?.address! }),
    },
    {
      skip: !wallet,
    }
  );
  return data;
}
