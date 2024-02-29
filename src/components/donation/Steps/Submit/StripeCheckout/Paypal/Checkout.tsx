import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import ContentLoader from "components/ContentLoader";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import { appRoutes, donateWidgetRoutes } from "constants/routes";
import { useErrorContext } from "contexts/ErrorContext";
import { isEmpty } from "helpers";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCapturePayPalOrderMutation } from "services/apes";
import { DonationSource } from "types/lists";

type Props = {
  orderId: string;
  source: DonationSource;
};

// Code inspired by React Stripe.js docs, see:
// https://stripe.com/docs/stripe-js/react#useelements-hook
export default function Checkout({ orderId, source }: Props) {
  const navigate = useNavigate();

  const [isSubmitting, setSubmitting] = useState(false);

  const [{ isPending }] = usePayPalScriptReducer();
  const [captureOrder] = useCapturePayPalOrderMutation();
  const { handleError } = useErrorContext();

  return (
    <>
      {isPending && <ContentLoader className="rounded h-10 w-40" />}
      {!isPending && (
        <PayPalButtons
          style={{
            color: "gold",
            layout: "horizontal",
            shape: "rect",
            label: "paypal",
            height: 40,
          }}
          className="w-40 flex gap-2"
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
                if (order.details[0]?.issue === "INSTRUMENT_DECLINED") {
                  // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                  // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                  return actions.restart();
                } else if ("debug_id" in order) {
                  // (2) Other non-recoverable errors -> Show a failure message
                  throw new Error(
                    `${order.details[0]?.description} (${order.debug_id})`
                  );
                }
              } else if (isEmpty(order.purchase_units ?? [])) {
                throw new Error(JSON.stringify(order));
              } else {
                if (source === "bg-widget") {
                  navigate(
                    `${appRoutes.donate_widget}${donateWidgetRoutes.donate_fiat_thanks}`
                  );
                } else {
                  navigate(appRoutes.donate_fiat_thanks);
                }
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
      )}
    </>
  );
}
