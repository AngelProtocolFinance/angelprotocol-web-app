import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCapturePayPalOrderMutation } from "services/apes";
import { useErrorContext } from "contexts/ErrorContext";
import LoaderRing from "components/LoaderRing";
import { isEmpty } from "helpers";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import { appRoutes } from "constants/routes";

type Props = {
  orderId: string;
  onBack: () => void;
};

// Code inspired by React Stripe.js docs, see:
// https://stripe.com/docs/stripe-js/react#useelements-hook
export default function Checkout({ orderId, onBack }: Props) {
  const navigate = useNavigate();

  const [isSubmitting, setSubmitting] = useState(false);

  const [{ isPending }] = usePayPalScriptReducer();
  const [captureOrder] = useCapturePayPalOrderMutation();
  const { handleError } = useErrorContext();

  return (
    <div className="grid place-items-center min-h-[16rem] isolate">
      {isPending && <LoaderRing thickness={10} classes="w-8" />}
      {!isPending && (
        <div className="grid sm:grid-cols-2 gap-5 w-full">
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
            onCancel={() => setSubmitting(false)}
            onError={(error) => {
              setSubmitting(false);
              handleError(error);
            }}
            onApprove={async (data, actions) => {
              try {
                const order = await captureOrder({
                  orderId: data.orderID,
                }).unwrap();

                if ("details" in order) {
                  if (order.details.at(0)?.issue === "INSTRUMENT_DECLINED") {
                    // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                    // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                    return actions.restart();
                  } else if ("debug_id" in order) {
                    // (2) Other non-recoverable errors -> Show a failure message
                    throw new Error(
                      `${order.details.at(0)?.description} (${order.debug_id})`
                    );
                  }
                } else if (isEmpty(order.purchase_units ?? [])) {
                  throw new Error(JSON.stringify(order));
                } else {
                  navigate(appRoutes.donate_fiat_thanks);
                }
              } catch (error) {
                handleError(error, GENERIC_ERROR_MESSAGE);
              } finally {
                setSubmitting(false);
              }
            }}
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
