import { StripeCheckoutStep, setStep } from "slices/donation";
import { useSetter } from "store/accessors";
import BackBtn from "../../BackBtn";

import { useState } from "react";
import Currency from "../common/Currrency";
import DonorInfoForm from "../common/DonorInfoForm";
import Heading from "../common/Heading";
import SplitSummary from "../common/SplitSummary";
import { DonorState } from "../types";

// Followed Stripe's custom flow docs
// https://stripe.com/docs/payments/quickstart
export default function StripeCheckout(props: StripeCheckoutStep) {
  const [donor, setDonor] = useState<DonorState>({ render: "new" });
  const { details, liquidSplitPct } = props;

  const dispatch = useSetter();

  const currency = details.currency;
  const total = +details.amount;
  const liq = total * (liquidSplitPct / 100);
  const locked = total - liq;

  return (
    <div className="grid content-start p-4 @md:p-8">
      <BackBtn
        type="button"
        onClick={() =>
          donor.render === "new" && donor.donor
            ? setDonor({ donor: donor.donor, render: "update" })
            : dispatch(setStep("splits"))
        }
      />
      <Heading classes="my-4" />
      ``
      <SplitSummary
        classes="mb-4"
        total={<Currency {...currency} amount={total} classes="text-gray-d2" />}
        liquid={<Currency {...currency} amount={liq} classes="text-sm" />}
        locked={<Currency {...currency} amount={locked} classes="text-sm" />}
      />
      {donor.render === "update" || (donor.render === "new" && !donor.donor) ? (
        <DonorInfoForm
          render="new"
          onSubmit={(fv) => setDonor({ render: "new", donor: fv })}
        />
      ) : (
        <>done donor</>
      )}
    </div>
  );
}
