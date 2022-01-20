import { useConnectedWallet } from "@terra-money/wallet-provider";
import Charity from "contracts/Charity";
import { useCallback, useEffect, useState } from "react";
import { EndowmentBalanceData } from "./types";

function useQueryEndowmentBal(
  address: string,
  placeholder?: boolean
): EndowmentBalanceData {
  const [locked, setLocked] = useState(0);
  const [liquid, setLiquid] = useState(0);
  const [overall, setOverall] = useState(0);

  const wallet = useConnectedWallet();

  const getOnChainData = useCallback(async () => {
    const contract = new Charity(address, wallet);
    const { locked, liquid } = await contract.getEndowmentBalanceData();

    setLocked(locked);
    setLiquid(liquid);
    setOverall(locked + liquid);

    // `wallet` doesn't need to be included in the dep. array since the endowment balance data
    // does not depend on the (dis)connected wallet
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  useEffect(() => {
    if (placeholder) return;

    try {
      getOnChainData();
    } catch (err) {
      console.error(err);
    }
    // when the address changes, getOnChainData changes as well
  }, [placeholder, getOnChainData]);

  return {
    locked,
    liquid,
    overall,
  };
}

export default useQueryEndowmentBal;
