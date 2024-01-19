import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useErrorContext } from "contexts/ErrorContext";
import LoaderRing from "components/LoaderRing";
import { appRoutes } from "constants/routes";

type Props = {
  orderId: string;
  onBack: () => void;
};

// Code inspired by React Stripe.js docs, see:
// https://stripe.com/docs/stripe-js/react#useelements-hook
export default function Checkout({ orderId, onBack }: Props) {
  const navigate = useNavigate();
  const { handleError } = useErrorContext();

  const [isSubmitting, setSubmitting] = useState(false);

  const [{ isPending }] = usePayPalScriptReducer();

  const handleApprove = async () => {
    setSubmitting(false);
    navigate(appRoutes.donate_fiat_thanks);
  };

  return (
    <div className="grid place-items-center min-h-[16rem] isolate">
      {isPending && <LoaderRing thickness={10} classes="w-8" />}
      {!isPending && (
        <div className="grid grid-cols-2 gap-5 w-full">
          <button
            className="btn-outline-filled btn-donate"
            onClick={onBack}
            type="button"
            disabled={isSubmitting}
          >
            Back
          </button>
          <PayPalButtons
            disabled={isSubmitting}
            className="w-full max-w-xs"
            onError={handleError}
            onApprove={handleApprove}
            createOrder={async () => {
              setSubmitting(true);
              return orderId;
            }}
          />
        </div>
      )}
    </div>
  );
}
