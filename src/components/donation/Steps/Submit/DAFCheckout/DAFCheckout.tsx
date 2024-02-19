import chariotLogo from "assets/images/chariot-logo-with-name.svg";
import Image from "components/Image";
import { useState } from "react";
import { ChariotCheckoutStep, setStep } from "slices/donation";
import { useSetter } from "store/accessors";
import BackBtn from "../../BackBtn";
import ChariotCheckout from "./ChariotCheckout";
import ManualDonation from "./ManualDonation";

type Method = "chariot" | "manual" | undefined;

export default function DAFCheckout(props: ChariotCheckoutStep) {
  const [action, setAction] = useState<Method>();
  const dispatch = useSetter();

  switch (action) {
    case "chariot":
      return <ChariotCheckout {...props} onBack={() => setAction(undefined)} />;
    case "manual":
      return <ManualDonation {...props} onBack={() => setAction(undefined)} />;
    default:
      return (
        <div className="grid gap-6 p-4 @md:p-8">
          <BackBtn type="button" onClick={() => dispatch(setStep("tip"))} />
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
            Donate with <Image src={chariotLogo} />
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
