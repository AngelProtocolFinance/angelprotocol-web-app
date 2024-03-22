import { DafCheckoutStep, setStep } from "slices/donation";
import { useSetter } from "store/accessors";
import BackBtn from "../../common/BackBtn";
import ManualDonation from "./ManualDonation";

// NOTE: We are removing the Chariot option for now while their internal team
// decided whether or not to move forward with production access.
// type Method = "chariot" | "manual" | undefined;

export default function DAFCheckout(props: DafCheckoutStep) {
  const dispatch = useSetter();

  return (
    <div className="grid content-start p-4 @md/steps:p-8">
      <BackBtn onClick={() => dispatch(setStep("donate-form"))} />
      <ManualDonation {...props} />
    </div>
  );
}
