import { humanize } from "helpers";
import { useEffect, useState } from "react";
import { type SplitsStep, setSplit, setStep } from "slices/donation";
import { useSetter } from "store/accessors";
import BackBtn from "../common/BackBtn";
import ContinueBtn from "../common/ContinueBtn";
import type { Config } from "../types";
import { LockedSplitSlider } from "./LockedSplitSlider";

type Props = SplitsStep & {
  widgetConfig: Config | null;
};

export default function Split({
  details,
  liquidSplitPct: donationLiquidSplit = 50,
  widgetConfig,
}: Props) {
  const dispatch = useSetter();

  const initLiqSplit = (() => {
    if (!widgetConfig) return donationLiquidSplit;
    if (widgetConfig.isPreview) return widgetConfig.liquidSplitPct;
    return donationLiquidSplit || widgetConfig.liquidSplitPct;
  })();

  const [lockedSplitPct, setLockedSplitPct] = useState(100 - initLiqSplit);

  // update lockedSplitPct whenever a new default liquid % value is passed from parent
  useEffect(() => {
    if (!widgetConfig) return;
    if (!widgetConfig.isPreview) return;
    setLockedSplitPct(100 - widgetConfig.liquidSplitPct);
  }, [widgetConfig]);

  const liqSplitPct = 100 - lockedSplitPct;

  const [amount, symbol] = (() => {
    switch (details.method) {
      case "crypto": {
        const { amount, symbol } = details.token;
        return [amount, symbol];
      }
      case "stocks": {
        const { numShares, symbol } = details;
        return [numShares, symbol];
      }
      default:
        const { amount, currency } = details;
        return [amount, currency.code];
    }
  })();

  const liq = +amount * (liqSplitPct / 100);
  //derive locked from liquid to be consistent with checkout
  const locked = +amount - liq;
  const DECIMALS = details.method === "crypto" ? 4 : 2;

  return (
    <div className="grid content-start p-4 @md/steps:p-8">
      <BackBtn type="button" onClick={() => dispatch(setStep("donate-form"))} />
      <h4 className="mt-4">Sustainability Fund Donation</h4>
      <p className="mb-6 text-navy-l1">
        Create a sustainable impact: Give today, give forever
      </p>

      <LockedSplitSlider
        disabled={widgetConfig?.splitDisabled}
        value={lockedSplitPct}
        onChange={setLockedSplitPct}
      />

      {/** amount breakdown */}
      <div className="flex justify-between mt-3">
        <dl>
          <dt className="text-navy-l1 text-xs">Instantly Available</dt>
          <dd className="text-right">
            <span className="text-xs font-medium mr-1">
              {symbol.toUpperCase()}
            </span>
            <span>{humanize(liq, DECIMALS)}</span>
          </dd>
        </dl>
        <dl>
          <dt className="text-navy-l1 text-xs">Invested for Growth</dt>
          <dd>
            <span className="text-xs font-medium mr-1">
              {symbol.toUpperCase()}
            </span>
            <span>{humanize(locked, DECIMALS)}</span>
          </dd>
        </dl>
      </div>

      <p className="text-sm text-navy-l1 mt-6">
        Support this nonprofit's future by contributing to the Sustainability
        Fund, which invests your donation for long-term growth to provide
        reliable, ongoing funding. Give today, give forever.
      </p>

      <ContinueBtn
        type="button"
        onClick={() => {
          dispatch(setSplit(liqSplitPct));
        }}
        className="mt-6"
      />
    </div>
  );
}
