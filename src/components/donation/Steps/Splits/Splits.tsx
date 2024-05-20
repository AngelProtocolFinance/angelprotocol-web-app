import { humanize } from "helpers";
import { useState } from "react";
import { useDonationState } from "../Context";
import BackBtn from "../common/BackBtn";
import ContinueBtn from "../common/ContinueBtn";
import type { SplitsStep } from "../types";
import { LockedSplitSlider } from "./LockedSplitSlider";

type Props = SplitsStep;
export default function Split(props: Props) {
  const { details, init, liquidSplitPct: liquidSplitFromSplitStepPct } = props;

  const persistedLiqSplitPct =
    init.mode === "live"
      ? liquidSplitFromSplitStepPct
      : init.widgetConfig?.liquidSplitPct;

  const { setState } = useDonationState();

  const [lockedSplitPct, setLockedSplitPct] = useState(
    100 - (persistedLiqSplitPct ?? init.recipient.splitLiqPct ?? 50)
  );

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
      <BackBtn
        type="button"
        onClick={() => setState({ ...props, step: "donate-form" })}
      />
      <h4 className="mt-4">Sustainability Fund Donation</h4>
      <p className="mb-6 text-navy-l1">
        Create a sustainable impact: Give today, give forever
      </p>

      <LockedSplitSlider
        disabled={props.init.widgetConfig?.splitDisabled}
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
        onClick={() =>
          setState({
            ...props,
            step: props.init.recipient.hide_bg_tip ? "summary" : "tip",
            liquidSplitPct: liqSplitPct,
          })
        }
        className="mt-6"
      />
    </div>
  );
}
