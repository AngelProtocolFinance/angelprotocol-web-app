import { useState } from "react";
import { ChariotCheckoutStep, setStep } from "slices/donation";
import BackBtn from "../../BackBtn";
import ChariotCheckout from "./ChariotCheckout";
import ChariotLogo from "./ChariotLogo";
import ManualDonation from "./ManualDonation";
import { useSetter } from "store/accessors";

type Method = "chariot" | "manual" | undefined;

export default function DAFCheckout(props: ChariotCheckoutStep) {
  const [action, setAction] = useState<Method>();
  const dispatch = useSetter();

  switch (action) {
    case "chariot":
      return <ChariotCheckout {...props} onBack={() => setAction(undefined)} />;
    case "manual":
      return (
        <div className="grid gap-4 p-4 @md:p-8">
          <BackBtn type="button" onClick={() => setAction(undefined)} />
          <ManualDonation {...props} />
        </div>
      );
    default:
      return (
        <div className="grid gap-6 p-4 @md:p-8">
          <BackBtn type="button" onClick={() => dispatch(setStep("splits"))} />
          <h3 className="text-xl">Instant DAF donation</h3>
          <p>
            We use Chariot to verify your account info and automatically
            initiate a grant from your DAF, or you can get instructions for
            making the donation manually.
          </p>
          <button
            className="btn-blue btn-donate gap-2"
            type="button"
            onClick={() => setAction("chariot")}
          >
            Donate with <ChariotLogo />
          </button>
          <button
            className="font-semibold text-blue hover:text-blue-l1 active:text-blue-d1"
            onClick={() => setAction("manual")}
          >
            Get instructions for a manual DAF donation
          </button>
        </div>
      );
  }
}
