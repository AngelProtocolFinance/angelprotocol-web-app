import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useRef, useState } from "react";
import { useCreateStripePaymentIntentMutation } from "services/apes";
import Icon from "components/Icon/Icon";
import LoaderRing from "components/LoaderRing";
import { useSetter } from "store/accessors";
import { StripeCheckoutStep, setStep } from "slices/donation";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import { PUBLIC_STRIPE_KEY } from "constants/env";
import Checkout from "./Checkout";

const stripePromise = loadStripe(PUBLIC_STRIPE_KEY);

type StripeResource =
  | "loading"
  | "error"
  | {
      clientSecret: string;
    };

// Followed Stripe's custom flow docs
// https://stripe.com/docs/payments/quickstart
export default function StripeCheckout(props: StripeCheckoutStep) {
  const { details, recipient, kyc } = props;
  const [resource, setResource] = useState<StripeResource>("loading");
  const [createPaymentIntent] = useCreateStripePaymentIntentMutation();

  const dispatch = useSetter();
  const isInitRef = useRef(false);

  useEffect(() => {
    if (isInitRef.current) return; //prevent from running effect twice in dev:strict-mode
    isInitRef.current = true;

    createPaymentIntent({
      amount: +details.amount,
      currency: details.currency.code,
      endowmentId: recipient.id,
      email: details.email,
      splitLiq: details.pctLiquidSplit.toString(),
      kycData: kyc
        ? {
            city: kyc.city,
            country: kyc.country.name,
            fullName: `${kyc.name.first} ${kyc.name.last}`,
            kycEmail: kyc.kycEmail,
            streetAddress: `${kyc.address.street} ${kyc.address.complement}`,
            state: kyc.usState.value || kyc.state,
            zipCode: kyc.postalCode,
          }
        : undefined,
    })
      .unwrap()
      .then(({ clientSecret }) => setResource({ clientSecret }))
      .catch(() => setResource("error"));
    //eslint-disable-next-line
  }, []);

  if (resource === "loading") {
    return (
      <div className="grid place-items-center content-center gap-6 p-4 @md:p-8">
        <LoaderRing thickness={10} classes="w-32" />
        <p className="text-center">Loading payment form...</p>
      </div>
    );
  }

  if (resource === "error") {
    return (
      <div className="grid place-items-center content-center gap-6 p-4 @md:p-8">
        <Icon type="ExclamationCircleFill" size={60} className="text-red" />
        <p className="text-center">{GENERIC_ERROR_MESSAGE}</p>
      </div>
    );
  }

  return (
    <Elements
      options={{
        clientSecret: resource.clientSecret,
        appearance: { theme: "stripe" },
      }}
      stripe={stripePromise}
    >
      <Checkout
        onBack={() => {
          const action = details.userOptForKYC
            ? setStep("kyc-form")
            : setStep("donate-form");
          dispatch(action);
        }}
      />
    </Elements>
  );
}
