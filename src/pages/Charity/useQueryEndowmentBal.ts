import { useEffect, useState } from "react";
import { LCDClient } from "@terra-money/terra.js";
import { Holdings, Swap } from "contracts/types";

function useQueryEndowmentBal(address: string) {
  let pool = 1;
  const [locked, setLocked] = useState<number>();
  const [liquid, setLiquid] = useState<number>();
  const [overall, setOverall] = useState<number>();

  const getPoolData = async () => {
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
  };

  useEffect(() => {
    try {
      getPoolData();
    } catch (err) {
      console.error(err);
    }
  }, [address]);

  return {
    pool,
    locked,
    liquid,
    overall,
  };
}

export default useQueryEndowmentBal;
