import { StripeCheckoutStep, setStep } from "slices/donation";
import { useSetter } from "store/accessors";
import BackBtn from "../../BackBtn";

import Currency from "../common/Currrency";
import DonorInfoForm from "../common/DonorInfoForm";
import Heading from "../common/Heading";
import SplitSummary from "../common/SplitSummary";

type Donor = {
  firstName: string;
  lastName: string;
  email: string;
};

// Followed Stripe's custom flow docs
// https://stripe.com/docs/payments/quickstart
export default function StripeCheckout(
  props: StripeCheckoutStep & { donor: Donor }
) {
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

      <DonorInfoForm render="new" onSubmit={(fv) => console.log(fv)} />
    </div>
  );
}
