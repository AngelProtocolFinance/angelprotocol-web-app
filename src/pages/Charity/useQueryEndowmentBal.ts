import { LCDClient } from "@terra-money/terra.js";
import { Holdings, Swap } from "contracts/types";
import { useCallback, useEffect, useState } from "react";
import { EndowmentBalanceData } from "./types";

function useQueryEndowmentBal(
  address: string,
  placeholder: boolean | undefined
): EndowmentBalanceData {
  const [locked, setLocked] = useState<number>();
  const [liquid, setLiquid] = useState<number>();
  const [overall, setOverall] = useState<number>();

  // Allows fetching of endowment balance even if wallet is not connected
  const getOnChainData = useCallback(async () => {
    const terra = new LCDClient({
      URL: "https://lcd.terra.dev",
      chainID: "columbus-5",
    });

    const endowmentBal: Holdings = await terra.wasm.contractQuery(address, {
      balance: {},
    });

    const rateQuery: Swap = await terra.wasm.contractQuery(
      "terra172ue5d0zm7jlsj2d9af4vdff6wua7mnv6dq5vp",
      { exchange_rate: { input_denom: "uust" } }
    );

    const exchangeRate = Number(rateQuery.exchange_rate);
    const microLocked =
      (Number(endowmentBal.locked_cw20[0].amount!) * exchangeRate) / 1e6;
    const microLiquid =
      (Number(endowmentBal.liquid_cw20[0].amount!) * exchangeRate) / 1e6;

    setLocked(microLocked);
    setLiquid(microLiquid);
    setOverall(microLocked + microLiquid);
  }, [address]);

  useEffect(() => {
    console.log("entered");

    try {
      // If invalid endowment addr is entered in the url, return 0 values
      if (placeholder) {
        setLocked(0);
        setLiquid(0);
        setOverall(0);
      } else {
        getOnChainData();
      }
    } catch (err) {
      console.error(err);
    }
  }, [address, placeholder, getOnChainData]);

  return {
    locked,
    liquid,
    overall,
  };
}

export default useQueryEndowmentBal;
