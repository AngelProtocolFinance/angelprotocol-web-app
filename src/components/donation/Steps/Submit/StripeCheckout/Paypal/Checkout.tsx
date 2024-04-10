import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import ContentLoader from "components/ContentLoader";
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
  const { handleError } = useErrorContext();
  const [isSubmitting, setSubmitting] = useState(false);

  const [{ isPending }] = usePayPalScriptReducer();
  const [captureOrder] = useCapturePayPalOrderMutation();

  if (isPending) return <ContentLoader className="rounded h-10 w-40" />;

  return (
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

          if ("debug_id" in order) throw order;

          if (
            "details" in order &&
            order.details[0]?.issue === "INSTRUMENT_DECLINED"
          ) {
            // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
            // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
            return actions.restart();
          }

          if (
            "purchase_units" in order &&
            isEmpty(order.purchase_units ?? [])
          ) {
            throw order;
          }

          //no problem with order
          const route =
            source === "bg-widget"
              ? `${appRoutes.donate_widget}/${donateWidgetRoutes.donate_fiat_thanks}`
              : appRoutes.donate_fiat_thanks;
          navigate(route, { state: order.guestDonor });
        } catch (err) {
          handleError(err);
        }
      }}
      createOrder={async () => {
        setSubmitting(true);
        return orderId;
      }}
    />
  );
}
