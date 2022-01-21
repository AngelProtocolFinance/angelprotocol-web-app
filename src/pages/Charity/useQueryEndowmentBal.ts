import { useConnectedWallet } from "@terra-money/wallet-provider";
import Charity from "contracts/Charity";
import { useCallback, useEffect, useState } from "react";
import { EndowmentBalanceData } from "./types";

function useQueryEndowmentBal(
  endowmentAddress: string,
  placeholder?: boolean
): EndowmentBalanceData {
  const [locked, setLocked] = useState(0);
  const [liquid, setLiquid] = useState(0);
  const [overall, setOverall] = useState(0);

  const wallet = useConnectedWallet();

  const getOnChainData = useCallback(async () => {
    const contract = new Charity(endowmentAddress, wallet);
    const { locked, liquid } = await contract.getEndowmentBalanceData();

    setLocked(locked);
    setLiquid(liquid);
    setOverall(locked + liquid);
  }, [endowmentAddress, wallet]);

  useEffect(() => {
    if (placeholder) return;

    try {
      getOnChainData();
    } catch (err) {
      console.error(err);
    }
    // when the endowmentAddress changes, getOnChainData changes as well
  }, [placeholder, getOnChainData]);

  return {
    locked,
    liquid,
    overall,
  };
}

export default useQueryEndowmentBal;
