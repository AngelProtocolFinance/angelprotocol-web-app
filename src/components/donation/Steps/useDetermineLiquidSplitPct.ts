import { useEffect, useRef, useState } from "react";
import { DonationState, SplitsStep } from "slices/donation";
import { Config } from "./types";

/** Determines which liquidSplitPct value to use, depending on which was the most recently changed one */
export default function useDetermineLiquidSplitPct(
  config: Config | null,
  state: DonationState
) {
  /**
   * Initial value is set using config.liquidSplitPct if it exists.
   * This is mainly to "work around" React's "strict" mode, which performs
   * each render 2 times, causing a bug where either state's or config's
   * liquid % value unintentionally overwrites the previous value.
   */
  const [liquidSplitPct, setLiquidSplitPct] = useState<number>();
  /**
   * Need the ref to avoid state.liquidSplitPct overwriting config's value on first render
   */
  const initRef = useRef(true);

  // update liquid % value when a new state value is set
  useEffect(() => {
    // this check is performed only on initial render
    if (config?.liquidSplitPct && initRef.current) {
      // this check is necessary mainly for React's "strict" mode, to avoid
      // overwriting liquidSplitPct on the 2nd render
      if (liquidSplitPct) {
        initRef.current = false;
      }
      return;
    }
    if ("liquidSplitPct" in state && state.liquidSplitPct) {
      setLiquidSplitPct(state.liquidSplitPct);
    }
    // no need to add either config or liquidSplitPct to the deps. array
    // as those are needed only on the initial render anyway
  }, [state, (state as SplitsStep).liquidSplitPct]);

  // update liquid % value when a new config value is passed
  useEffect(() => {
    if (config?.liquidSplitPct) {
      setLiquidSplitPct(config.liquidSplitPct);
    }
  }, [config?.liquidSplitPct]);

  return liquidSplitPct;
}
