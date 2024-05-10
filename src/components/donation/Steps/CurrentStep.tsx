import { useDonationState } from "./Context";
import DonateMethods from "./DonateMethods";
import Result from "./Result";
import Splits from "./Splits";
import Submit from "./Submit";
import Summary from "./Summary";
import Tip from "./Tip";

export default function CurrentStep() {
  const [state] = useDonationState();

  if (state.step === "donate-form") return <DonateMethods {...state} />;

  if (state.step === "splits") {
    return (
      <Splits
        {...state}
        liquidSplitPct={
          state.liquidSplitPct ?? state.init.widgetConfig?.liquidSplitPct
        }
      />
    );
  }

  if (state.step === "tip") return <Tip {...state} />;

  if (state.step === "summary") return <Summary {...state} />;

  if (state.step === "submit") return <Submit {...state} />;

  state.step satisfies "tx";
  return <Result {...state} classes="justify-self-center p-4 @md/steps:p-8" />;
}
