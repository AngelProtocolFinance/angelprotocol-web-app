import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useEffect, useRef, useState } from "react";
import { useCreatePayPalOrderMutation } from "services/apes";
import Icon from "components/Icon/Icon";
import LoaderRing from "components/LoaderRing";
import { useSetter } from "store/accessors";
import { PaypalCheckoutStep, setStep } from "slices/donation";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import { PAYPAL_CLIENT_ID } from "constants/env";
import Checkout from "./Checkout";

type Resource =
  | "loading"
  | "error"
  | {
      orderId: string;
    };

// Followed Stripe's custom flow docs
// https://stripe.com/docs/payments/quickstart
export default function PaypalCheckout(props: PaypalCheckoutStep) {
  const { details, recipient, kyc } = props;
  const [resource, setResource] = useState<Resource>("loading");
  const [createPayPalOrder] = useCreatePayPalOrderMutation();

  const dispatch = useSetter();
  const isInitRef = useRef(false);

  useEffect(() => {
    if (isInitRef.current) return; //prevent from running effect twice in dev:strict-mode
    isInitRef.current = true;

    createPayPalOrder({
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
      .then(({ orderId }) => setResource({ orderId }))
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
    <PayPalScriptProvider
      options={{
        clientId: PAYPAL_CLIENT_ID,
        commit: true,
        currency: "USD",
        enableFunding: "paylater",
        disableFunding: "card,venmo",
      }}
    >
      <Checkout
        orderId={resource.orderId}
        onBack={() => {
          const action = details.userOptForKYC
            ? setStep("kyc-form")
            : setStep("donate-form");
          dispatch(action);
        }}
      />
    </PayPalScriptProvider>
  );
}
