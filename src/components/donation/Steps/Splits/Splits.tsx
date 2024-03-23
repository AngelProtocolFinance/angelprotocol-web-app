import { humanize } from "helpers";
import { useState } from "react";
import { SplitsStep, setSplit, setStep } from "slices/donation";
import { useSetter } from "store/accessors";
import BackBtn from "../common/BackBtn";
import ContinueBtn from "../common/ContinueBtn";
import LiquidSplitSlider from "./LiquidSplitSlider";

export default function Split({
  details,
  disabled,
  liquidSplitPct: persistedLiqSplit = 50,
}: SplitsStep & { disabled?: boolean }) {
  const dispatch = useSetter();

  const [liquidSplitPct, setLiquidSplitPct] = useState(persistedLiqSplit);

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

  const liq = +amount * (liquidSplitPct / 100);
  //derive locked from liquid to be consistent with checkout
  const locked = +amount - liq;
  const DECIMALS = details.method === "crypto" ? 4 : 2;

  return (
    <div className="grid content-start p-4 @md/steps:p-8">
      <BackBtn type="button" onClick={() => dispatch(setStep("donate-form"))} />
      <h4 className="mt-4">Split donation</h4>
      <p className="mb-6 text-navy-l1">
        Create a sustainable impact by dividing funds
      </p>

      <LiquidSplitSlider
        disabled={disabled}
        value={liquidSplitPct}
        onChange={setLiquidSplitPct}
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
          <dt className="text-navy-l1 text-xs">Compounded Forever</dt>
          <dd>
            <span className="text-xs font-medium mr-1">
              {symbol.toUpperCase()}
            </span>
            <span>{humanize(locked, DECIMALS)}</span>
          </dd>
        </dl>
      </div>

      <p className="text-sm text-navy-l1 mt-6">
        With splitting your donation into sustainable funds, you align
        investments with personal values, improving long-term financial
        performance, reducing risk exposure, and contributing to global
        sustainability goals.
      </p>

      <ContinueBtn
        type="button"
        onClick={() => {
          dispatch(setSplit(liquidSplitPct));
        }}
        className="mt-6"
      />
    </div>
  );
}
