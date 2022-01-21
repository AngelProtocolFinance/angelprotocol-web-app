import { useConnectedWallet } from "@terra-money/wallet-provider";
import Charity from "contracts/Charity";
import { EndowmentBalanceData } from "contracts/types";
import { useCallback, useEffect, useState } from "react";

function useQueryEndowmentBal(
  endowmentAddress: string,
  placeholder?: boolean
): EndowmentBalanceData {
  const [data, setData] = useState<EndowmentBalanceData>({
    endowment_address: endowmentAddress,
    liquid: 0,
    locked: 0,
  });

  const wallet = useConnectedWallet();

  const getOnChainData = useCallback(async () => {
    const contract = new Charity(endowmentAddress, wallet);
    const newData = await contract.getEndowmentBalanceData();

    setData(newData);
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

  return data;
}

export default useQueryEndowmentBal;
