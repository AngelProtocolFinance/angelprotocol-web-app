import { useDonationState } from "./Context";
import DonateMethods from "./DonateMethods";
import Result from "./Result";
import Splits from "./Splits";
import Submit from "./Submit";
import Summary from "./Summary";
import Tip from "./Tip";

export default function CurrentStep() {
  const { state } = useDonationState();

  switch (state.step) {
    case "donate-form":
      return <DonateMethods {...state} />;
    case "splits":
      return <Splits {...state} />;
    case "tip":
      return <Tip {...state} />;
    case "summary":
      return <Summary {...state} />;
    case "submit":
      return <Submit {...state} />;

    default:
      state.step satisfies "tx";
      return (
        <Result {...state} classes="justify-self-center p-4 @md/steps:p-8" />
      );
  }
}
