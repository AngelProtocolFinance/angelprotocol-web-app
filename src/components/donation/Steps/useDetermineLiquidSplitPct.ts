import { useEffect, useRef, useState } from "react";
import { DonationState, SplitsStep } from "slices/donation";
import { Config } from "./types";

/** Determines which liquidSplitPct value to use, depending on which was the most recently changed one */
export default function useDetermineLiquidSplitPct(
  config: Config | null,
  state: DonationState
) {
  const [liquidSplitPct, setLiquidSplitPct] = useState<number>();
  const initRef = useRef(true);

  // update liquid % value when a new state value is set
  useEffect(() => {
    if (config?.liquidSplitPct && initRef.current) {
      if (liquidSplitPct) {
        initRef.current = false;
      }
      return;
    }
    if (state.step === "splits") {
      setLiquidSplitPct(state.liquidSplitPct);
    }
  }, [state.step, (state as SplitsStep).liquidSplitPct]);

  // update liquid % value when a new config value is passed
  useEffect(() => {
    if (config?.liquidSplitPct) {
      setLiquidSplitPct(config.liquidSplitPct);
    }
  }, [config?.liquidSplitPct]);

  return liquidSplitPct;
}
