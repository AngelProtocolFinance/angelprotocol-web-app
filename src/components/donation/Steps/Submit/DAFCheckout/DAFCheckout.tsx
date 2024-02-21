import { DafCheckoutStep, setStep } from "slices/donation";
import { useSetter } from "store/accessors";
import BackBtn from "../../BackBtn";
import Currency from "../common/Currrency";
import Heading from "../common/Heading";
import SplitSummary from "../common/SplitSummary";
import ManualDonation from "./ManualDonation";

// NOTE: We are removing the Chariot option for now while their internal team
// decided whether or not to move forward with production access.
// type Method = "chariot" | "manual" | undefined;

export default function DAFCheckout(props: DafCheckoutStep) {
  const { details, liquidSplitPct } = props;
  const dispatch = useSetter();
  const currency = details.currency;
  const total = +details.amount;
  const liq = total * (liquidSplitPct / 100);
  const locked = total - liq;

  return (
    <div className="grid content-start p-4 @md:p-8">
      <BackBtn type="button" onClick={() => dispatch(setStep("splits"))} />
      <Heading classes="my-4" />
      <SplitSummary
        classes="mb-4"
        total={<Currency {...currency} amount={total} classes="text-gray-d2" />}
        liquid={<Currency {...currency} amount={liq} classes="text-sm" />}
        locked={<Currency {...currency} amount={locked} classes="text-sm" />}
      />
      <ManualDonation {...props} />
    </div>
  );
}
