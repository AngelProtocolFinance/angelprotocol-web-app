import chariotLogo from "assets/images/chariot-logo-with-name.svg";
import Image from "components/Image";
import { useState } from "react";
import { ChariotCheckoutStep, setStep } from "slices/donation";
import { useSetter } from "store/accessors";
import currency from "../../common/Currrency";
import Summary from "../../common/Summary";
import ChariotCheckout from "./ChariotCheckout";
import ManualDonation from "./ManualDonation";

type Method = "chariot" | "manual" | undefined;

export default function DAFCheckout(props: ChariotCheckoutStep) {
  const [action, setAction] = useState<Method>();
  const dispatch = useSetter();

  return (
    <Summary
      Amount={currency({ code: "USD", rate: 1 })}
      amount={+props.details.amount}
      splitLiq={props.liquidSplitPct}
      onBack={() => dispatch(setStep("splits"))}
      classes={{
        container: "flex flex-col p-4 @md:p-8 group",
        split: "mb-auto",
      }}
    >
      {action === "chariot" ? (
        <ChariotCheckout
          {...props}
          donor={{ firstName: "", lastName: "", email: "" }}
        />
      ) : action === "manual" ? (
        <ManualDonation {...props} />
      ) : (
        <>
          <h3 className="text-xl my-4">Instant DAF donation</h3>
          <p>
            We use Chariot to verify your account info and automatically
            initiate a grant from your DAF, or you can get instructions for
            making the donation manually.
          </p>
          <button
            className="btn-blue btn-donate gap-2 mt-6"
            type="button"
            onClick={() => setAction("chariot")}
          >
            Donate with <Image src={chariotLogo} />
          </button>
          <button
            className="font-semibold text-blue hover:text-blue-l1 active:text-blue-d1 mt-4"
            onClick={() => setAction("manual")}
          >
            Get instructions for a manual DAF donation
          </button>
        </>
      )}
    </Summary>
  );
}
