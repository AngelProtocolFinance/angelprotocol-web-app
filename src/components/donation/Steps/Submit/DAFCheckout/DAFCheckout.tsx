import { DafCheckoutStep, setStep } from "slices/donation";
import { useSetter } from "store/accessors";
import BackBtn from "../../common/BackBtn";
import ManualDonation from "./ManualDonation";

export default function DAFCheckout(props: DafCheckoutStep) {
  const dispatch = useSetter();

  return (
    <div className="grid content-start p-4 @md/steps:p-8">
      <BackBtn onClick={() => dispatch(setStep("donate-form"))} />
      <ManualDonation {...props} />
    </div>
  );
}
