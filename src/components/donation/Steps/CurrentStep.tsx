import { useDonationState } from "./Context";
import DonateMethods from "./DonateMethods";
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

    default:
      return <Submit {...state} />;
  }
}
