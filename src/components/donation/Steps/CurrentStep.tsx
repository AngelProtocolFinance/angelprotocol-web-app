import { useDonationState } from "./Context";
import DonateMethods from "./DonateMethods";
import Submit from "./Submit";
import Summary from "./Summary";
import Tip from "./Tip";

export default function CurrentStep() {
  const { state } = useDonationState();

  switch (state.step) {
    case "donate-form":
      return <DonateMethods {...state} />;
    case "tip":
      return <Tip {...state} />;
    case "summary":
      return <Summary {...state} />;

    default:
      return <Submit {...state} />;
  }
}
