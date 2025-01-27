import { useDonationState } from "./context";
import DonateMethods from "./donate-methods";
import Submit from "./submit";
import Summary from "./summary";
import Tip from "./tip";

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
