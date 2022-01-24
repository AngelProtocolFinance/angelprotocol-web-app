import { useConnectedWallet } from "@terra-money/wallet-provider";
import Charity from "contracts/Charity";
import { EndowmentBalanceData } from "contracts/types";
import { useCallback, useEffect, useState } from "react";
import { useGetter, useSetter } from "store/accessors";
import { addEndowmentBalance } from "./charitySlice";

export default function useQueryEndowmentBal(
  endowmentAddress: string,
  placeholder?: boolean
): EndowmentBalanceData {
  const [data, setData] = useState<EndowmentBalanceData>({
    endowment_address: endowmentAddress,
    liquid: 0,
    locked: 0,
  });
  const dispatch = useSetter();
  const endowmentBalances = useGetter(
    (state) => state.charity.endowmentBalances
  );
  const wallet = useConnectedWallet();

  const getOnChainData = useCallback(async () => {
    const contract = new Charity(endowmentAddress, wallet);
    const newData = await contract.getEndowmentBalanceData();

    dispatch(addEndowmentBalance(newData));
  }, [endowmentAddress, wallet, dispatch]);

  useEffect(() => {
    if (placeholder) return;

    const existingData = endowmentBalances.find(
      (x) => x.endowment_address === endowmentAddress
    );
    if (existingData) {
      setData(existingData);
      return;
    }

    try {
      getOnChainData();
    } catch (err) {
      console.error(err);
    }
  }, [placeholder, getOnChainData, endowmentAddress, endowmentBalances]);

  return data;
}
