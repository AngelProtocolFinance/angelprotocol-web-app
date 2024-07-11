import { useDonationState } from "../../Context";
import BackBtn from "../../common/BackBtn";
import type { DafCheckoutStep } from "../../types";

export default function DAFCheckout(props: DafCheckoutStep) {
  const { setState } = useDonationState();

  return (
    <div className="grid content-start p-4 @md/steps:p-8">
      <BackBtn onClick={() => setState({ ...props, step: "donate-form" })} />
    </div>
  );
}
